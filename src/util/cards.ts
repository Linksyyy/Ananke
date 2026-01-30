const cards: Card[] = [
  {
    id: "1",
    name: "Paradox Incarnate",

    color: "#8b1e3f",
    principle: "rupture",

    domain: {
      preferredZones: ["center", "innerRing"],
      amplification: 1.4,
    },

    cost: {
      type: "structural",
      value: 4,
    },

    effect: {
      type: "rule",
      execute() {},
    },

    echo: {
      delay: 2,
      trigger() {},
    },

    constraints: {
      unique: true,
      irreversible: true,
      stackable: false,
    },
  },

  {
    id: "2",
    name: "Veiled Hypercube",

    color: "#2e3a87",
    principle: "structure",

    domain: {
      preferredZones: ["outerRing"],
      amplification: 1.2,
    },

    cost: {
      type: "positional",
      value: 3,
    },

    effect: {
      type: "spatial",
      execute() {},
    },

    constraints: {
      unique: false,
      irreversible: false,
      stackable: false,
    },
  },

  {
    id: "3",
    name: "Axis of Negation",

    color: "#111111",
    principle: "negation",

    domain: {
      preferredZones: ["edge"],
      amplification: 1.6,
    },

    cost: {
      type: "temporal",
      value: 2,
    },

    effect: {
      type: "influence",
      execute() {},
    },

    constraints: {
      unique: false,
      irreversible: false,
      stackable: true,
    },
  },

  {
    id: "4",
    name: "Erosive Continuum",

    color: "#6b705c",
    principle: "erosion",

    domain: {
      preferredZones: ["innerRing", "outerRing"],
      amplification: 1.1,
    },

    cost: {
      type: "temporal",
      value: 1,
    },

    effect: {
      type: "rule",
      execute() {},
    },

    echo: {
      delay: 1,
      trigger() {},
    },

    constraints: {
      unique: false,
      irreversible: false,
      stackable: true,
    },
  },
  {
    id: "5",

    name: "Structured Presence",

    color: "#1e1e1e",

    principle: "structure",

    domain: {
      preferredZones: ["innerRing", "outerRing"],
      amplification: 1.2,
    },

    cost: {
      type: "structural",
      value: 1,
    },

    effect: {
      type: "spatial",
      execute() {},
    },

    echo: {
      delay: 1,
      trigger() {},
    },

    constraints: {
      unique: false,
      irreversible: false,
      stackable: true,
    },
  },
  {
    id: "6",

    name: "Fracture Witness",

    color: "#8a7a52",

    principle: "rupture",

    domain: {
      preferredZones: ["innerRing", "outerRing"],
      amplification: 1.15,
    },

    cost: {
      type: "temporal",
      value: 2,
    },

    effect: {
      type: "fracture",
      execute() {},
    },

    echo: {
      delay: 1,
      trigger() {},
    },

    constraints: {
      unique: true,
      irreversible: false,
      stackable: false,
    },
  },
];

export default cards;
