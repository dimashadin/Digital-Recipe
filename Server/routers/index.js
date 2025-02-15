const express = require("express");
const { UserController } = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");
const RecipeController = require("../controllers/recipeController");
const {GeminiAiController} = require("../controllers/GeminiAiController");
const { PaymentController } = require("../controllers/PaymentController");
const authorization = require("../middlewares/authorization");


const router = express.Router();

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post('/google-login', UserController.googleLogin)

router.post('/gemini', GeminiAiController.GeminiAi)

router.use(authentication);

router.get('/recipe',  RecipeController.allRecipe)

router.post('/recipe',  RecipeController.addRecipe)

router.get('/payment/midtrans/initiate', PaymentController.initiateMidtransTrx )

router.get('/recipe/:id',  RecipeController.recipeById)

router.put('/recipe/:id', authorization ,RecipeController.updateRecipe)

router.delete('/recipe/:id',authorization, RecipeController.deleteRecipe)









module.exports = router;
