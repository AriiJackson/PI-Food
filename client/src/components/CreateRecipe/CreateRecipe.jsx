import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postRecipe, getDiets } from '../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar/NavBar';
//import validate from './Validate';
import './CreateRecipe.css';

function validate (input) {
    let errors = {};

    if (!input.name) errors.name = 'Debes ponerle un nombre a tu receta.';
    else if (/[^a-zA-Z, ]/g.test(input.name)) errors.name = 'El nombre debe contener letras.';
    
    if (!input.summary) errors.summary = 'Debes ingresar un breve resumen de tu plato.';
    if (input.healthScore > 100 || input.healthScore < 0) errors.healthScore = 'La puntuación no puede exceder los 100 puntos o ser negativo.';
    
    return errors;
}

export default function CreateRecipe () {
    const dispatch = useDispatch();
    const history = useHistory();
    const diets = useSelector((state) => state.diets);
    const [ errors, setErrors ] = useState({});
    const [ input, setInput ] = useState({
        name: '',
        summary: '',
        healthScore: 0,
        steps: '',
        dishTypes: '',
        image: '',
        diets: []
    });

    function handleSubmit (e) {
        e.preventDefault();
        dispatch(postRecipe(input));
        alert('Receta creada');
        setInput({
            name: '',
            summary: '',
            healthScore: 0,
            dishTypes: '',
            steps: '',
            image: '',
            diets: [],
        });
        history.push('/home');
    }

    function handleChange (e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        });
        setErrors(validate({
          ...input,
          [e.target.name]: e.target.value
        }));
    }

    function handleDiet (e) {
        if (!input.diets.includes(e.target.value)) {
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            });
        }
        else {
            setInput({
                ...input 
            })
        }
    }

    function handleDelete(el) {
        setInput({
            ...input,
            diets: input.diets.filter(d => d !== el)
        });
    }

    useEffect(() => {
        dispatch(getDiets());
    }, []);

    return (
        <div>
            <NavBar />
            <h2>Crear receta</h2>
            <form id='idForm' onSubmit={(e) => handleSubmit(e)}>
                <div className='divForm'>
                    <label>Nombre: </label>
                    <input className={errors.name && 'danger'} type='text' value={input.name} name='name' onChange={(e) => handleChange(e)} required/>
                    { 
                        errors.name && (<p className='danger'>{errors.name}</p>)
                    }
                </div>
                <div className='divForm'>
                    <label>Resumen del plato: </label>
                    <input className={errors.summary && 'danger'} type='text' value={input.summary} name='summary' onChange={(e) => handleChange(e)} required/>
                    { 
                        errors.summary && (<p className='danger'>{errors.summary}</p>) 
                    }
                </div>
                <div className='divForm'>
                    <label>Health Score: </label>
                    <input className={errors.healthScore && 'danger'} type='number' value={input.healthScore} name='healthScore' onChange={(e) => handleChange(e)}/>
                    { 
                        errors.healthScore && (<p className='danger'>{errors.healthScore}</p>) 
                    }
                </div>
                <div className='divForm'>
                    <label>Imagen: </label>
                    <input type='url' value={input.image} name='image' onChange={(e) => handleChange(e)}/>
                </div>
                <div className='divForm'>
                    <label>Tipo de plato: </label>
                    <input type="text" name="dishTypes" value={input.dishTypes} onChange={(e) => handleChange(e)}/>
                </div>
                <div className='divForm'>
                    <label>Paso a paso: </label>
                    <textarea name='steps' value={input.steps} onChange={(e) => handleChange(e)}/>
                </div>
                <div className='divTypes'>
                    <label>Tipo de dieta: </label>
                    <select onChange={(e) => handleDiet(e)}>
                        <option disabled selected>Seleccione los tipos de dieta</option>
                    {
                        diets?.map((d) => {
                            return (
                                <option value={d.name} name={d.name}>{d.name}</option>
                        )})
                    }
                    </select>
                    {
                        input.diets.map(el => 
                            <div className='divDiets'>
                                <li>{el}</li>
                                <button className='btnx' onClick={() => handleDelete(el)}>x</button>
                            </div>
                        )
                    }
                </div>
                {
                    !input.name && !input.summary ? <button className='btnCreate' disabled='true'>Crear</button> : <button className='btnCreate' type='submit'>Crear</button>
                }
                
            </form>
            <br/>
            <Link to='/home'><button>Volver</button></Link>
        </div>
    )
}