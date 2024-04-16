const { ingredientDAO } = require('../data-access');

class ingredientService {
  async getAllCategories() {
    return await ingredientDAO.findAllCategories();
  }

  async getIngredientsByCategoryId(categoryName) {
    // console.log(categoryName);
    const ingredients = await ingredientDAO.findIngredientsByCategoryId(categoryName);
    // console.log(ingredients);
    return ingredients;
  }
}

module.exports = new ingredientService();