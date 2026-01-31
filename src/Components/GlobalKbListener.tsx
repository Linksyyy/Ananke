import { useEffect } from 'react';
import { useCards } from '../store/cardsStore';

export default function GlobalKbListener() {
  const { selectedCard, unsetSelectedCard, setSelectedCard } = useCards();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^[1-9]$/.test(e.key)) {
        const targetIndex = Number(e.key) - 1;

        if (selectedCard !== null) {
          unsetSelectedCard();
          setTimeout(() => setSelectedCard(targetIndex), 200);
        } else {
          setTimeout(() => setSelectedCard(targetIndex), 50);
        }
      }

      if(e.key.toLowerCase() === 'x') {
        unsetSelectedCard()
      }
    };


    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCard, setSelectedCard, unsetSelectedCard]);

  return null;
}
