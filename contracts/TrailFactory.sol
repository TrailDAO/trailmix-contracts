// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Trail.sol";

contract TrailFactory {

    event TrailCreated(address verifier, string name, address trailAddress);

    function createTrail(
        address verifier,
        uint256 maxLatitude,
        uint256 minLatitude,
        uint256 maxLongitude,
        uint256 minLongitude,
        string calldata name, 
        string calldata imageUrl
    ) external {
        Trail trail = new Trail(
            verifier,
            maxLatitude,
            minLatitude,
            maxLongitude,
            minLongitude,
            name, 
            imageUrl
        );

        emit TrailCreated(verifier, name, address(trail));
    }
}
