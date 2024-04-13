const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  category : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ingredients_category'
  },
  name: { 
    type: String, 
    required: true 
  }
});

const ingredientCategorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  }
});

module.exports = { 
  ingredientSchema, 
  ingredientCategorySchema 
};
