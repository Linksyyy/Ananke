import { getApiUrl } from "./utils";

export async function getCards() {
  const { cards } = await fetch(getApiUrl("/api/cards")).then((res) =>
    res.json(),
  );
  return cards;
}
