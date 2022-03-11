import { ethers } from "hardhat";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const TrailFactory = await ethers.getContractFactory("TrailFactory");
  const trailFactory = await TrailFactory.deploy(
    process.env.TRAIL_TOKEN_ADDRESS || "",
    process.env.TRAIL_NFT_ADDRESS || ""
  );

  await trailFactory.deployed();

  console.log("TrailFactory", trailFactory.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
