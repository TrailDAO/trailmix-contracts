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

    const maxLatitude = 36.567251 + 90;
    const minLatitude = 36.550459 + 90;
    const maxLongitude = -105.408364 + 180;
    const minLongitude = -105.43458 + 180;

    const name = "Wheeler Peak Trail";
    const imageUrl =
      "https://bafkreifd2oy6dzpwqf7u5rsn5lesm6wkcnn7d524a5hq22gjksewlhlwqa.ipfs.nftstorage.link/";

    await expect(
      trailFactory.createTrail(
        mockVerifier.address,
        ethers.utils.parseUnits(maxLatitude.toString()),
        ethers.utils.parseUnits(minLatitude.toString()),
        ethers.utils.parseUnits(maxLongitude.toString()),
        ethers.utils.parseUnits(minLongitude.toString()),
        name,
        imageUrl
      )
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
