import KrisisPageClient from "./KrisisPageClient";
import { getApiUrl } from "@/lib/utils";

export default async function KrisisPage() {
  const { cards } = await fetch(getApiUrl("/api/cards")).then((res) =>
    res.json()
  );

  return <KrisisPageClient cards={cards} />;
}
