const { recipeService } = require('../service');
const utils = require('../misc/utils');

const recipeController = {
  // 전체 레시피 조회
  async listAllRecipes(req, res, next) {
    try {
      const recipes = await recipeService.getAllRecipes();
      res.json(utils.buildResponse(recipes));
    } catch (err) {
      next(err);
    }
  },

  // 인기 레시피 조회
  async listPopularRecipes(req, res, next) {
    try {
      const popularRecipes = await recipeService.getPopularRecipes();
      res.json(utils.buildResponse(popularRecipes));
    } catch (err) {
      next(err);
    }
  },

  // 최신 레시피 조회
  async listRecentRecipes(req, res, next) {
    try {
      const recentRecipes = await recipeService.getRecentRecipes();
      res.json(utils.buildResponse(recentRecipes));
    } catch (err) {
      next(err);
    }
  },

  // 재료 ID로 레시피 조회
  async listRecipesByIngredient(req, res, next) {
    try {
      const { ingredientId } = req.params;
      const recipes = await recipeService.getRecipesByIngredientId(ingredientId);
      res.json(utils.buildResponse(recipes));
    } catch (err) {
      next(err);
    }
  },

  // 레시피 카테고리 전체 조회
  async listAllCategories(req, res) {
    try {
      const categories = await recipeService.listAllCategories();
      res.json(utils.buildResponse(categories));
    } catch (err) {
      next(err);
    }
  },
  
  // 카테고리 ID로 레시피 조회
  async listRecipesByCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      const recipes = await recipeService.getRecipesByCategoryId(categoryId);
      res.json(utils.buildResponse(recipes));
    } catch (err) {
      next(err);
    }
  },

  // 레시피 ID로 단일 레시피 조회
  async getRecipe(req, res, next) {
    try {
      const { id } = req.params;
      const recipe = await recipeService.getRecipeById(id);
      res.json(utils.buildResponse(recipe));
    } catch (err) {
        next(err);
    }
  },

  // 레시피 좋아요 수 업데이트
  async updateRecipeLikes(req, res, next) {
    try {
      const { id: recipeId } = req.params;
      const { userId } = res.locals.user; // 사용자 ID는 요청 본문에서 가져옴
      const updatedRecipe = await recipeService.updateRecipeLikes(recipeId, userId);
      if (!updatedRecipe) {
        return res.status(404).json(utils.buildResponse(null, "Recipe not found"));
      }
      res.json(utils.buildResponse(updatedRecipe));
    } catch (err) {
      next(err);
    }
  },

  // // 레시피 검색
  // async searchRecipes(req, res, next) {
  //   try {
  //     const { keyword, sort } = req.query;
  //     const page = parseInt(req.query.page) || 1;
  //     const limit = parseInt(req.query.limit) || 15;
  //     const result = await recipeService.searchRecipesPaginated(keyword, page, limit, sort);
  //     res.json(utils.buildResponse(result));
  //   } catch (err) {
  //     next(err);
  //   }
  // }
};

module.exports = recipeController;
