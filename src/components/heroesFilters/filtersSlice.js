import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';

const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
    activeFilter: 'all',
    filtersLoadingStatus: 'idle',
});

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    () => {
        const { request } = useHttp();
        return request('http://localhost:3001/filters')
    }
)

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        filtersSetActive: (state, action) => {state.activeFilter = action.payload}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, state => {
                state.filtersLoadingStatus = 'loading'
            }) 
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filtersLoadingStatus = 'idle';
                filtersAdapter.setAll(state, action.payload);
            })
            .addCase(fetchFilters.rejected, state => {
                state.filtersLoadingStatus = 'error'
            })
            .addDefaultCase(() => {})
    }
})

const {reducer, actions} = filtersSlice;

export const {selectAll} = filtersAdapter.getSelectors(state => state.filtersReducer);

// export const filtersSelector = createSelector(
//     selectAll,
//     heroes => heroes
// );

export default reducer;
export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    filtersSetActive
} = actions;