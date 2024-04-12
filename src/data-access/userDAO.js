const { User } = require('./model');
const { Ingredient } = require('./model');
const { Recipe } = require('./model');

class UserDAO {

  //@desc get userInfo
  async findUserById (id) {
    const user = await User.findById(id);
    return user;
  }

  //@desc find user by userId
  async findUserByUserId (userId) {
    const user = await User.findOne({ userId });
    return user;
  }

  //@desc find user by nickname
  async findUserByNickname (nickname) {
    const user = await User.findOne({ nickname });
    return user;
  }

  //@desc create userInfo
  async create ({ userId, name, email, password, nickname, isAdmin }) {
    const user = await User.create({ userId, name, email, password, nickname, isAdmin });
    return user;
  }

  //@desc update userInfo
  async updateUser (id, { userId, name, email, password, nickname, isAdmin, ingredients, recipe }) {
    const updateUser = await User.findByIdAndUpdate (
      id, 
      { userId, 
        name, 
        email, 
        password, 
        nickname, 
        isAdmin,
        ingredients,
        recipe
      },
      {
        runValidators: true,
        new: true,
      });

      // console.log(updateUser);

    return updateUser;
  }

  //@desc delete userInfo
  async deleteUser (id) {
    return User.deleteOne(id);
  }

  //@ get user fridge
  async findFirdgeById (id) {
    const userFridge = await User.findById(id).populate('ingredients').lean();

    if (!userFridge ) {
      throw new Error ('userFridge not found');
    }

    return userFridge;
  }

  //@desc update ingredients in fridge
  async updateIngredients(id, updateData) {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
  
    for (const ingredientId of updateData) {
      const ingredient = await Ingredient.findById(ingredientId);
      if (!ingredient) {
        throw new Error(`Invalid Ingredient ID: ${ingredientId}`);
      }
  

      const existingIngredientIndex = user.ingredients.findIndex(item => item.equals(ingredient._id));
      if (existingIngredientIndex === -1) {

        user.ingredients.push(ingredient);
      }
    }
  
    await user.save(); 
  
    return user;
  }
  
  //@desc update bookmark recipe 
  async updateBookmark(id, updateData) {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
  
    const recipes = [];
  
    for (const recipeId of updateData) {
      const recipe = await Recipe.findById(recipeId);
      if (!recipe) {
        throw new Error(`Invalid Recipe ID: ${recipeId}`);
      }
      recipes.push(recipe);
    }
  
    user.recipes = recipes; 
  
    await user.save(); 
  
    return user;
  }
  

  //@desc find userId
  async finduserId ( name, email ) {
    const user = await User.findOne ( { name, email });
    return user;
  }

  //@desc find user password
  async finduserPassword ( userId, email ) {
    const user = await User.findOne ( { userId, email });
    return user;
  }

}

module.exports = new UserDAO();