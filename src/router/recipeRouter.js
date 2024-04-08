const express = require('express');
const router = express.Router();
const RecipeService = require('./recipeService');

// 전체 레시피 조회
router.get('/recipes', async (req, res) => {
  try {
    const recipes = await RecipeService.getAllRecipes();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error', error: error.message });
  }
});

// 재료 ID로 레시피 조회
router.get('/recipes/ingredients/:ingredientId', async (req, res) => {
  try {
    const recipes = await RecipeService.getRecipesByIngredientId(req.params.ingredientId);
    if (!recipes.length) {
      return res.status(404).send({ message: 'Recipes not found with given ingredient ID' });
    }
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error', error: error.message });
  }
});

// 카테고리 ID로 레시피 조회
router.get('/recipes/categories/:categoryId', async (req, res) => {
  try {
    const recipes = await RecipeService.getRecipesByCategoryId(req.params.categoryId);
    if (!recipes.length) {
      return res.status(404).send({ message: 'Recipes not found with given category ID' });
    }
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error', error: error.message });
  }
});

// 레시피 ID로 단일 레시피 조회
router.get('/recipes/:id', async (req, res) => {
  try {
    const recipe = await RecipeService.getRecipeById(req.params.id);
    if (!recipe) {
      return res.status(404).send({ message: 'Recipe not found' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error', error: error.message });
  }
});

// 레시피 좋아요 수 업데이트
router.put('/recipes/:id/like', async (req, res) => {
  try {
    const userId = req.auth.id; //

    const updatedRecipe = await RecipeService.updateRecipeLikes(req.params.id, userId);
    if (!updatedRecipe) {
      return res.status(404).send({ message: 'Recipe not found' });
    }
    res.status(200).json(updatedRecipe);
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      res.status(401).send({ message: 'Unauthorized: Invalid token' });
    } else{
      res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
  }
});


module.exports = router;
