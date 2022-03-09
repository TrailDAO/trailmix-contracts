// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Trail.sol";

contract TrailFactory {

    event TrailCreated(address verifier, string name, address trailAddress);

    function createTrail(
        address verifier,
        string calldata name, 
        string calldata imageUrl
    ) external {
        Trail trail = new Trail(
            verifier,
            name, 
            imageUrl
        );

        emit TrailCreated(verifier, name, address(trail));
    }
}
