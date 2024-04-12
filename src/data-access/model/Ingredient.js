const mongoose = require("mongoose");
const { ingredientSchema } = require("../schema");
const { ingredientCategorySchema } = require("../schema");

const Ingredient = mongoose.model("Ingredients", ingredientSchema);
const Ingredient_Category = mongoose.model("Ingredient_Category", ingredientCategorySchema);

module.exports = { Ingredient, Ingredient_Category };