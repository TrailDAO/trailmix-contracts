import { ethers } from "hardhat";
import dotenv from "dotenv";

dotenv.config();

const trails = [
  {
    name: "Sutton Wilderness Trail",
    imageUrl:
      "ipfs://bafkreihkt243rd3wpykvn6x6wiqclyua3ivoscn4sq3ggvzenrqy3nonpq",
    verifier: "0xB473eE640CaE588A3D35ba32FcBd24fe6B49FE3B",
    boundingBox: {
      maxLatitude: 125223128, // 35.223128
      maxLongitude: 82546739, // -97.453261
      minLatitude: 125220692, // 35.220692
      minLongitude: 82456878, // -97.456878
    },
    trailPath: {
      startLatitude: 125221964,
      startLongitude: 8254493,
      endLatitude: 125222630,
      endLongitude: 82454212,
    },
  },
  {
    name: "Clear Bay Trail",
    imageUrl:
      "ipfs://bafkreihw4ymbsc5iic5p327xicjba3zbv6iowycxeus7aerzexfbseqhsu",
    verifier: "0xC118399933F31fc0Fb2e246A1FE449B97181c59F",
    boundingBox: {
      maxLatitude: 125220808, // 35.220808,
      maxLongitude: 82538844, // -97.461156
      minLatitude: 125219642, // 35.219642
      minLongitude: 82536473, // -97.463527
    },
    trailPath: {
      startLatitude: 125224343,
      startLongitude: 83461687,
      endLatitude: 125224325,
      endLongitude: 83460528,
    },
  },
];

async function main() {
  if (!process.env.TRAIL_FACTORY_ADDRESS) {
    throw Error("Need trail factory address");
  }

  const TrailFactory = await ethers.getContractFactory("TrailFactory");
  const trailFactory = TrailFactory.attach(process.env.TRAIL_FACTORY_ADDRESS);

  for (let i = 0; i < trails.length; i++) {
    const trail = trails[i];
    console.log("Creating trail", trail.name);
    const tx = await trailFactory.createTrail(
      trail.verifier,
      trail.name,
      trail.imageUrl,
      trail.boundingBox,
      trail.trailPath
    );
    await tx.wait();
    console.log("Done");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
