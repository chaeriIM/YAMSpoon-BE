const { ingredientService } = require('../service');
const utils = require('../misc/utils');

const ingredientController = {
  
  
  async listAllCategories(req, res, next) {
    try {
      const categories = await ingredientService.getAllCategories();
      res.status(200).json(utils.buildResponse(categories));
    } catch (err) {
      next(err);
    }
  },

  async listIngredientsByCategory(req, res, next) {
    const { categoryId } = req.params.categoryId;
    const categoryWithIngredients = await ingredientService.getIngredientsByCategoryId(categoryId);
    try {
      if (!categoryWithIngredients) {
        res.status(404).json(utils.buildResponse(null, "Category not found"));
      } else {
        res.json(utils.buildResponse(categoryWithIngredients.ingredients));
      }
    }catch (err) {
      next(err);
    }
  }
};

module.exports = ingredientController;