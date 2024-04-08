const RecipeDAO = require('./recipeDAO');

class RecipeService {
  // 전체 레시피 조회
  async getAllRecipes() {
    return await RecipeDAO.findAll();
  }

  // 재료 ID로 레시피 조회
  async getRecipesByIngredientId(ingredientId) {
    return await RecipeDAO.findByIngredientId(ingredientId);
  }

  // 카테고리 ID로 레시피 조회
  async getRecipesByCategoryId(categoryId) {
    return await RecipeDAO.findByCategoryId(categoryId);
  }

  // 레시피 ID로 단일 레시피 조회
  async getRecipeById(recipeId) {
    return await RecipeDAO.findById(recipeId);
  }

  // 레시피 좋아요 수 업데이트
  async updateRecipeLikes(recipeId, likes) {
    return await RecipeDAO.updateById(recipeId, { like: likes });
  }
  
}

module.exports = new RecipeService();
