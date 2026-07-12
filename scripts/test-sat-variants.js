#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const projectRoot = path.resolve(__dirname, "..");
const context = { console };
context.globalThis = context;

vm.runInNewContext(
  fs.readFileSync(path.join(projectRoot, "data/sat-variant-generators.js"), "utf8"),
  context
);

const appSource = fs.readFileSync(path.join(projectRoot, "app.js"), "utf8");
const baseCardSource = appSource.slice(0, appSource.indexOf("function getGeometryCards"));
vm.runInNewContext(`${baseCardSource}; this.baseCards = baseCards;`, context);

const eligibleCards = context.baseCards.filter(
  (card) => card.subject === "Math" && card.type === "problem" && ["SAT", "Both"].includes(card.exam)
);
const generatorIds = new Set(context.SatVariantGenerator.ids);
const eligibleIds = new Set(eligibleCards.map((card) => card.id));

const missingGenerators = [...eligibleIds].filter((id) => !generatorIds.has(id));
const extraGenerators = [...generatorIds].filter((id) => !eligibleIds.has(id));

if (missingGenerators.length || extraGenerators.length) {
  if (missingGenerators.length) console.error(`Missing generators: ${missingGenerators.join(", ")}`);
  if (extraGenerators.length) console.error(`Unexpected generators: ${extraGenerators.join(", ")}`);
  process.exit(1);
}

const magnitudeLimits = {
  "m-2": 120,
  "m-3": 260,
  "m-6": 70,
  "m-8": 200,
  "m-9": 50,
  "m-10": 200,
  "m-13": 120,
  "m-14": 40,
  "m-15": 30,
  "m-16": 160,
  "m-17": 60,
  "m-18": 100,
  "m-19": 30,
  "m-20": 70,
  "m-32": 900,
  "m-34": 200,
  "m-35": 100000,
  "m-37": 1000,
  "m-38": 2000,
};

for (const card of eligibleCards) {
  const fronts = new Set();

  for (let attempt = 0; attempt < 200; attempt += 1) {
    const variant = context.SatVariantGenerator.generate(card);
    fronts.add(variant.front);

    if (variant.id !== card.id || !variant.front || !variant.back || !variant.isGeneratedVariant) {
      throw new Error(`Malformed variant for ${card.id}`);
    }
    if (/NaN|undefined|Infinity/.test(`${variant.front} ${variant.back}`)) {
      throw new Error(`Invalid numeric output for ${card.id}`);
    }
    if (!variant.variantIntegers.every(Number.isInteger)) {
      throw new Error(`Non-integer randomized operand for ${card.id}`);
    }
    if (variant.variantIntegers.some((value) => Math.abs(value) > magnitudeLimits[card.id])) {
      throw new Error(`Out-of-range randomized operand for ${card.id}`);
    }
  }

  if (fronts.size < 2) throw new Error(`Generator did not vary ${card.id}`);
  console.log(`OK ${card.id}: ${fronts.size} distinct forms in 200 generations`);
}

console.log(`\nValidated ${eligibleCards.length} parametric SAT Math problem templates.`);
