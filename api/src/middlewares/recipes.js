const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Recipe, Diet } = require('../db');
const { 
    getAllRecipes, 
    getById, 
    createRecipe 
} = require('../controllers/recipeController');

router.get('/', async (req, res, next) => {
    const { name } = req.query;
    try {
        let recipes = await getAllRecipes();
        if (name) {
            let recipeName = recipes.filter(r => r.name.toLowerCase().includes(name.toLowerCase()));
            recipeName.length ? res.status(200).send(recipeName) : res.status(404).send('No se ha encontrado esa receta');
        }
        else {
            res.status(200).send(recipes);
        }
    }
    catch (e) {
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        let recipeId = await getById(id);
        res.json(recipeId);
    }
    catch (e) {
        next(e);
    }
});

router.post('/', async (req, res, next) => {
    let {
        name,
        summary,
        healthScore,
        dishTypes,
        steps,
        image,
        createdInDb,
        diets
    } = req.body;
    try {
        if (!name && !summary) return res.status(404).send('Nombre y resumen son obligatorios.');
        if (healthScore < 0 || healthScore > 100) return res.status(404).send('El health score debe ser entre 0 y 100.');
        else if (/[^a-zA-Z, ]/g.test(name)) return res.status(404).send('Nombre debe ser letras.');   
        await createRecipe(
            name,
            summary,
            healthScore,
            dishTypes,
            steps,
            image,
            createdInDb,
            diets
        );
        res.status(200).send('Receta creada éxitosamente.');
    }
    catch (e) {
        next(e);
    }
});

router.put('/edit/:id', async (req, res, next) => {

});

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        await Recipe.destroy({
            where: { 
                id: id 
            }
        });
        res.send('Receta eliminada');
    }
    catch (e) {
        next(e);
    }
});

module.exports = router;