var express = require('express');
var router = express.Router();
const Recipes = require('../models/recipe');

// Structure to store recipes.
let recipes = [];

/* GET home page. */
router.get('/:food', function(req, res) {
    const { food } = req.params;

    const recipe = {
        name: food,
        instructions: ['Step 1: ', 'Meanwhile, make the sauce'],
        ingredients: ['Ingredient 1', 'Casserole']
    };

    res.json(recipe);
});

router.post('/', function(req, res, next) {
    const {name, instructions, ingredients} = req.body;

    Recipes.findOne({ name: name}, (err, name) => {
        if (err) return next(err);
        if(!name) {
            new Recipe({
                name: name,
                instructions: instructions,
                ingredients: ingredients
            }).save((err) => {
                if (err) return next(err);
                return res.send(body);
            });
        } else {
            return res.status(403).send("Already has that recipe!");
        }
    });
});

module.exports = router;
