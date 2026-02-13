"use client";

import { useSocket } from "@/lib/socket";
import { friendship } from "@/sockets-server";
import { useFriends } from "@/store/friendsStore";
import { useUser } from "@/store/userStore";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { setFriendships } = useFriends();
  const { setUser } = useUser();

  useEffect(() => {
    const userCache = localStorage.getItem("user-cache")!;
    setUser(JSON.parse(userCache));
  }, [setUser]);

  useSocket("init", (payload: friendship[]) => {
    setFriendships(payload);
  });

  return <>{children};</>;
}
