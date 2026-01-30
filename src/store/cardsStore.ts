import { create } from "zustand";

interface tCardsStore {
  cards: Card[];
  selectedCard: Card | null;
  setCards: (arrCards: Card[]) => void;
  setSelectedCard: (cardId: string) => void;
  unsetSelectedCard: () => void;
}

const useCards = create<tCardsStore>(
  (set) =>
    ({
      cards: [],
      selectedCard: null,
      setCards: (arrCards: Card[]) => set({ cards: arrCards }),
      setSelectedCard: (cardId: string) => {
        setTimeout(
          () =>
            set((state) => ({
              selectedCard: state.cards.filter((p) => cardId === p.id)[0],
            })),
          100,
        );
        setTimeout(
          () =>
            set((state) => ({
              cards: state.cards.filter((p) => cardId !== p.id),
            })),
          300,
        );
      },
      unsetSelectedCard: () => {
        set((state) => ({ cards: [...state.cards, state.selectedCard] }));
        set({ selectedCard: null });
      },
    }) as tCardsStore,
);

export { useCards };
