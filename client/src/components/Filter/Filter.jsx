import React from 'react';
import './Filter.css';

export default function Filter({ handleOrder, handleHealthOrder, handleDiet, handleFilterCreated }) {
    return (
        <div className='divFilter'>
            <select onChange={(e) => handleOrder(e)}>
                <option value='none'>Ordenar por:</option>
                <option value='asc'>A-Z</option>
                <option value='desc'>Z-A</option>
            </select>
            <select onChange={(e) => handleHealthOrder(e)}>
                <option value='none'>Ordenar por nivel:</option>
                <option value='highest'>Highest health score</option>
                <option value='lowest'>Lowest health score</option>
            </select>
            <select onChange={(e) => handleDiet(e)}>
                <option value='none'>Filtrar por dietas:</option>
                <option value='gluten free'>gluten free</option>
                <option value='dairy free'>dairy free</option>
                <option value='ketogenic'>ketogenic</option>
                <option value='vegetarian'>vegetarian</option>
                <option value='lacto vegetarian'>lacto vegetarian</option>
                <option value='lacto ovo vegetarian'>lacto ovo vegetarian</option>
                <option value='ovo vegetarian'>ovo vegetarian</option>
                <option value='vegan'>vegan</option>
                <option value='pescatarian'>pescatarian</option>
                <option value='paleolithic'>paleolithic</option>
                <option value='primal'>primal</option>
                <option value='fodmap friendly'>fodmap friendly</option>
                <option value='whole 30'>whole 30</option>
            </select>
            <select onChange={(e) => handleFilterCreated(e)}>
                <option value='all'>Todos</option>
                <option value='created'>Creados</option>
                <option value='existed'>Existentes</option>
            </select>

        </div>
    )
}