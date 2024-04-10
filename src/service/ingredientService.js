const { ingredientDAO } = require('../data-access');

class IngredientService {
  getAllCategories() {
    return ingredientDAO.findAllCategories();
  }

  getIngredientsByCategoryId(categoryId) {
    return ingredientDAO.findIngredientsByCategoryId(categoryId);
  }
}

module.exports = new IngredientService();