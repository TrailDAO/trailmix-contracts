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

    struct ProofInputs {
        uint[2] a;
        uint[2][2] b;
        uint[2] c;
        uint[1] input;
    }

    function hike(ProofInputs calldata proof) external {
        require(trailDAONFT.balanceOf(msg.sender) > 0, "Mint an NFT");
        require(verifier.verifyProof(
            proof.a, 
            proof.b, 
            proof.c, 
            proof.input
        ), "Out of range");

        trailToken.mint(msg.sender, 1000);
    }

}
