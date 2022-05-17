import { readFileSync } from "fs";
import { createCanvas, loadImage } from "canvas";

const main = async () => {
  const randomSelection = JSON.parse(
    readFileSync("randomSelection.json").toString()
  );

  const hats = randomSelection.hats;
  const shirts = randomSelection.shirts;
  const sticks = randomSelection.sticks;
  const boots = randomSelection.boots;
  const pants = randomSelection.pants;

  for (let i = 0; i < hats.length; i++) {
    const hat = hats[i];
    const shirt = shirts[i];
    const pant = pants[i];
    const boot = boots[i];
    const stick = sticks[i];

    const metadata = {
      name: "Season 1 TrailMix Hiker",
      description: "Your hiker adventurer that walks the wonderful trails.",
      image:
        "https://storage.googleapis.com/opensea-prod.appspot.com/creature/50.png",
      background_color: "white",
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
          trail_type: "Boots",
          value: `${boot}`,
        },
        {
          trail_type: "Trekking Poles",
          value: `${stick}`,
        },
      ],
    };

    if (i % 10 === 0) console.log("Iterating");

    const canvas = createCanvas(32, 32);
    const ctx = canvas.getContext("2d");
    const image = await loadImage("baseCharacter.png");
    ctx.drawImage(image, 0, 0, 32, 32);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // what areas need to be recolored

    const data = imageData.data;
    console.log(data);
    // change pixels here
    // for hat, what values do you need, light red, dark red
    // value of trait is index into two arrays (rgb) for color and then pixel locations are set in another array
    for (let j = 0; j < data.length; j = j + 4) {
      const red = data[j];
      // const blue = data[i + 1];
      // const green = data[i + 2];

      if (red !== 0) {
        console.log("Found red at", j);
      }
    }

    ctx.putImageData(imageData, 0, 0);

    console.log(
      '<html><img src="' + canvas.toDataURL("image/png") + '" /></html>'
    );

    // finalize metadata, write metadata and image to tmpdir
    // TODO: might scale up canvas to 320x320 image processing, needs to be 350 x 350
  }
};

main().catch((err) => {
  console.log(err);
  process.exitCode = 1;
});
