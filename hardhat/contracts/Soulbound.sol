// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// Import the necessary contracts
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SoulboundToken is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function mintToken(string memory tokenURI) public onlyOwner {
        uint256 newTokenId = _tokenIdCounter.current() + 1;
        _mint(msg.sender, newTokenId);
        _tokenIdCounter.increment();
        _setTokenURI(newTokenId, tokenURI);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
