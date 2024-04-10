const { Ingredient, IngredientCategory } = require('./model');

class IngredientDAO {
  async findAllCategories() {
    return await IngredientCategory.find().lean();
  }

  async findIngredientsByCategoryId(categoryId) {
    return await IngredientCategory.findById(categoryId).populate('ingredients').lean();
  }
}

module.exports = new IngredientDAO();
