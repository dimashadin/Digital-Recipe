const { User } = require("../models/");
const { Recipe } = require("../models/");

async function authorization(req, res, next) {
  try {
    let { id } = req.params;

    let data = await Recipe.findByPk(+id);

    if (!data) {
      throw { name: "NotFound" };
    }

    if (data.UserId !== req.user.id) {
      throw { name: "Forbidden" };
    }

    next();
  } catch (error) {
    // console.log(error);
    next(error);
  }
}

module.exports = authorization;
