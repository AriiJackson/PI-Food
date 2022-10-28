import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import SearchBar from '../SearchBar/SearchBar';

export default function NavBar () {
    function handleReload () {
        if(window.location.href === 'https://localhost:3001/home') window.location.reload();
    }

    return (
        <div id='nav'>
            <ul>
                <li className='navHeader'><a>Nuna Cocina</a></li>
                <li className='navList'>
                    <Link to='/home'><a onClick={()=>handleReload()}>Home</a></Link>
                </li>
                <li className='navList'>
                    <Link to='/createRecipe'><a>Crear receta</a></Link>
                </li>
                <li className='navSearch'>
                    <SearchBar/>
                </li>
            </ul>
        </div>  
    )
}