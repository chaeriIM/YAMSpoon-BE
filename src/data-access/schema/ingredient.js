const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  }
});

const ingredientCategorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  ingredients: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Ingredients' 
  }]
});

module.exports = { 
  ingredientSchema, 
  ingredientCategorySchema 
};
