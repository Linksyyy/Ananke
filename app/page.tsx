import Board from "@/Components/Board";
import Cards from "@/Components/Cards";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col px-16">
        <div className="flex justify-center min-h-screen">
          <Board />
          <Cards /> 
        </div>
      </main>
    </div>
  );
}
