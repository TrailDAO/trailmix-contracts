// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TrailDAONFT is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private tokenIds;

    uint256 public mintPrice = 0.05 ether;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        console.log("TrailDAONFT deployed with %s, %s", name, symbol);
    }

    function mint() external payable {
        require(balanceOf(msg.sender) == 0, "Unable to mint more than one");
        require(msg.value == mintPrice, "Insufficient funds");

        tokenIds.increment();

        _safeMint(msg.sender, tokenIds.current());
    }

    function withdraw(address payable recipient) external onlyOwner {
        Address.sendValue(recipient, address(this).balance);
    }

}