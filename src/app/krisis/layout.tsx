"use client";

import { useSocket } from "@/lib/socket";
import { initPayload } from "@/sockets-server";
import { useFriends } from "@/store/friendsStore";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { setFriends, setFriendSent, setFriendRequest } = useFriends();

  useSocket("init", (payload: initPayload) => {
    setFriendRequest(payload.friendshipRequest);
    setFriendSent(payload.friendshipSent);
    setFriends(payload.friends);
  });

  return <>{children};</>;
}
