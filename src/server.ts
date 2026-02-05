import { createServer } from "http";
import next from "next";
import * as cookie from "cookie";
import { Server } from "socket.io";
import { jwtVerify } from "jose";
import { createFriendship, getUserByUsername } from "./db/queries";

const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();
const socketsMap = new Map<string, string>();

app.prepare().then(async () => {
  const server = createServer((req, res) => handle(req, res));

  const io = new Server(server, { cookie: true });

  io.use(async (socket, next) => {
    const cookies = socket.handshake.headers.cookie;
    try {
      if (!!cookies) {
        const token = cookie.parse(cookies)["auth-token"];
        if (token) {
          const secret = new TextEncoder().encode(process.env.JWT_SECRET);
          const { payload } = await jwtVerify(token, secret);
          (socket as any).user = payload;
        }
      }
    } catch (e) {}
    next();
  });

  io.on("connection", (socket) => {
    const user = (socket as any).user;

    socketsMap.set(user.id, socket.id);

    socket.on("send-friend", async (username) => {
      const friend = await getUserByUsername(String(username));
      if (friend === undefined) {
        socket.emit("feedback", {
          message: "This user dont exists",
          isError: true,
        });
        return;
      }

      await createFriendship(user.id, friend.id);
      socket.emit("feedback", { message: "Request sended!", isError: false });
      const friendSocketId = socketsMap.get(friend.id);

      if (friendSocketId)
        socket.to(friendSocketId).emit("friendship-receive", user.username);
    });

    socket.on("move-piece", (hex: Hex, card: Card) => {
      if (hex.q + hex.r + hex.s !== 0) return;
      if (Math.max(hex.q, hex.r, hex.s) > 5) return;
      socket.emit("board-update", hex, card);
    });
  });

  server.listen(3000, () => {
    console.log("Server is now active");
  });
});
