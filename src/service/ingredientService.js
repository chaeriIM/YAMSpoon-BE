const { ingredientDAO } = require('../data-access');

class ingredientService {
  getAllCategories() {
    return ingredientDAO.findAllCategories();
  }

  getIngredientsByCategoryId(categoryId) {
    return ingredientDAO.findIngredientsByCategoryId(categoryId);
  }
}

module.exports = new ingredientService();