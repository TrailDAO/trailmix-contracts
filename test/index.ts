import { expect } from "chai";
import { ethers } from "hardhat";
import { deployMockContract } from "@ethereum-waffle/mock-contract";

const Verifier = require("../artifacts/contracts/Verifier.sol/Verifier.json");

describe("TrailFactory", function () {
  it("should deploy successfully", async function () {
    const TrailFactory = await ethers.getContractFactory("TrailFactory");
    const trailFactory = await TrailFactory.deploy();
    await trailFactory.deployed();
  });

  it("should create a new trail contract", async function () {
    const TrailFactory = await ethers.getContractFactory("TrailFactory");
    const trailFactory = await TrailFactory.deploy();
    await trailFactory.deployed();

    const mockVerifier = await deployMockContract(
      ethers.provider.getSigner(),
      Verifier.abi
    );

    const name = "Wheeler Peak Trail";
    const imageUrl =
      "https://bafkreifd2oy6dzpwqf7u5rsn5lesm6wkcnn7d524a5hq22gjksewlhlwqa.ipfs.nftstorage.link/";

    await expect(
      trailFactory.createTrail(mockVerifier.address, name, imageUrl)
    ).to.emit(trailFactory, "TrailCreated");
  });
});

describe("TrailToken", function () {
  it("should deploy successfully", async function () {
    const TrailToken = await ethers.getContractFactory("TrailToken");
    const trailToken = await TrailToken.deploy("Trail DAO", "TRAIL");
    await trailToken.deployed();
  });
});
