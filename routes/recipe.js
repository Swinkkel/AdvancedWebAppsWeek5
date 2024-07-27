var express = require('express');
var router = express.Router();
const Recipes = require('../models/recipe');
const Category = require('../models/category');

router.get('/categories', async function(req, res) {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).send(error);
    }
});

/* GET home page. */
router.get('/:food', async function(req, res) {
    const { food } = req.params;

    const recipe = await Recipes.findOne({name: food});
    if (!recipe) {
        return res.json({ status: "Recipe not found" });
    }
    
    return res.json(recipe);
});

router.post('/', async function(req, res, next) {
    const {name, instructions, ingredients} = req.body;

    let recipe = await Recipes.findOne({ name: name});
    if (!recipe) {
        recipe = new Recipes({
            name: name,
            instructions: instructions,
            ingredients: ingredients
        });
    } else {
        return res.status(403).json({ status: "Already has that recipe!" });
    }

    await recipe.save();
    return res.json(recipe);
});


module.exports = router;
