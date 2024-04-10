const { Recipe } = require("./model");

class RecipeDAO {
  // async create(data) {
  //   const recipe = new Recipe(data);
  //   await recipe.save();
  //   return recipe.toObject();
  // }

  /** 아이디 개별 조회 */
  async findById(id) {
    return await Recipe.findById(id).lean();
  }

  async findAll() {
    return await Recipe.find({}).lean();
  }

  /** 레시피 카테고리 조회 */
  async findByCategory(categoryId) {
    return await Recipe.find({ recipe_Category: categoryId }).lean();
  }

  /** 좋아요 배열의 길이를 기준으로 정렬하여 가장 인기 있는 레시피를 조회 */
  async findPopular() {
    return await Recipe.find().sort({ 'like.length': -1 }).limit(10).lean();
  }

  /** 생성 날짜 기준으로 최신 레시피를 조회 */
  async findRecent() {
    return await Recipe.find().sort({ 'createdAt': -1 }).limit(10).lean();
  }

  /** 재료별 페이지 */
  async findByIngredientIdPaginated(ingredientId, page, limit) {
    const recipes = await Recipe.find({ ingredients: ingredientId })
                                .skip((page - 1) * limit)
                                .limit(limit)
                                .lean();
    const total = await Recipe.countDocuments({ ingredients: ingredientId });
    return {
      recipes,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    };
  }

  /** 레시피 타입별 페이지 */
  async findByCategoryIdPaginated(categoryId, page, limit) {
    const recipes = await Recipe.find({ recipe_Category: categoryId })
                                .skip((page - 1) * limit)
                                .limit(limit)
                                .lean();
    const total = await Recipe.countDocuments({ recipe_Category: categoryId });
    return {
      recipes,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    };
  }
  
  /** 검색 결과 페이지 */
  async searchRecipesPaginated(keyword, page, limit, sort = 'score') {
    const query = { $text: { $search: keyword } };
    let sortOptions = { score: { $meta: "textScore" } };  // 기본값은 텍스트 검색 점수 순

    if (sort === 'recent') {
        sortOptions = { createdAt: -1 };  // 최신순 정렬
    } else if (sort === 'popular') {
        sortOptions = { 'like.length': -1 };  // 추천순 정렬
    }

    const recipes = await Recipe.find(query)
                                .sort(sortOptions)
                                .skip((page - 1) * limit)
                                .limit(limit)
                                .lean();
    const total = await Recipe.countDocuments(query);

    return {
        recipes,
        totalPages: Math.ceil(total / limit),
        currentPage: page
    };
  }
}

module.exports = new RecipeDAO();
