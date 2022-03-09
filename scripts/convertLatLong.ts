import { BigNumber } from "ethers";

const main = async () => {
  // const maxLatitude = 36.567251 + 90;
  const maxLatitude = BigNumber.from(36567251).add(90000000);
  const minLatitude = BigNumber.from(36550459).add(90000000);
  const maxLongitude = BigNumber.from(-105408364).add(180000000);
  const minLongitude = BigNumber.from(-105434580).add(180000000);

  const latitude = BigNumber.from(36560418).add(90000000);
  const longitude = BigNumber.from(-105419813).add(180000000);

  console.log("latitude", latitude.toString());
  console.log("longitude", longitude.toString());

  console.log("maxLatitude", maxLatitude.toString());
  console.log("maxLongitude", maxLongitude.toString());
  console.log("minLatitude", minLatitude.toString());
  console.log("minLongitude", minLongitude.toString());
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
