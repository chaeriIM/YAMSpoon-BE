const { Ingredient } = require('./model')
const {Ingredient_Category } = require('./model');

class ingredientDAO {
  async findAllCategories() {
    return await Ingredient_Category.find().lean();
  }

  async findIngredientsByCategoryId(categoryId) {
    return await Ingredient_Category.findById(categoryId).populate('ingredients').lean();
  }

  async findIngredientsById (id) {
    const ingredient = await Ingredient.findById(id);
    return ingredient;
  }
}

module.exports = new ingredientDAO();
