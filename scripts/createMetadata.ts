import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import { createCanvas, loadImage } from "canvas";

const hatLayers = new Map<string, string>();
hatLayers.set("Sahara Sun Hat", "red-hat.png");
hatLayers.set("Explorer Cap", "blue-hat.png");
hatLayers.set("Outback Hat", "black-hat.png");
hatLayers.set("Summit Hat", "yellow-hat.png");
hatLayers.set("Trucker Hat", "tan-hat.png");
hatLayers.set("Booney Hat", "brown-hat.png");
hatLayers.set("Running Cap", "green-hat.png");

const shirtLayers = new Map<string, string>();
shirtLayers.set("Cool Hoodie", "aqua-shirt.png");
shirtLayers.set("Brand Logo T", "orange-shirt.png");
shirtLayers.set("Tech Polo Shirt", "gray-shirt.png");
shirtLayers.set("Forest Graphic T", "green-shirt.png");
shirtLayers.set("Fly Fishing Button Down", "pink-shirt.png");
shirtLayers.set("Smokey Shirt", "light-blue-shirt.png");
shirtLayers.set("Backpacker Plaid", "dark-red-shirt.png");

const bootLayers = new Map<string, string>();
bootLayers.set("Waterproof Hiking Boots", "dark-brown-boot.png");
bootLayers.set("Mountaineering Boots", "ice-blue-boot.png");
bootLayers.set("Recycled Hiking Boots", "dark-green-boot.png");
bootLayers.set("Trail Running Shoes", "light-tan-boot.png");
bootLayers.set("Multisport Sandals", "dark-grey-boot.png");
bootLayers.set("Snow Shoes", "white-boot.png");
bootLayers.set("Vegan Hiking Boots", "light-grey-boot.png");

const pantLayers = new Map<string, string>();
pantLayers.set("Savanna Trails Pants", "khaki-pants.png");
pantLayers.set("Crescent Lake Pants", "dark-blue-pants.png");
pantLayers.set("Amphibian Shorts", "light-green-pants.png");
pantLayers.set("Tech Trail Shorts", "light-grey-pants.png");
pantLayers.set("Ether Bike Shorts", "purple-pants.png");
pantLayers.set("Costa Rica Baggies", "light-pink-pants.png");
pantLayers.set("Mountain Face Pants", "kiwi-pants.png");

const main = async () => {
  const randomSelection = JSON.parse(
    readFileSync("randomSelection.json").toString()
  );

  const hats: string[] = randomSelection.hats;
  const shirts: string[] = randomSelection.shirts;
  const sticks: string[] = randomSelection.sticks;
  const boots: string[] = randomSelection.boots;
  const pants: string[] = randomSelection.pants;

  for (let i = 0; i < hats.length; i++) {
    const hat = hats[i];
    const shirt = shirts[i];
    const pant = pants[i];
    const boot = boots[i];
    const stick = sticks[i];

    const canvas = createCanvas(350, 350);
    const ctx = canvas.getContext("2d");
    const image = await loadImage("base.png");
    ctx.drawImage(image, 0, 0, 320, 320);

    const layers = [];
    layers.push(
      await loadImage(path.join("layers", "hats", hatLayers.get(hat)!))
    );
    layers.push(
      await loadImage(path.join("layers", "shirts", shirtLayers.get(shirt)!))
    );
    layers.push(
      await loadImage(path.join("layers", "pants", pantLayers.get(pant)!))
    );
    layers.push(
      await loadImage(path.join("layers", "boots", bootLayers.get(boot)!))
    );

    for (let k = 0; k < layers.length; k++) {
      ctx.drawImage(layers[k], 0, 0, 320, 320);
    }

    const dataUrl = canvas.toDataURL("image/png");
    console.log('<html><img src="' + dataUrl + '" /></html>');

    const metadata = {
      name: "Season 1 TrailMix Hiker",
      description: "Your hiker adventurer that walks the wonderful trails.",
      image: dataUrl,
      background_color: "ffffff",
      attributes: [
        {
          trait_type: "Hat",
          value: `${hat}`,
        },
        {
          trait_type: "Shirt",
          value: `${shirt}`,
        },
        {
          trait_type: "Pants",
          value: `${pant}`,
        },
        {
          trait_type: "Boots",
          value: `${boot}`,
        },
        {
          trait_type: "Trekking Poles",
          value: `${stick}`,
        },
      ],
    };

    if (!existsSync("metadataDir")) {
      mkdirSync("metadataDir");
    }

    writeFileSync(
      path.join("metadataDir", `${i + 1}`),
      JSON.stringify(metadata)
    );
  }
};

main().catch((err) => {
  console.log(err);
  process.exitCode = 1;
});
