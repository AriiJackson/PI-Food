import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDetail, getRecipes } from '../../redux/actions/actions';
import NavBar from '../NavBar/NavBar';
import './Detail.css';

export default function Detail (props) {
    let key = 1;
    const dispatch = useDispatch();
    const details = useSelector((state) => state.detail);

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    }, [dispatch]);
    
    return (
        <div>
            <NavBar />
            {
                details !== null ? 
                <div className='divDetails'>
                    <h2>{details.name}</h2>
                    {/* Poner aca el EDIT mediante un Link */}
                    <h4>Resumen del plato</h4>
                    <p dangerouslySetInnerHTML={{__html: details.summary,}}></p>
                    <img className='imgDetail' src={details.image} alt='recipe'/>

                    <div className='divStep'>
                        {
                            Array.isArray(details.steps) ? 
                            <h4>Paso a paso: <ol>{details.steps.map(s => ( <li key={s.number}>{s.number + ')' + s.step}</li> ))}</ol></h4> :
                            <h4>Paso a paso: {details.steps}</h4>
                        }
                    </div>
                    <div className='divContainer'>
                        <h3>Health Score: {details.healthScore}</h3>
                        {
                            Array.isArray(details.dishTypes) ?
                            <h3>Tipo de plato: <ul>{details.dishTypes?.map(d => ( <li key={key++}>- {d}</li> ))}</ul></h3> :
                            <h3>Tipo de plato: {details.dishTypes}</h3>
                        }
                        <h3>Tipo de dieta: <ul>{details.diets?.map(d => ( <li key={key++}>- {d}</li> ))}</ul></h3>
                    </div>
                    {/* Poner el boton DELETE aca */}
                </div> : <p>Loading...</p>
            }
            <Link to='/home'><button>Volver</button></Link>
        </div>
    )
}