const { IngredientDAO } = require('../data-access');

class ingredientService {
  getAllCategories() {
    return IngredientDAO.findAllCategories();
  }

  getIngredientsByCategoryId(categoryId) {
    return IngredientDAO.findIngredientsByCategoryId(categoryId);
  }
}

module.exports = new ingredientService();