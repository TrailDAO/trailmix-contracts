// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract TrailDAONFT is ERC721Enumerable {

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        console.log("TrailDAONFT deployed with %s, %s", name, symbol);
    }

}