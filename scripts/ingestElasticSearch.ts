import { Client } from "@elastic/elasticsearch";
import { ethers } from "hardhat";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  cloud: {
    id: process.env.ES_CLOUD_ID || "",
  },
  auth: {
    username: process.env.ES_USERNAME || "",
    password: process.env.ES_PASSWORD || "",
  },
});

const getTrailFactory = async () => {
  console.log("TrailFactory address", process.env.TRAIL_FACTORY_ADDRESS);
  const trailFactory = await ethers.getContractAt(
    "TrailFactory",
    process.env.TRAIL_FACTORY_ADDRESS || ""
  );
  return trailFactory;
};

const getTrails = async () => {
  const trails = [];

  const trailFactory = await getTrailFactory();
  const filter = trailFactory.filters.TrailCreated();
  const logs = await trailFactory.queryFilter(filter);
  console.log("Logs found", logs.length);
  for (let i = 0; i < logs.length; i++) {
    const log = logs[i];
    const name = log.args.name;
    const verifier = log.args.verifier;
    const trailAddress = log.args.trailAddress;
    console.log(
      "Trail %s, verifier %s, address %s",
      name,
      verifier,
      trailAddress
    );

    trails.push(trailAddress);
  }

  return trails;
};

(async () => {
  const trails = await getTrails();
  const indexDocs = await Promise.all(
    trails.map(async (trail) => {
      const trailContract = await ethers.getContractAt("Trail", trail);
      const trailPath = await trailContract.trailPath();
      const lat = ethers.utils.formatUnits(trailPath.startLatitude.sub(90000));
      const lon = ethers.utils.formatUnits(
        trailPath.startLongitude.sub(180000)
      );

      const indexDoc = {
        index: "trails",
        id: trail,
        body: {
          coordinate: {
            lat,
            lon,
          },
        },
      };
      return indexDoc;
    })
  );

  console.log("Starting location ingest");

  const exists = await client.indices.exists({
    index: "trails",
  });

  if (exists) {
    console.log("Trails index exists...deleting");
    await client.indices.delete({
      index: "trails",
    });
  }

  console.log("Creating trails index");
  await client.indices.create({
    index: "trails",
    body: {
      mappings: {
        properties: {
          coordinate: {
            type: "geo_point",
          },
        },
      },
    },
  });

  console.log("Adding trails", indexDocs.length);
  for (let k = 0; k < indexDocs.length; k++) {
    await client.index(indexDocs[k]);
  }

  console.log("Refreshing");
  await client.indices.refresh({ index: "trails" });
  console.log("Done");
})();
