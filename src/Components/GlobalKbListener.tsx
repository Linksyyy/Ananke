import { useEffect } from "react";
import { useCards } from "../store/cardsStore";

export default function GlobalKbListener() {
  const { selectedCard, unsetSelectedCard, setSelectedCard } = useCards();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^[1-9]$/.test(e.key)) {
        const targetIndex = Number(e.key) - 1;
        setSelectedCard(targetIndex);
      }

      if (e.key.toLowerCase() === "x") {
        unsetSelectedCard();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCard, setSelectedCard, unsetSelectedCard]);

  return null;
}
