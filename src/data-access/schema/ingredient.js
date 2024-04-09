const mongoose = require('mongoose');

// 재료 카테고리 서브스키마 정의
const ingredientCategorySchema = new mongoose.Schema(
  {
  category_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
  }
);

// 재료 스키마 정의
const ingredientSchema = new mongoose.Schema(
  {
    ingredient_id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    ingredient_Category: {
      type: ingredientCategorySchema, // 서브스키마 적용
      required: true
    }
  }
);

module.exports = {
  ingredientCategorySchema,
  ingredientSchema
};
