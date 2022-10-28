const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    detail: [],
}

export default function rootReducer (state = initialState, action) {
    switch (action.type) {
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        case 'GET_DIETS':
            return {
                ...state,
                diets: action.payload
            }
        case 'GET_DETAIL':
            return {
                ...state,
                detail: action.payload
            }
        case 'GET_BY_NAME':
            return {
                ...state,
                recipes: action.payload
            }
        case 'POST_RECIPE':
            return {
                ...state,
            }
        case 'ORDER_BY':
            const orderBy = (value) => {
                if (value === 'asc') {
                    const asc = state.recipes.sort((a, b) => {
                        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
                        else return -1
                    })
                    return asc;
                }
                else if (value === 'desc') {
                    const desc = state.recipes.sort((a, b) => {
                        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1
                        else return -1
                    })
                    return desc;
                }
                return state.recipes;
            }
            return {
                ...state,
                recipes: orderBy(action.payload)
            }
        case 'ORDER_HEALTH_SCORE':
            const orderHealthScore = (value) => {
                if(value === 'highest'){
                    const highest = state.recipes.sort((a, b) => b.healthScore - a.healthScore);
                    return highest;
                }
                else if(value === 'lowest'){
                    const lowest = state.recipes.sort((a, b) => a.healthScore - b.healthScore);
                    return lowest;
                }
                else return state.allRecipes;
            }
            return {
                ...state,
                recipes: orderHealthScore(action.payload),
            }
        case 'FILTER_BY_DIET':
            let dietsFilter = action.payload === 'none' ? state.allRecipes : state.allRecipes.filter(r => r.diets.includes(action.payload));
            return {
                ...state,
                recipes: dietsFilter
            }
        case 'FILTER_CREATED':
            let createdFilter = action.payload === 'created' ? state.allRecipes.filter(r => r.createdInDb) : state.allRecipes.filter(r => !r.createdInD);
            return {
                ...state,
                recipes: action.payload === 'all' ? state.allRecipes : createdFilter
            }
        default:
            return state;
    }
}

