import { ethers } from "hardhat";

async function main() {
  const TrailMixNFT = await ethers.getContractFactory("TrailMixNFT");
  const trailMixNFT = await TrailMixNFT.deploy("TrailMix NFT", "TRAILNFT");
  await trailMixNFT.deployed();

  console.log("TrailMix NFT", trailMixNFT.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
