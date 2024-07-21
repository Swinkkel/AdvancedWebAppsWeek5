var express = require('express');
var router = express.Router();
const Recipes = require('../models/recipe');

// Structure to store recipes.
let recipes = [];

/* GET home page. */
router.get('/:food', function(req, res) {
    const { food } = req.params;

    const recipe = await Recipes.findOne({name: food});
    if (!recipe) {
        res.json({ status: "Recipe not found" });
    }
    
    res.json(recipe);
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
        return res.status(403).send("Already has that recipe!");
    }

    await recipe.save();
    return res.send("Recipe added");
});

module.exports = router;
