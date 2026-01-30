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
        set((state) => {
          const card = state.cards.filter((p) => cardId === p.id)[0]
          return {
            cards: state.cards.filter((p) => cardId !== p.id),
            selectedCard: card,
          };
        });
      },

      unsetSelectedCard: () => {
        set((state) => {
          if (state.selectedCard) {
            return {
              cards: [...state.cards, state.selectedCard],
            };
          }
          return {};
        });
        set((state) => {
          if (state.selectedCard) {
            return { selectedCard: null };
          }
          return {};
        });
      },
    }) as tCardsStore,
);

export { useCards };
