import { DefaultEventsMap, Server } from "socket.io";
import {
  createFriendship,
  getFriendshipOfUser,
  getUserByUsername,
} from "./db/queries";

const socketsMap = new Map<string, string>();

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

export function socketServer(
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
) {
  io.on("connection", async (socket) => {
    const user = (socket as any).user;

    socketsMap.set(user.id, socket.id);

    const friendships = await getFriendshipOfUser(user.id);

    socket.emit("init", {
      friendshipRequest: friendships.map((f) => f.sender),
      friendshipSent: friendships.map((f) => f.receiver),
      friends: friendships
        .filter((f) => f.status === "accepted")
        .map((f) => (f.sender.id === user.id ? f.receiver : f.sender)),
    } as initPayload);

    socket.on("send-friend", async (username) => {
      const friend = await getUserByUsername(String(username));
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
          message: "You can't send request to yourself",
          isError: true,
        });

        return;
      }

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
}
