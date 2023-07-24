// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SoulboundToken is ERC721Enumerable, Ownable {
    

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    struct Token {
        address owner;  // Address of the token owner
        string metadata; // Token metadata (e.g., token information, IPFS hash, etc.)
    }

    mapping(uint256 => Token) private tokens;

    uint256 private tokenIdCounter = 0;

    function mintToken(string memory metadata) public onlyOwner {
        tokenIdCounter++;
        _safeMint(msg.sender, tokenIdCounter);

        // Assign token attributes and owner
        tokens[tokenIdCounter] = Token({
            owner: msg.sender,
            metadata: metadata
            // Add other attributes as needed
        });
    }

    function transferFrom(address from, address to, uint256 tokenId) public override {
        require(tokens[tokenId].owner == msg.sender, "You can only transfer your own soulbound token.");
        revert("Transfers are not allowed for soulbound tokens.");
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) public override {
        require(tokens[tokenId].owner == msg.sender, "You can only transfer your own soulbound token.");
        revert("Transfers are not allowed for soulbound tokens.");
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public override {
        require(tokens[tokenId].owner == msg.sender, "You can only transfer your own soulbound token.");
        revert("Transfers are not allowed for soulbound tokens.");
    }

}
