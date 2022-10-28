import React from 'react';
import './Pagination.css';

export default function Paginado ({ recipesPerPage, allRecipes, paginado }) {
    const pageNum = [];

    for (let i = 0; i <= Math.ceil(allRecipes/recipesPerPage) - 1; i++) {
        pageNum.push(i + 1);
    }

    return (
        <nav>
            <ul className='paginado'>
                {
                    pageNum && pageNum.map(num => (
                        <li className='number' key={num}>
                            <a onClick={() => paginado(num)}>{num}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}