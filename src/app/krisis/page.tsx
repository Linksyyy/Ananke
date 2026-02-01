import { getCards } from "@/lib/api";
import KrisisPageClient from "./KrisisPageClient";

export default async function KrisisPage() {
  const cards = await getCards();

  return <KrisisPageClient cards={cards} />;
}
