import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getByName } from '../../redux/actions/actions';
import './SearchBar.css';

export default function SearchBar () {
    const dispatch = useDispatch();
    const [ name, setName ] = useState('');

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getByName(name));
        setName('');
    }

    return (
        <div className='search'>
            <input
                type='text'
                placeholder='Buscar...'
                value={name}
                onChange={(e) => handleInputChange(e)}
            />
            <button type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}