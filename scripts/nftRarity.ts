import { writeFileSync } from "fs";

const hats = [];
const shirts = [];
const sticks = [];
const boots = [];
const pants = [];

for (let i = 0; i < 14270; i++) {
  const randomIndex = Math.floor(Math.random() * 14270);
  if (randomIndex >= 0 && randomIndex < 1000) {
    hats.push("Sahara Sun Hat");
    shirts.push("Cool Hoodie");
    sticks.push("Twisted Oak");
    boots.push("Waterproof Hiking Boots");
    pants.push("Savanna Trails Pants");
  }

  if (randomIndex >= 1000 && randomIndex < 2270) {
    hats.push("Explorer Cap");
    shirts.push("Brand Logo T");
    sticks.push("Straight Pine");
    boots.push("Mountaineering Boots");
    pants.push("Crescent Lake Pants");
  }

  if (randomIndex >= 2270 && randomIndex < 4270) {
    hats.push("Outback Hat");
    shirts.push("Tech Polo Shirt");
    sticks.push("Carbon Trekking Poles");
    boots.push("Recycled Hiking Boots");
    pants.push("Amphibian Shorts");
  }

  if (randomIndex >= 4270 && randomIndex < 6270) {
    hats.push("Summit Hat");
    shirts.push("Forest Graphic T");
    sticks.push("Alpine Trekking Poles");
    boots.push("Vegan Hiking Boots");
    pants.push("Tech Trail Shorts");
  }

  if (randomIndex >= 6270 && randomIndex < 8270) {
    hats.push("Trucker Hat");
    shirts.push("Fly Fishing Button Down");
    sticks.push("Cork Trekking Poles");
    boots.push("Trail Running Shoes");
    pants.push("Ether Bike Shorts");
  }

  if (randomIndex >= 8270 && randomIndex < 11270) {
    hats.push("Booney Hat");
    shirts.push("Smokey Shirt");
    sticks.push("Ice Axe");
    boots.push("Multisport Sandals");
    pants.push("Mountain Face Pants");
  }

  if (randomIndex >= 11270 && randomIndex < 14270) {
    hats.push("Running Cap");
    shirts.push("Backpacker Plaid");
    sticks.push("Tree Branch");
    boots.push("Snow Shoes");
    pants.push("Costa Rica Baggies");
  }
}

console.log("Sampling");

let runningCaps = 0;
let coolHoodies = 0;
let straightPine = 0;
let veganBoots = 0;
let etherBikeShorts = 0;

for (let j = 0; j < 14270; j++) {
  if (hats[j] === "Running Cap") runningCaps = runningCaps + 1;
  if (shirts[j] === "Cool Hoodie") coolHoodies = coolHoodies + 1;
  if (sticks[j] === "Straight Pine") straightPine = straightPine + 1;
  if (boots[j] === "Vegan Hiking Boots") veganBoots = veganBoots + 1;
  if (pants[j] === "Ether Bike Shorts") etherBikeShorts = etherBikeShorts + 1;
}

console.log("Percentage of running caps", (runningCaps / 14270) * 100);
console.log("Percentage of hoodies", (coolHoodies / 14270) * 100);
console.log("Percentage of pine sticks", (straightPine / 14270) * 100);
console.log("Percentage of vegan boots", (veganBoots / 14270) * 100);
console.log("Percentage of ether bike shorts", (etherBikeShorts / 14270) * 100);

writeFileSync(
  "randomSelection.json",
  JSON.stringify({
    hats: hats,
    shirts: shirts,
    sticks: sticks,
    boots: boots,
    pants: pants,
  })
);
