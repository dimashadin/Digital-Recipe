const { comparePass } = require("../helper/bcrypt");
const { signToken } = require("../helper/jwt");
const { User } = require("../models/");
const { OAuth2Client } = require("google-auth-library");

class UserController {
  static async login(req, res, next) {
    try {
      let { email, password } = req.body;

      if (!email) {
        throw { name: "EmailRequired" };
      }

      if (!password) {
        throw { name: "PasswordRequired" };
      }

      let user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw { name: "Unauthenticated" };
      }

      const compared = comparePass(password, user.password);

      if (!compared) {
        throw { name: "Unauthenticated" };
      }

      const access_token = signToken({ id: user.id });

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      let { username, email, password } = req.body;

      let newUser = await User.create({
        username,
        email,
        password,
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.log(error);

      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { google_token } = req.headers;
      const client = new OAuth2Client();

      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      const email = payload.email;
      const username = payload.name;

      // let [user, created] = await User.findOrCreate({
      //   where: {
      //     email
      //   },
      //   defaults: {
      //     email,
      //     password: "googleLogin"
      //   },
      //   hooks: false
      // })

      // if(!created) {
      //   if(user.password !== 'googleLogin') {
      //     throw { name: "GoogleFailed" }
      //   }
      // }

      let user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        user = await User.create(
          {
            username,
            email,
            password: "googleLogin",
          },
          {
            hooks: false,
          }
        );
      } else {
        if (user.password !== "googleLogin") {
          throw { name: "GoogleFailed" };
        }
      }

      const access_token = signToken({ id: user.id });

      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = { UserController };
