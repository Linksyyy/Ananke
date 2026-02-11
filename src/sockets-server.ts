import { Server, DefaultEventsMap } from "socket.io";
import {
  createFriendship,
  getFriendshipOfUser,
  getUserByUsername,
} from "./db/queries";

export interface user {
  id: string;
  username: string;
  email: string;
  bcrypted_password: string;
}

export interface initPayload {
  friendshipRequest: user[];
  friendshipSent: user[];
  friends: user[];
}

export interface Hex {
  q: number;
  r: number;
  s: number;
}

export interface Card {
  id: string;
  name: string;
}

export interface ServerToClientEvents {
  init: (payload: initPayload) => void;
  feedback: (data: { message: string; isError: boolean }) => void;
  "friendship-receive": (username: string) => void;
  "board-update": (hex: Hex, card: Card) => void;
}

export interface ClientToServerEvents {
  "send-friend": (username: string) => void;
  "move-piece": (hex: Hex, card: Card) => void;
}

export interface SocketData {
  user: user;
}

const socketsMap = new Map<string, string>();

export default function socketServer(
  io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    DefaultEventsMap,
    SocketData
  >,
) {
  io.on("connection", async (socket) => {
    const user = socket.data.user;

    if (!user) return;

    socketsMap.set(user.id, socket.id);

    const friendships = await getFriendshipOfUser(user.id);

    socket.emit("init", {
      friendshipRequest: friendships.map((f) => f.sender),
      friendshipSent: friendships.map((f) => f.receiver),
      friends: friendships
        .filter((f) => f.status === "accepted")
        .map((f) => (f.sender.id === user.id ? f.receiver : f.sender)),
    });

    socket.on("send-friend", async (username: string) => {
      const friend = await getUserByUsername(username);

      if (friend === undefined) {
        socket.emit("feedback", {
          message: "This user dont exists",
          isError: true,
        });
        return;
      }

      const friendship = await createFriendship(user.id, friend.id);

      if (friendship === undefined) {
        socket.emit("feedback", {
          message: "You can t send request to yourself",
          isError: true,
        });
        return;
      }

      socket.emit("feedback", { message: "Request sended!", isError: false });

      const friendSocketId = socketsMap.get(friend.id);
      if (friendSocketId) {
        socket.to(friendSocketId).emit("friendship-receive", user.username);
      }
    });

    socket.on("move-piece", (hex: Hex, card: Card) => {
      if (hex.q + hex.r + hex.s !== 0) return;
      if (Math.max(hex.q, hex.r, hex.s) > 5) return;
      socket.emit("board-update", hex, card);
    });

    socket.on("disconnect", () => {
      if (user?.id) {
        socketsMap.delete(user.id);
      }
    });
  });
}
