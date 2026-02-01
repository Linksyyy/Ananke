import KrisisPageClient from "./KrisisPageClient";

async function getCards() {
  const res = await fetch("/api/cards", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.cards;
}

export default async function KrisisPage() {
  const cards = await getCards();

  return <KrisisPageClient cards={cards} />;
}