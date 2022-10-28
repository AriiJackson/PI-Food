import React from 'react';
import './Card.css';

export default function Card({id, name, healthScore, image, diets}) {
    let key = 1;
    return (
        <div className='divCard' key={id}>
            <h3>{name}</h3>
            <h5>Health score: {healthScore}</h5>
            <img id='imgCard' src={image} alt='img no encontrada' width='250px' height='250px'/>
            <p>
                <b>Tipo de dieta:</b> 
                {
                    typeof diets[0] === 'string' ? diets?.map(d => (<span key={key++}> - {d}</span>)) : diets?.map(d => (<span key={key++}> - {d.name}</span>))
                }
            </p>
        </div>
    );
}