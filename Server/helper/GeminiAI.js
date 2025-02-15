const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const gemini = async (message) => {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `${message}. Berikan saya 1 resep dan buatkan dalam format berikut:
  {
    "recipeName": "Nama Resep",
    "ingredients": [
      "Bahan 1",
      "Bahan 2",
      "Bahan 3"
    ],
    "instruction": [
      "Langkah 1",
      "Langkah 2",
      "Langkah 3"
    ]
  }
    And please make the response with json format. Create without \`\`\`json and \`\`\``;

  const result = await model.generateContent(prompt);
  let text = result.response.text();

  text = JSON.parse(text.trim());

  //   console.log(result.response.text());
  return text;
};

module.exports = { gemini };
