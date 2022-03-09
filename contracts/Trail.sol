// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Trail {
    string public name;
    string public imageUrl;
    address public verifier;

    constructor(
        address _verifier,
        string memory _name, 
        string memory _imageUrl
    ) {
        console.log("Trail name %s, verifier %s, imageUrl %s", 
            _name, _verifier, _imageUrl);

        name = _name;
        imageUrl = _imageUrl;
        verifier = _verifier;
    }

}
