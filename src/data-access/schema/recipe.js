const mongoose = require("mongoose");

const recipeCategorySchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true 
  }
});

const recipeSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: {
    type: [String],
    required: false
  },
  content: { 
    type: String, 
    required: true 
  },
  ingredients: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Ingredient', 
    required: true 
  }],
  sauce: { 
    type: [String], 
    required: true 
  },
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
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Recipe_Category', 
    required: true 
  }
}, 
{
  timestamps: true,
  versionKey: false
}
);

module.exports = {
  recipeCategorySchema,
  recipeSchema
};
