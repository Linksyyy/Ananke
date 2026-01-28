import Board from "@/Components/Board";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col px-16">
        <div className="flex justify-center items-center min-h-screen">
          <Board />
        </div>
      </main>
    </div>
  );
}
