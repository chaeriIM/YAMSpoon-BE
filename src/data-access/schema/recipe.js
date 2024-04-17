const mongoose = require("mongoose");

const recipeCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const ingredientSchema = new mongoose.Schema({
  ingredientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ingredient',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  }
}, { _id: false });

const sauceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  }
}, { _id: false });

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  content: [{
    type: String,
    required: true
  }],
  ingredients: [ingredientSchema], 
  sauce: [sauceSchema],           
  like: [{
    type: String,
    ref: 'User',
    required: false
  }],
  img: {
    type: [String],
    required: false
  },
  recipe_Category: {
    categoryId: {   
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe_Category',
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = {
  recipeCategorySchema,
  recipeSchema
};