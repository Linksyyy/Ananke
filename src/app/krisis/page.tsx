"use client";

import Board from "@/src/Components/Board";
import Deck from "@/src/Components/Deck";
import ExtendedCard from "@/src/Components/ExtendedCard";
import GlobalKbListener from "@/src/Components/GlobalKbListener";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col px-16">
      <GlobalKbListener />
      <div className="flex justify-center min-h-screen">
        <div className="flex justify-center w-full mb-10">
          <Board />
        </div>
        <div className="absolute right-5 flex justify-center items-center w-96 h-2/3 my-20 bg-neutral-900 mx-10 rounded-4xl shadow-2xl">
          <div className="relative bg-neutral-950 flex flex-col w-[92%] h-[95%] rounded-3xl justify-center items-center p-6 text-center border border-white/5">
            <h1 className="text-gray-200 text-sm font-medium mb-1">
              Select a card to view details
            </h1>

            <h2 className="text-gray-500 text-[11px] font-mono tracking-tight uppercase flex items-center gap-1">
              Press <span className="text-gray-300 font-bold">[0-9]</span> to
              pick •<span className="text-gray-300 font-bold"> [X]</span> to
              deselect
            </h2>
            <div className="mt-8 w-full">
              <ExtendedCard />
            </div>
          </div>
        </div>
        <Deck />
      </div>
    </main>
  );
}
