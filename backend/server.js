const cors = require("cors");
require("dotenv").config();
const app = require("./src/app");
const { Server } = require("socket.io");
const { createServer } = require("http");
const { generateContent } = require("./src/services/ai.service");

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  const chatHistory = [];
  // connect user
  console.log("User connected", socket.id);

  // disconnect user
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  // message event
  socket.on("ai-message", async (data) => {
    chatHistory.push({
      role: "user",
      parts: [{ text: data }],
    });
    const res = await generateContent(chatHistory);

    chatHistory.push({
      role: "model",
      parts: [{ text: res }],
    });
    socket.emit("ai-message-res", res);
  });
});

httpServer.listen(3000, () => {
  console.log("Server is running...");
});
