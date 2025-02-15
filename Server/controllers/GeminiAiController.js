const { gemini } = require("../helper/GeminiAI");

class GeminiAiController {
  static async GeminiAi(req, res, next) {
    try {
        const { message } = req.body;

    let data = await gemini(message)

    res.status(200).json(data)
    } catch (error) {
        console.log(error);
        
    }

    
  }
}

module.exports={GeminiAiController}
