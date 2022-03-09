// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Trail.sol";
import "./TrailToken.sol";
import "./TrailDAONFT.sol";
import "./TrailLibrary.sol";
import "./VerifierInterface.sol";

import "hardhat/console.sol";

contract TrailFactory {

    TrailToken public trailToken;
    TrailDAONFT public trailDAONFT;

    event TrailCreated(address verifier, string name, address trailAddress);

    constructor(TrailToken _trailToken, TrailDAONFT _trailDAONFT) {
        trailToken = _trailToken;
        trailDAONFT = _trailDAONFT;
    }

    function createTrail(
        VerifierInterface verifier,
        string calldata name, 
        string calldata imageUrl,
        TrailLibrary.BoundingBox calldata boundingBox,
        TrailLibrary.TrailPath calldata trailPath
    ) external {
        Trail trail = new Trail(
            verifier,
            name, 
            imageUrl,
            boundingBox,
            trailPath,
            this
        );

        emit TrailCreated(address(verifier), name, address(trail));
    }
}
