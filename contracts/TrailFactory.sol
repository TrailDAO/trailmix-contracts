// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Trail.sol";
import "./TrailToken.sol";
import "./TrailMixNFT.sol";
import "./TrailLibrary.sol";
import "./VerifierInterface.sol";

import "hardhat/console.sol";

contract TrailFactory {

    TrailToken public trailToken;
    TrailMixNFT public trailMixNFT;

    mapping(address => bool) private trails;

    event TrailCreated(address verifier, string name, address trailAddress);

    constructor(TrailToken _trailToken, TrailMixNFT _trailMixNFT) {
        trailToken = _trailToken;
        trailMixNFT = _trailMixNFT;
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

        trails[address(trail)] = true;

        emit TrailCreated(address(verifier), name, address(trail));
    }

    function isTrail(address trail) public view returns (bool) {
        return trails[trail];
    }
}
