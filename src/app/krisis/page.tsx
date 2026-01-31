import Board from "@/src/Components/Board";
import Deck from "@/src/Components/Deck";
import ExtendedCard from "@/src/Components/ExtendedCard";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col px-16">
      <div className="flex justify-center min-h-screen">
        <div className="flex justify-center w-full mb-10">
          <Board />
        </div>
        <div className="absolute right-5 flex justify-center items-center w-100 h-2/3 m-20 bg-neutral-900 mx-10 rounded-4xl">
          <div className="relative bg-neutral-950 flex w-9/10 h-15/16 mx-1 rounded-3xl justify-center items-center">
            <h1 className="italic text-gray-400 text-sm">
              Click in one card to see description here
            </h1>
            <ExtendedCard />
          </div>
        </div>
        <Deck />
      </div>
    </main>
  );
}