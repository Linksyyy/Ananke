import { create } from "zustand";

interface tCardsStore {
  cards: Card[];
  setCards: (arrCards: Card[]) => void;
}

const useCards = create<tCardsStore>(
  (set) =>
    ({
      cards: [],
      setCards: (arrCards: Card[]) => set({ cards: arrCards }),
    }) as tCardsStore,
);

export { useCards };
