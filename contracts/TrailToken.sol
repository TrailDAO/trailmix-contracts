// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract TrailToken is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        console.log("TrailToken deployed %s, %s", name, symbol);
    }
}
