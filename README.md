# TrailMix
TrailMix is the first regenerative cryptoeconomy for outdoor recreational activities and organizations that maintain natural resources. Hiking trails suffer from the free rider problem. The public use hiking trails and campsites and the trail reconstruction or maintenance organizations that assist government agencies are underfunded and rely on volunteers to do incredibly labor intensive work to keep these resources open.

Players:
1. Hikers
2. Trail Reconstruction organizations and their volunteers
3. Government agencies
4. Corporations that sponsor trail reconstruction

TrailMix will coordinate all four players and create a positive-sum economy for the players on the Polygon network using Zero-Knowledge proofs.

A hiker can mint a TrailMix NFT on the Polygon network that gives them access to the system. The funds from the NFT sale will form a treasury for the TrailDAO whose mandate is to manage the trails and token allocation in TrailMix.

Each trail in the system will have a zk proof verifier contract deployed to Polygon to verify that hikers have visited the trail. A hiker will receive $TRAIL tokens that give them a vote within TrailDAO. $TRAIL tokens on a hike can also be allocated to a sponsoring organization for the trail. The more you give and hike, the more you get. Those that only hike, will get fewer and fewer tokens over time. Volunteers that do the work of trail reconstruction will also get special allocations.

The funds raised from $TRAIL purchases and NFT sales will be granted in seasons to trail reconstruction organizations as determined by the DAO.

# Creating a Trail
A trail has a verifier zk proof and general information about the trail. A trail is created with the Trail Factory contract.

The verifier instructions are below. For now, just know that you need the address of the deployed contract.

The bounding box and trail path geo coordinates are also needed to define a trail. Store an image of the trail on IPFS and give it a name.

# Creating a Trail Verifier

yarn deploy:verifier

This script will deploy the Verifier.sol found in the contracts directory.

# Advanced Sample Hardhat Project

This project demonstrates an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

The project comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts. It also comes with a variety of other tools, preconfigured to work with the project code.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts
TS_NODE_FILES=true npx ts-node scripts/deploy.ts
npx eslint '**/*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

# Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network ropsten scripts/deploy.ts
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```

# Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).
