import { create } from "zustand";

interface UserPayload {
  id: string;
  username: string;
  email: string;
}

interface tUserStore {
  user: UserPayload | undefined;
  setUser: (user: UserPayload) => void;
}

const useUser = create<tUserStore>((set) => ({
  user: undefined,
  setUser: (user) => {
    set({ user });
  },
}));

export { useUser };
