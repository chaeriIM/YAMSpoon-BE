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
    return User.findByIdAndDelete(id);
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
  async updateIngredients(id, ingredientInfo) {
    const user = await User.findById(id);

    if (!user) {
      throw new Error('User not found');
    }
  
    for (const id of ingredientInfo) {
      const ingredient = await Ingredient.findById(id);
      if (!ingredient) {
        throw new Error(`Invalid Ingredient ID: ${id}`);
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
  async updateBookmark(id, recipeInfo) {
    const user = await User.findById(id);

    if (!user) {
      throw new Error('User not found');
    }
  
    for (const id of recipeInfo) {
      const recipe = await Recipe.findById(id);
      if (!recipe) {
        throw new Error(`Invalid Recipe ID: ${id}`);
      }
  

      const existingRecipeIndex = user.recipe.findIndex(item => item.equals(recipe._id));
      if (existingRecipeIndex === -1) {

        user.recipe.push(recipe);
      }
    }
  
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
