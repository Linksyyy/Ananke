const cards: Card[] = [
  {
    id: "paradox-incarnate",
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
    id: "veiled-hypercube",
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
    id: "axis-of-negation",
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
    id: "erosive-continuum",
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
];

export default cards;
