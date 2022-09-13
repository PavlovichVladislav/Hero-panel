import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import store from "../../store";

import Spinner from "../spinner/Spinner";
import { fetchFilters, filtersSetActive, selectAll } from "./filtersSlice";

const HeroesFilters = () => {
    const dispatch = useDispatch();
    const {activeFilter, filtersLoadingStatus} = useSelector(state => state.filtersReducer);
    const filters = selectAll(store.getState());

    useEffect(() => {
        dispatch(fetchFilters());
    }, [])
    
    if (filtersLoadingStatus === 'loading') {
        return <Spinner/>
    } else if (filtersLoadingStatus === 'error') {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderFiltersList = (filters) => {
        return filters.map(filter => {
            let className = `btn ${filter.className}`;
            if (filter.name === activeFilter) className+=' active';

            return (
                <button 
                    className={className}
                    onClick={() => dispatch(filtersSetActive((filter.name)))}
                    key={filter.name}
                > {filter.name} </button>
            )
        })
    }

    const filterList = renderFiltersList(filters);
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filterList}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;