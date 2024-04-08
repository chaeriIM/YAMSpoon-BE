const { Recipe } = require("./model");

class RecipeDAO {
  async create(data) {
    const recipe = new Recipe(data);
    await recipe.save();
    return recipe.toObject();
  }

  async findById(id) {
    return await Recipe.findById(id).lean();
  }

  async findAll() {
    return await Recipe.find({}).lean();
  }

  async findByCategory(categoryId) {
    return await Recipe.find({ recipe_Category: categoryId }).lean();
  }

  async updateById(id, updateData) {
    return await Recipe.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).lean();
  }

  async deleteById(id) {
    return await Recipe.findByIdAndDelete(id);
  }
}

module.exports = new RecipeDAO();
