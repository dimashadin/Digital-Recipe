"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Recipe.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name is required",
          },
          notEmpty: {
            msg: "Name is required",
          },
        },
      },
      ingredients: {
        type:DataTypes.TEXT,
        allowNull: false,
      validate:{
        notNull:{
          msg : "Ingredients is required"
        },
        notEmpty: {
          msg : "Ingredients is required"
        }
      }
      },
      instructions: {
        type:DataTypes.TEXT,
        allowNull: false,
      validate:{
        notNull:{
          msg : "Instruction is required"
        },
        notEmpty: {
          msg : "Instruction is required"
        }
      }
      },
      prepTimeMinutes: {
        type:DataTypes.INTEGER,
        allowNull: false,
      validate:{
        notNull:{
          msg : "Prep Time Minutes is required"
        },
        notEmpty: {
          msg : "Prep Time Minutes is required"
        }
      }
      },
      difficulty: {
        type:DataTypes.STRING,
        allowNull: false,
      validate:{
        notNull:{
          msg : "difficulty is required"
        },
        notEmpty: {
          msg : "difficulty is required"
        }
      }
      },
      cuisine: {
        type:DataTypes.STRING,
        allowNull: false,
      validate:{
        notNull:{
          msg : "Cuisine is required"
        },
        notEmpty: {
          msg : "Cuisine is required"
        }
      }
      },
      caloriesPerServing: {
        type:DataTypes.INTEGER,
        allowNull: false,
      validate:{
        notNull:{
          msg : "Calories per Serving is required"
        },
        notEmpty: {
          msg : "Calories per Serving is required"
        }
      }
      },
      UserId: {
        type:DataTypes.INTEGER,
        allowNull: false,
      validate:{
        notNull:{
          msg : "UserId is required"
        },
        notEmpty: {
          msg : "UserId is required"
        }
      }
      },
      image: {
        type:DataTypes.STRING,
        allowNull: false,
      validate:{
        notNull:{
          msg : "Image is required"
        },
        notEmpty: {
          msg : "Image is required"
        }
      }
      },
      rating: {
        type:DataTypes.INTEGER,
        allowNull: false,
      validate:{
        notNull:{
          msg : "Rating is required"
        },
        notEmpty: {
          msg : "Rating is required"
        }
      }
      },
    },
    {
      sequelize,
      modelName: "Recipe",
    }
  );
  return Recipe;
};
