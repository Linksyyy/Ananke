import { createServer } from "http";
import next from "next";
import * as cookie from "cookie";
import { Server } from "socket.io";
import { jwtVerify } from "jose";
import { socketServer } from "./sockets-server";

const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();

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

  socketServer(io);

  server.listen(3000, () => {
    console.log("Server is now active");
  });
});
