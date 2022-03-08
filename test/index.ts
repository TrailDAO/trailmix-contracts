import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";
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

    // const maxLatitude = 36.567251 + 90;
    const maxLatitude = BigNumber.from(36567251).add(90000000);
    const minLatitude = BigNumber.from(36550459).add(90000000);
    const maxLongitude = BigNumber.from(-105408364).add(180000000);
    const minLongitude = BigNumber.from(-105434580).add(180000000);

    const latitude = 36.560418;
    const longitude = -105.419813;

    console.log("maxLatitude", maxLatitude);
    console.log("maxLongitude", maxLongitude);
    console.log("minLatitude", minLatitude);
    console.log("minLongitude", minLongitude);

    const name = "Wheeler Peak Trail";
    const imageUrl =
      "https://bafkreifd2oy6dzpwqf7u5rsn5lesm6wkcnn7d524a5hq22gjksewlhlwqa.ipfs.nftstorage.link/";

    await expect(
      trailFactory.createTrail(
        mockVerifier.address,
        maxLatitude,
        minLatitude,
        maxLongitude,
        minLongitude,
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
