import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";

const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = createServer((req, res) => handle(req, res));

  const io = new Server(server);

  io.on("connection", (socket) => {
    socket.on("movePiece", (hex: Hex, card: Card) => {
      if (hex.q + hex.r + hex.s !== 0) return;
      if (Math.max(hex.q, hex.r, hex.s) > 5) return;
      socket.emit("boardUpdate", hex, card);
    });
  });

  server.listen(3000, () => {
    console.log("Server is now active");
  });
});
