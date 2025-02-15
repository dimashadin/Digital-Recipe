const { Recipe } = require("../models/");

class RecipeController {
  static async allRecipe(req, res, next) {
    try {
      const data = await Recipe.findAll();

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async addRecipe(req, res, next) {
    try {
      let {
        name,
        ingredients,
        instructions,
        difficulty,
        cuisine,
        image,
        prepTimeMinutes,
        caloriesPerServing,
        rating,
       } = req.body;

      let data = await Recipe.create({
        name,
        ingredients,
        instructions,
        difficulty,
        cuisine,
        image,
        prepTimeMinutes,
        caloriesPerServing,
        rating,
        UserId: req.user.id,
      });

      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async recipeById(req,res,next){
    try {
      let {id} = req.params

      let data = await Recipe.findByPk(+id)

      if (!data) {
        throw { name: "NotFound" };
      }

      res.status(200).json(data)
      
    } catch (error) {
      next(error)
    }
  }

  static async updateRecipe(req,res,next){
    try {
      let { id } = req.params;

      let data = await Recipe.findByPk(+id)

      if (!data) {
        throw { name: "NotFound" };
      }

      await Recipe.update(req.body, {
        where: {
          id,
        },
      });

      res.status(200).json(data);
    } catch (error) {
      next(error)
    }
  }

  static async deleteRecipe(req,res,next){
    try {
      let { id } = req.params;

      await Recipe.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: "Recipe Success to delete",
      });
    } catch (error) {
      next(error)
    }
  }
}

module.exports = RecipeController;
