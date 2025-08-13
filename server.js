require("dotenv").config();
const app = require("./src/app");
const { Server } = require("socket.io");
const { createServer } = require("http");
const gerateContent = require("./src/services/ai.service");
const generateContent = require("./src/services/ai.service");

const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

io.on("connection", (socket) => {
  // connect user
  console.log("User connected");

  // disconnect user
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  // message event
  socket.on("ai-message", async (data) => {
    const res = await generateContent(data);

    socket.emit("ai-msg-response", res);
  });
});

httpServer.listen(3000, () => {
  console.log("Server is running...");
});
