import { DefaultEventsMap, Server } from "socket.io";
import { createFriendship, getUserByUsername } from "./db/queries";

const socketsMap = new Map<string, string>();

export function socketServer(
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
) {
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
