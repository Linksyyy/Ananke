/*
 *const [friendRequest, setFriendRequest] = useState<user[]>([]);
 *const [friendSent, setFriendSent] = useState<user[]>([]);
 *const [friends, setFriends] = useState<user[]>([]);
 */

import { create } from "zustand";
import { user } from "@/sockets-server";

export interface friendship {
  id: string;
  status: "pending" | "accepted";
  user: user;
  created_at: Date;
  sender_id: string;
}

interface tFriendsStore {
  friendships: friendship[];
  setFriendships: (f: friendship[]) => void;
}

const useFriends = create<tFriendsStore>((set) => ({
  friendships: [],
  setFriendships: (f) => set({ friendships: f }),
}));

export { useFriends };
