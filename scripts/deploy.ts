import { ethers } from "hardhat";

async function main() {
  const TrailToken = await ethers.getContractFactory("TrailToken");
  const trailToken = await TrailToken.deploy("Trail DAO", "TRAIL");
  await trailToken.deployed();

  const TrailDAONFT = await ethers.getContractFactory("TrailDAONFT");
  const trailDAONFT = await TrailDAONFT.deploy("TRAIL DAO NFT", "TRAILNFT");
  await trailDAONFT.deployed();

  const TrailFactory = await ethers.getContractFactory("TrailFactory");
  const trailFactory = await TrailFactory.deploy(
    trailToken.address,
    trailDAONFT.address
  );

  await trailFactory.deployed();

  console.log("TrailFactory", trailFactory.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
