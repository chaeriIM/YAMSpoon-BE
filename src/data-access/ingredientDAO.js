const { Ingredient } = require('./model')
const {Ingredient_Category } = require('./model');

class ingredientDAO {
  async findAllCategories() {
    return await Ingredient_Category.find().lean();
  }

  // async findIngredientsByCategoryName(categoryName) {
  //   // const category = await Ingredient_Category.findOne({ name : categoryName });
  //   //  console.log(category);

  //   // if(!category) {
  //   //   throw new Error('Category not found');
  //   // }

  //   // const categoryId = category.id;
  //   // // console.log(categoryId);

  //   // const ingredients = await Ingredient.find({ category: categoryId });
  //   // // console.log(ingredients);
  //   // return ingredients;
  // }

  async findIngredientsByCategoryId(categoryName) {
    return await Ingredient.find({"Ingredient_Category.name": categoryName }).lean();
  }
  

  async findIngredientsById (id) {
    const ingredient = await Ingredient.findById(id);
    return ingredient;
  }
}

module.exports = new ingredientDAO();
