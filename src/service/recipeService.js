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
  async updateRecipeLikes(recipeId, userId) {
    const recipe = await this.getRecipeById(recipeId);
    const updatedLikes = recipe.like.includes(userId) ? recipe.like.filter(id => id !== userId) : [...recipe.like, userId];
    return await RecipeDAO.updateById(recipeId, { like: updatedLikes });
  }
  
  // 인기 레시피 조회
  async getPopularRecipes() {
    return await RecipeDAO.findPopular();
  }

  // 최신 레시피 조회
  async getRecentRecipes() {
    return await RecipeDAO.findRecent();
  }

  //재료별 레시피 페이지네이션
  async getRecipesByIngredientIdPaginated(ingredientId, page, limit) {
    return await RecipeDAO.findByIngredientIdPaginated(ingredientId, page, limit);
  }

  //레시피 타입별 페이지네이션
  async getRecipesByCategoryIdPaginated(categoryId, page, limit) {
    return await RecipeDAO.findByCategoryIdPaginated(categoryId, page, limit);
  }
  
  // 레시피 검색 결과
  async searchRecipesPaginated(keyword, page, limit =15, sort = 'score') {
    return await RecipeDAO.findByTextPaginated(keyword, page, limit, sort);
  }
    
}

module.exports = new RecipeService();
