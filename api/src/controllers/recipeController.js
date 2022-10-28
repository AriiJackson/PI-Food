const axios = require('axios');
const apiData = require('../utils/apiData');
const { APIKey } = process.env;
const { Recipe, Diet } = require('../db');

// Trae los datos de la API
async function getApiInfo () {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKey}&addRecipeInformation=true&number=100`);
    //const apiUrl = apiData.results; // disimulando la API con un archivo local
    const apiInfo = await apiUrl.data.results.map(r => { // cuando va con axios es "apiUrl.data.results.map()" - sino "apiUrl?.map()""
        return {
            id: r.id,
            name: r.title,
            summary: r.summary,
            healthScore: r.healthScore,
            dishTypes: r.dishTypes,
            steps: r.analyzedInstructions[0]?.steps.map(s => {
                return {
                    number: s.number,
                    step: s.step,
                }
            }),
            image: r.image,
            diets: r.diets.map(d => d),
        }
    });

    return apiInfo;
}

// Trae los datos de la BD
async function getDbInfo () {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
}

// Concateno los datos
async function getAllRecipes () {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const info = apiInfo.concat(dbInfo);
    return info;
}

// Buscar por ID de la API
async function getByApiId (id) {
    const apiRecipeFound = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${APIKey}`);
    const response = await apiRecipeFound.data;
    const details = {
        id: response.id,
        name: response.title,
        summary: response.summary,
        healthScore: response.healthScore,
        dishTypes: response.dishTypes,
        steps: response.analyzedInstructions.length ? response.analyzedInstructions[0].steps : 'No hay instrucciones.',
        image: response.image,
        diets: response.diets,
    };
    return details;
}

// Buscar por ID de la DB
async function getByDbId (id) {
    const dbRecipeFound = await Recipe.findByPk(id);
    let diets = await dbRecipeFound.getDiets();
    diets = diets.map(d => d.dataValues.name)
    if(dbRecipeFound){
        return {
            ...dbRecipeFound.dataValues, 
            diets
        };
    }
}

// Buscar por ID general
async function getById (id) {
    let validate = id.includes('-');
    if (validate) {
        return await getByDbId(id);
    }
    else {
        return await getByApiId(id);
    }
}

// Crear una receta
async function createRecipe (name, summary, healthScore, dishTypes, steps, image, createdInDb, diets) {
    let newRecipe = await Recipe.create({
        name: name,
        summary: summary,
        healthScore: healthScore,
        dishTypes: dishTypes,
        steps: steps,
        image: image,
        createdInDb: createdInDb
    });

    let dietsDb = await Diet.findAll({
        where: { name: diets }
    });
    
    newRecipe.addDiet(dietsDb);
}

module.exports = {
    getApiInfo,
    getDbInfo,
    getAllRecipes,
    getById,
    createRecipe,
}