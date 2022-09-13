import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import { useHttp } from "../../hooks/http.hook";
import store from "../../store";
import { selectAll } from "../heroesFilters/filtersSlice";
import { heroAdd } from "../heroesList/heroesSlice";

const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState('');
    const [heroSkills, setHeroSkills] = useState('');
    const [heroElement, setHeroElement] = useState('');

    const {filtersLoadingStatus} = useSelector(state => state.filtersReducer);
    const filters = selectAll(store.getState());
    const dispatch = useDispatch();
    const {request} = useHttp();
    
    const onSubmit = (e) => {
        e.preventDefault();

        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroSkills,
            element: heroElement
        }

        dispatch(heroAdd(newHero))
        request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero))

        setHeroName('');
        setHeroSkills('');
        setHeroElement('');
    }

    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Загрузка элементов</option>
        } else if (status === "error") {
            return <option>Ошибка загрузки</option>
        }
        
        if (filters && filters.length > 0 ) {
            return filters.map(({id, name}) => {
                // eslint-disable-next-line
                if (name === 'all')  return;

                return <option key={id} value={name}>{name}</option>
            })
        }
    }

    return (
        <form onSubmit={onSubmit} className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name"
                    value={heroName}
                    onChange={e => setHeroName(e.target.value)} 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    value={heroSkills}
                    onChange={e => setHeroSkills(e.target.value)} 
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={heroElement}
                    onChange={e => setHeroElement(e.target.value)} 
                >
                    <option >Я владею элементом...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;