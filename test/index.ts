import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import { deployMockContract } from "@ethereum-waffle/mock-contract";

const Verifier = require("../artifacts/contracts/Verifier.sol/Verifier.json");
const Token = require("../artifacts/contracts/TrailToken.sol/TrailToken.json");
const NFT = require("../artifacts/contracts/TrailDAONFT.sol/TrailDAONFT.json");

const ninetyDegrees = BigNumber.from(90000000);
const oneEightyDegrees = BigNumber.from(180000000);

describe("TrailFactory", function () {
  it("should deploy successfully", async function () {
    const mockToken = await deployMockContract(
      ethers.provider.getSigner(),
      Token.abi
    );

    const mockNFT = await deployMockContract(
      ethers.provider.getSigner(),
      NFT.abi
    );

    const TrailFactory = await ethers.getContractFactory("TrailFactory");
    const trailFactory = await TrailFactory.deploy(
      mockToken.address,
      mockNFT.address
    );
    await trailFactory.deployed();
  });

  it("should create a new trail contract", async function () {
    const mockToken = await deployMockContract(
      ethers.provider.getSigner(),
      Token.abi
    );

    const mockNFT = await deployMockContract(
      ethers.provider.getSigner(),
      NFT.abi
    );

    const TrailFactory = await ethers.getContractFactory("TrailFactory");
    const trailFactory = await TrailFactory.deploy(
      mockToken.address,
      mockNFT.address
    );
    await trailFactory.deployed();

    const mockVerifier = await deployMockContract(
      ethers.provider.getSigner(),
      Verifier.abi
    );

    const name = "Wheeler Peak Trail";
    const imageUrl =
      "https://bafkreifd2oy6dzpwqf7u5rsn5lesm6wkcnn7d524a5hq22gjksewlhlwqa.ipfs.nftstorage.link/";

    const maxLatitude = BigNumber.from(36567251).add(ninetyDegrees);
    const minLatitude = BigNumber.from(36550459).add(ninetyDegrees);
    const maxLongitude = BigNumber.from(-105408364).add(oneEightyDegrees);
    const minLongitude = BigNumber.from(-105434580).add(oneEightyDegrees);

    const boundingBox = {
      maxLatitude,
      maxLongitude,
      minLatitude,
      minLongitude,
    };

    const startLatitude = BigNumber.from(358192).add(ninetyDegrees);
    const startLongitude = BigNumber.from(-105257600).add(oneEightyDegrees);
    const endLatitude = BigNumber.from(365964).add(ninetyDegrees);
    const endLongitude = BigNumber.from(-105264469).add(oneEightyDegrees);

    const trailPath = {
      startLatitude,
      startLongitude,
      endLatitude,
      endLongitude,
    };

    await expect(
      trailFactory.createTrail(
        mockVerifier.address,
        name,
        imageUrl,
        boundingBox,
        trailPath
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

describe("Verifier", function () {
  it("should deploy successfully", async function () {
    const Verifier = await ethers.getContractFactory("Verifier");
    const verifier = await Verifier.deploy();
    await verifier.deployed();
  });
});
