"use client";
import cards from "@/server/data/cards";
import { useCards } from "@/store/cardsStore";
import GlobalKbListener from "@/Components/GlobalKbListener";
import { useEffect } from "react";
import Board from "@/Components/Board";
import ExtendedCard from "@/Components/ExtendedCard";
import Deck from "@/Components/Deck";

export default function Page() {
  const { setCards } = useCards();

  useEffect(() => {
    setCards(cards);
  }, [cards, setCards]);

  return (
    <main className="flex min-h-screen w-full flex-col px-16">
      <GlobalKbListener />
      <div className="flex justify-center min-h-screen">
        <div className="flex justify-center w-full mb-10">
          <Board />
        </div>
        <ExtendedCard />
        <Deck />
      </div>
    </main>
  );
}
