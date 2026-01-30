type CardColor = string

type CardPrinciple =
  | "potential"
  | "rupture"
  | "negation"
  | "erosion"
  | "structure";

type BoardZone =
  | "center"
  | "innerRing"
  | "outerRing"
  | "edge";

type CostType =
  | "structural"
  | "temporal"
  | "positional";

type EffectType =
  | "spatial"
  | "influence"
  | "rule"
  | "fracture";

interface EffectContext {
  board: unknown;
  sourceHex: unknown;
  targetHex: unknown;
  turn: number;
}

interface CardEffect {
  type: EffectType;
  execute(context: EffectContext): void;
}

interface CardEcho {
  delay: number; // turns
  trigger(context: EffectContext): void;
}

interface CardDomain {
  preferredZones: BoardZone[];
  amplification: number;
}

interface CardCost {
  type: CostType;
  value: number;
}

interface CardConstraints {
  unique: boolean;
  irreversible: boolean;
  stackable: boolean;
}

interface Card {
  id: string;
  name: string;

  color: CardColor;
  principle: CardPrinciple;

  domain: CardDomain;
  cost: CardCost;

  effect: CardEffect;
  echo?: CardEcho;

  constraints: CardConstraints;
}
