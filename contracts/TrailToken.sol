// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./TrailFactory.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract TrailToken is ERC20, Ownable {
    TrailFactory public trailFactory;

    modifier onlyTrail {
        require(address(trailFactory) != address(0), "Factory not set");
        require(trailFactory.isTrail(msg.sender), "Not a trail");
        _;
    }

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        console.log("TrailToken deployed %s, %s", name, symbol);
    }

    function setTrailFactory(TrailFactory _trailFactory) external onlyOwner {
        trailFactory = _trailFactory;
    }

    function mint(address account, uint256 amount) external onlyTrail {
        _mint(account, amount);
    }
}
