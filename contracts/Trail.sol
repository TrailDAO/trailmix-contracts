// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./TrailLibrary.sol";
import "./TrailFactory.sol";
import "./TrailDAONFT.sol";
import "./TrailToken.sol";
import "./VerifierInterface.sol";

import "hardhat/console.sol";

contract Trail {
    string public name;
    string public imageUrl;
    
    TrailLibrary.TrailPath public trailPath;
    TrailLibrary.BoundingBox public boundingBox;

    TrailToken public trailToken;
    TrailDAONFT public trailDAONFT;
    VerifierInterface public verifier;

    constructor(
        VerifierInterface _verifier,
        string memory _name, 
        string memory _imageUrl,
        TrailLibrary.BoundingBox memory _boundingBox,
        TrailLibrary.TrailPath memory _trailPath,
        TrailFactory _factory
    ) {
        name = _name;
        imageUrl = _imageUrl;
        verifier = _verifier;
        boundingBox = _boundingBox;
        trailPath = _trailPath;
        trailToken = _factory.trailToken();
        trailDAONFT = _factory.trailDAONFT();
    }

    // hike is the thing we need for generatecall
    function hike() external {
        require(trailDAONFT.balanceOf(msg.sender) > 0, "Mint an NFT");
        // If yes, call verifier

        // If verifyProof is true, then give msg.sender tokens
    }

}
