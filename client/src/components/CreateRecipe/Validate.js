function validate (input) {
    const errors = {};

    if (!input.name) errors.name = 'Debes ponerle un nombre a tu receta.';
    else if (/[^a-zA-Z, ]/g.test(input.name)) errors.name = 'El nombre debe contener letras.';
    if (!input.summary) errors.summary = 'Debes ingresar un breve resumen de tu plato.';
    if (input.healthScore > 100 || input.healthScore < 0) errors.healthScore = 'La puntuación no puede exceder los 100 puntos o ser negativo.';
    
    return errors;
}

module.export = validate;