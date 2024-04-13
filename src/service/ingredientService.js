const { ingredientDAO } = require('../data-access');

class ingredientService {
  async getAllCategories() {
    return await ingredientDAO.findAllCategories();
  }

  async getIngredientsByCategoryName(categoryName) {
    // console.log(categoryName);
    const ingredients = await ingredientDAO.findIngredientsByCategoryName(categoryName);
    console.log(ingredients);
    return ingredients;
  }
}

module.exports = new ingredientService();