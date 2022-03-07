// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Trail {
    string public name;
    string public imageUrl;
    address public verifier;
    uint256 public maxLatitude;
    uint256 public minLatitude;
    uint256 public maxLongitude;
    uint256 public minLongitude;

    constructor(
        address _verifier,
        uint256 _maxLatitude,
        uint256 _minLatitude,
        uint256 _maxLongitude,
        uint256 _minLongitude,
        string memory _name, 
        string memory _imageUrl
    ) {
        console.log("Trail name %s, verifier %s, imageUrl %s", 
            _name, _verifier, _imageUrl);

        name = _name;
        imageUrl = _imageUrl;
        verifier = _verifier;
        maxLatitude = _maxLatitude;
        minLatitude = _minLatitude;
        maxLongitude = _maxLongitude;
        minLongitude = _minLongitude;
    }

}
