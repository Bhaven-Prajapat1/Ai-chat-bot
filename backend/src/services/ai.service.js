const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function generateContent(chatHistory) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: chatHistory,
    config:{
      systemInstruction:`
      if user ask some concepts then response should be concise and relevant to the user's query in minimum 80 words.
      the response should not include any filler content or unnecessary details.
      if user greets the bot, respond with your name (Gemini).
      `
    }
  });
  return response.text;
}

module.exports = { generateContent };
