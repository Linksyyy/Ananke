"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-neutral-200">
      {/* Background aura */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-1/3 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-purple-900/30 blur-[180px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-red-900/20 blur-[200px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_60%)]" />
      </div>

      {/* Grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay bg-[url('/noise.png')]" />

      {/* Content */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-4 text-5xl font-semibold tracking-wide text-neutral-100 md:text-7xl">
          Ἀνάγκη
        </h1>

        <p className="mb-10 max-w-xl text-sm leading-relaxed text-neutral-400 md:text-base">
          A tactical board game about pressure, positioning,  
          and the cost of occupying space.
        </p>

        <div className="mb-10 h-px w-48 bg-linear-to-r from-transparent via-purple-700/60 to-transparent" />

        <div className="flex gap-6">
          <Link
            href="/krisis"
            className="group relative overflow-hidden rounded-lg border border-purple-800/60 px-8 py-3 text-sm font-medium tracking-wide text-purple-200 transition-all hover:border-purple-500"
          >
            <span className="relative z-10">Enter Conflict</span>
            <span className="absolute inset-0 -translate-x-full bg-purple-800/20 transition-transform duration-500 group-hover:translate-x-0" />
          </Link>

          <button
            className="rounded-lg border border-neutral-700/60 px-8 py-3 text-sm tracking-wide text-neutral-400 transition hover:border-neutral-500 hover:text-neutral-200"
          >
            Observe
          </button>
        </div>
      </section>

      <footer className="absolute bottom-4 w-full text-center text-[10px] tracking-widest text-neutral-600">
        inevitability • control • structure
      </footer>
    </main>
  );
}
