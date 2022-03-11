import { ethers } from "hardhat";

async function main() {
  const TrailToken = await ethers.getContractFactory("TrailToken");
  const trailToken = await TrailToken.deploy("Trail DAO", "TRAIL");
  await trailToken.deployed();

  console.log("TrailToken", trailToken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
