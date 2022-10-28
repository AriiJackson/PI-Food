import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipes } from '../../redux/actions/actions';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage () {
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch]);
    
    return (
        <div id='landing'>
            <h1 className='header'>Bienvenidos a Nuna Cocina</h1>
            <Link to='/home'>
                <button className='btn'>Ingresar</button>
            </Link>
        </div>
    )
}