// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TrailMixNFT is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private tokenIds;

    uint256 public mintPrice = 0.05 ether;

    string public _collectionURI = "";

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
    }

    function mint() external payable {
        require(balanceOf(msg.sender) == 0, "Unable to mint more than one");
        require(msg.value == mintPrice, "Insufficient funds");

        tokenIds.increment();

        _safeMint(msg.sender, tokenIds.current());
    }

    function setCollectionURI(string memory collectionURI) external onlyOwner {
        _collectionURI = collectionURI;
    }

    function _baseURI() internal override view virtual returns (string memory) {
        return _collectionURI;
    }

    function withdraw(address asset) external onlyOwner {
        if (asset == address(0)) {
            Address.sendValue(payable(msg.sender), address(this).balance);
        } else {
            uint256 balance = IERC20(asset).balanceOf(address(this));
            IERC20(asset).transfer(msg.sender, balance);
        }
    }

}