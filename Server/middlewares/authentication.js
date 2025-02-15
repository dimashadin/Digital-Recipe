const { verifyToken } = require("../helper/jwt");
const { User } = require("../models/");

async function authentication(req, res, next) {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      throw { name: "Unauthorized" };
    }

    const token = bearerToken.split(" ")[1];

    const payload = verifyToken(token);
    // console.log(payload , '--- ini payload');

    const user = await User.findByPk(payload.id);

    if (!user) {
      throw { name: "Unauthorized" };
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
