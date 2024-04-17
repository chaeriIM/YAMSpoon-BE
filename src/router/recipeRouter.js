const express = require('express');
const { recipeController }= require('../controller');
const { authMiddleware } = require('../middleware');

const recipeRouter = express.Router();

// 전체 레시피 조회
recipeRouter.get('/', recipeController.listAllRecipes);

//레시피 추가
recipeRouter.post('/', recipeController.createRecipe);

// // 레시피 검색
// recipeRouter.get('/search', recipeController.searchRecipes);

// 인기 레시피 조회
recipeRouter.get('/popular', recipeController.listPopularRecipes);

// 최신 레시피 조회
recipeRouter.get('/recent', recipeController.listRecentRecipes);

// 레시피 카테고리 전체 조회
recipeRouter.get('/categories', recipeController.listAllCategories);

// 카테고리 ID로 레시피 조회
recipeRouter.get('/categories/:categoryId', recipeController.listRecipesByCategory);

// 재료 ID로 레시피 조회
recipeRouter.get('/ingredients/:ingredientId', recipeController.listRecipesByIngredient);

// 레시피 ID로 단일 레시피 조회
recipeRouter.get('/:id', recipeController.getRecipe);

// 레시피 좋아요 수 업데이트
recipeRouter.put('/like/:id',
  authMiddleware.isAuthenticated,
  recipeController.updateRecipeLikes);


module.exports = recipeRouter;
