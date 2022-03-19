import { ethers } from "hardhat";
import dotenv from "dotenv";

dotenv.config();

const verifiers = ["ClearBayTrail", "SuttonWildernessTrail"];

async function main() {
  for (let i = 0; i < verifiers.length; i++) {
    const verifierFactory = await ethers.getContractFactory(verifiers[i]);
    const verifier = await verifierFactory.deploy();

    await verifier.deployed();

    console.log("Verifier deployed %s, %s ", verifiers[i], verifier.address);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
