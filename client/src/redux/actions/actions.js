import axios from 'axios';

export function getRecipes() {
    return async function(dispatch) {
        try {
            let json = await axios.get('http://localhost:3001/recipes');
            return dispatch({
                type: 'GET_RECIPES',
                payload: json.data
            });
        }
        catch (e) {
            return e;
        }
    }
}

export function getDiets() {
    return async (dispatch) => {
        try {
            let json = await axios.get('http://localhost:3001/diets');
            return dispatch({
                type: 'GET_DIETS',
                payload: json.data
            });
        }
        catch (e) {
            return e;
        }
    }
}

export function getDetail(id) {
    return async function (dispatch) {
        try {
            let json = await axios.get(`http://localhost:3001/recipes/${id}`);
            return dispatch ({
                type: 'GET_DETAIL',
                payload: json.data
            })
        }
        catch (e) {
            return e;
        }
    }
}

/*
export function getDetail(id) {
    return function (dispatch) { 
        axios.get(`http://localhost:3001/recipes/${id}`) 
            .then(res => { 
                dispatch({ 
                    type: 'GET_DETAIL', 
                    payload: res.data 
                }) 
    }) 
}
*/

export function getByName(name) {
    return async function (dispatch) {
        try {
            let json = await axios.get(`http://localhost:3001/recipes?name=${name}`);
            return dispatch ({
                type: 'GET_BY_NAME',
                payload: json.data,
            })
        }
        catch (e) {
            return e;
        }
    }
}

export function postRecipe(payload) {
    return async function (dispatch) {
        const response = await axios.post('http://localhost:3001/recipes', payload);
        return response;
    }
}

export function orderAlphabetically(payload) {
    return {
        type: 'ORDER_BY',
        payload,
    }
}

export function orderByHealthScore(payload) {
    return {
        type: 'ORDER_HEALTH_SCORE',
        payload,
    }
}

export function filterByDiet(diet) {
    return {
        type: 'FILTER_BY_DIET',
        payload: diet
    }
}

export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload,
    }
}
