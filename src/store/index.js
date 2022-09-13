import { configureStore } from '@reduxjs/toolkit';

import filtersReducer from '../components/heroesFilters/filtersSlice'
import heroesReducer from '../components/heroesList/heroesSlice';

const stringMiddleWare = (store) => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
};  

const store = configureStore({
    reducer: {filtersReducer, heroesReducer},
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stringMiddleWare)
})

export default store;
