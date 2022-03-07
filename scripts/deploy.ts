import { ethers } from "hardhat";

async function main() {
  const TrailToken = await ethers.getContractFactory("TrailToken");
  const trailToken = await TrailToken.deploy("Trail DAO", "TRAIL");

  await trailToken.deployed();

  console.log("TrailToken", trailToken.address);

  const TrailFactory = await ethers.getContractFactory("TrailFactory");
  const trailFactory = await TrailFactory.deploy();

  await trailFactory.deployed();

  console.log("TrailFactory", trailFactory.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
