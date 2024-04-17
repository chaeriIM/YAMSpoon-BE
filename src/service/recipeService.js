const { recipeDAO } = require('../data-access');


class RecipeService {
  // 전체 레시피 조회
  async getAllRecipes() {
    return await recipeDAO.findAll();
  }

  // 레시피 추가 서비스
  async addRecipe(recipeData, id) {
    recipeData.creatorId = id;
    return await recipeDAO.create(recipeData);
  }

  // 레시피 수정
  async updateRecipe(recipeId, recipeData, userId) {
    // 사용자 ID를 검증하여 해당 사용자가 레시피를 수정할 권한이 있는지 확인
    const existingRecipe = await recipeDAO.findById(recipeId);
    if (!existingRecipe || existingRecipe.creatorId.toString() !== userId.toString()) {
      return null;  // 권한이 없는 경우, null 반환
    }
  
    return await recipeDAO.updateById(recipeId, recipeData);
  }  

  // 레시피 삭제 (assuming there is a method for it)
  async deleteRecipe(recipeId, userId) {
    // 사용자 ID를 검증하여 해당 사용자가 레시피를 삭제할 권한이 있는지 확인
    const existingRecipe = await recipeDAO.findById(recipeId);
    if (!existingRecipe || existingRecipe.creatorId.toString() !== userId.toString()) {
      return false;  // 권한이 없는 경우, false 반환
    }
    await recipeDAO.deleteById(recipeId);
    return true;
  }

  // // 재료 ID로 레시피 조회
  // async getRecipesByIngredientId(ingredientId) {
  //   return await recipeDAO.findByIngredientId(ingredientId);
  // }

  // // 카테고리 ID로 레시피 조회
  // async getRecipesByCategoryId(categoryId) {
  //   return await recipeDAO.findByCategoryId(categoryId);
  // }

  // 레시피 ID로 단일 레시피 조회
  async getRecipeById(recipeId) {
    return await recipeDAO.findById(recipeId);
  }

  // 레시피 좋아요 수 업데이트
  // async updateRecipeLikes(recipeId, userId) {
  //   const recipe = await this.getRecipeById(recipeId);
  //   const updatedLikes = recipe.like.includes(userId) ? recipe.like.filter(id => id !== userId) : [...recipe.like, userId];
  //   return await recipeDAO.updateById(recipeId, { like: updatedLikes });
  // }
  async updateRecipeLikes(recipeId, userId) {
    const recipe = await this.getRecipeById(recipeId);
    if (!recipe) {
      throw new Error('Recipe not found');
    }
    const updatedLikes = recipe.like.includes(userId) ?
      recipe.like.filter(id => id !== userId) : // 문자열 직접 비교
      [...recipe.like, userId];  // 직접 추가
    return await recipeDAO.updateById(recipeId, { like: updatedLikes });
  }
  
  
  // 인기 레시피 조회
  async getPopularRecipes() {
    return await recipeDAO.findPopular();
  }

  // 최신 레시피 조회
  async getRecentRecipes() {
    return await recipeDAO.findRecent();
  }

  //레시피 카테고리 조회
  async listAllCategories() {
    return await recipeDAO.findAllCategories();
  }

  //재료별 레시피 개별 조회
  async getRecipesByIngredientId(ingredientId) {
    return await recipeDAO.findByIngredientId(ingredientId);
  }

  //레시피 타입별 개별 조회
  async getRecipesByCategoryId(categoryId) {
    return await recipeDAO.findByCategoryId(categoryId);
  }
  
  // // 레시피 검색 결과
  // async searchRecipes(keyword, sort = 'score') {
  //   return await recipeDAO.searchRecipesPaginated(keyword, sort);
  // }
    
}

module.exports = new RecipeService();
