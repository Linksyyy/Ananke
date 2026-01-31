import { create } from "zustand";

interface tCardsStore {
  cards: Card[];
  selectedCard: Card | null;
  setCards: (arrCards: Card[]) => void;
  setSelectedCard: (cardIndex: number) => void;
  unsetSelectedCard: () => void;
}

const useCards = create<tCardsStore>(
  (set) =>
    ({
      cards: [],
      selectedCard: null,

      setCards: (arrCards: Card[]) => set({ cards: arrCards }),

      setSelectedCard: (cardIndex: number) => {
        set((state) => {
          const card = state.cards[cardIndex];

          if (state.selectedCard) {
            const newCards = [...state.cards, state.selectedCard];
            return {
              cards: newCards.filter((_, i) => i !== cardIndex),
              selectedCard: card,
            };
          }

          return {
            cards: state.cards.filter((_, i) => i !== cardIndex),
            selectedCard: card,
          };
        });
      },

      unsetSelectedCard: () => {
        set((state) => {
          if (state.selectedCard) {
            return {
              cards: [...state.cards, state.selectedCard],
              selectedCard: null,
            };
          }
          return {};
        });
      },
    }) as tCardsStore,
);

export { useCards };
