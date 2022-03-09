// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library TrailLibrary {
    struct TrailPath {
        uint256 startLatitude;
        uint256 startLongitude;
        uint256 endLatitude;
        uint256 endLongitude;
    }

    struct BoundingBox {
        uint256 maxLatitude;
        uint256 maxLongitude;
        uint256 minLatitude;
        uint256 minLongitude;
    }
}