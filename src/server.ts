import { createServer } from "http";
import next from "next";
import * as cookie from "cookie";
import { Server, DefaultEventsMap } from "socket.io";
import { jwtVerify } from "jose";
import socketServer, {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketData,
  user,
} from "./sockets-server";

const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = createServer((req, res) => handle(req, res));

  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    DefaultEventsMap,
    SocketData
  >(server, { cookie: true });

  io.use(async (socket, next) => {
    const cookies = socket.handshake.headers.cookie;

    if (!cookies) {
      return next(new Error("Authentication error: No cookies found"));
    }

    try {
      const token = cookie.parse(cookies)["auth-token"];

      if (!token) {
        throw new Error("Auth token missing");
      }

      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      socket.data.user = payload as unknown as user;
      next();
    } catch (err) {
      console.error(
        "Socket Auth Error:",
        err instanceof Error ? err.message : err,
      );
      next(new Error("Authentication error: Invalid token"));
    }
  });

  socketServer(io);

  server.listen(3000, () => {
    console.log("Server is now active");
  });
});
