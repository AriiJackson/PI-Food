const { Router } = require('express');
const router = Router();
const { getDiets } = require('../controllers/dietController');

router.get('/', async (req, res, next) => {
    try {
        res.json(await getDiets());
    }
    catch (e) {
        next(e);
    }
});

module.exports = router;