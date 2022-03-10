import { ethers } from "hardhat";

async function main() {
  const TrailDAONFT = await ethers.getContractFactory("TrailDAONFT");
  const trailDAONFT = await TrailDAONFT.deploy("TRAIL DAO NFT", "TRAILNFT");
  await trailDAONFT.deployed();

  console.log("Trail DAO NFT", trailDAONFT.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
