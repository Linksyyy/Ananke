"use client";
import cards from "@/server/data/cards";
import { useCards } from "@/store/cardsStore";
import GlobalKbListener from "@/Components/GlobalKbListener";
import { useEffect, useState } from "react";
import Board from "@/Components/Board";
import ExtendedCard from "@/Components/ExtendedCard";
import Deck from "@/Components/Deck";
import SessionSummoner from "@/Components/SessionSummoner";
import { useUser } from "@/store/userStore";
import { RiMenuUnfold2Line, RiMenuUnfoldLine } from "react-icons/ri";

export default function Page() {
  const [hide, setHide] = useState(true);
  const { setCards } = useCards();
  const { user, setUser } = useUser();

  useEffect(() => {
    const userCache = localStorage.getItem("user-cache")!;
    setUser(JSON.parse(userCache));
  }, []);

  useEffect(() => {
    setCards(cards);
  }, [cards, setCards]);

  return (
    <main className="flex min-h-screen w-full flex-col px-16">
      <GlobalKbListener />
      <div className="flex justify-center min-h-screen">
        <SessionSummoner hide={hide} />
        <div className="flex justify-center w-full mb-10">
          <Board />
        </div>
        <ExtendedCard />
        <button
          className="absolute left-10 top-8 bg-neutral-800 p-4 rounded-4xl border border-neutral-700 cursor-pointer hover:bg-neutral-900"
          onClick={() => {
            hide ? setHide(false) : setHide(true);
          }}
        >
          {hide ? <RiMenuUnfold2Line /> : <RiMenuUnfoldLine />}
        </button>
        <Deck />
      </div>
    </main>
  );
}
