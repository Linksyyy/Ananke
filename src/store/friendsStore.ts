/*
 *const [friendRequest, setFriendRequest] = useState<user[]>([]);
 *const [friendSent, setFriendSent] = useState<user[]>([]);
 *const [friends, setFriends] = useState<user[]>([]);
 */

import { create } from "zustand";
import { user } from "@/sockets-server";

interface tFriendsStore {
  friends: user[];
  friendSent: user[];
  friendRequest: user[];
  setFriends: (f: user[]) => void;
  setFriendSent: (f: user[]) => void;
  setFriendRequest: (f: user[]) => void;
}

const useFriends = create<tFriendsStore>((set) => ({
  friends: [],
  friendSent: [],
  friendRequest: [],
  setFriends: (f) => set({ friends: f }),
  setFriendSent: (f) => set({ friendRequest: f }),
  setFriendRequest: (f) => set({ friendRequest: f }),
}));

export { useFriends };
