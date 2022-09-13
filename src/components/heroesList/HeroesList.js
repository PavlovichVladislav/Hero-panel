import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { fetchHeroes, heroDelete, heroesSelector } from './heroesSlice';
import { useHttp } from '../../hooks/http.hook';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';

const HeroesList = () => {
    const heroesLoadingStatus = useSelector(state => state.heroesReducer.heroesLoadingStatus); 
    const heroes = useSelector(heroesSelector);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes());

        // eslint-disable-next-line
    }, []);

    const deleteHero = useCallback((id) => {
        dispatch(heroDelete(id));
        request(`http://localhost:3001/heroes/${id}`,'DELETE');

        // eslint-disable-next-line
    }, [request])

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return (
            <TransitionGroup component='ul'>
                {arr.map(({id, ...props}) => {
                    return (
                        <CSSTransition 
                            key={id}
                            timeout={300}
                            classNames='hero'
                            unmountOnExit
                            mountOnEnter
                        >
                            <HeroesListItem key={id} {...props} deleteHero={() => deleteHero(id)}/>
                        </CSSTransition>
                    )
                })}
            </TransitionGroup>
        )
    }

    const elements = renderHeroesList(heroes);
    return (
        {...elements}
    )
}

export default HeroesList;