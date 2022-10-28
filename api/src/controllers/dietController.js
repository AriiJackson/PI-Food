const { diets } = require('../utils/dietData');
const { Diet } = require('../db');

const getDiets = async () => {
    diets.map(d => {
        Diet.findOrCreate({
            where: {
                name: d,
            }
        })
    });

    let dietsDb = await Diet.findAll();
    
    return dietsDb;
}

module.exports = { getDiets }