// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EGG is ERC721URIStorage {
	uint256 private _tokenIds;
	string public baseTokenURI;

	constructor(string memory _baseTokenURI) ERC721("EGG", "EGG") {
		baseTokenURI = _baseTokenURI; // Set base URI (image link) at contract deployment
	}

	function mintNFT(address recipient) public returns (uint256) {
		_tokenIds += 1;
		uint256 newItemId = _tokenIds;

		// Mint the token
		_mint(recipient, newItemId);

		// Set the token URI to the base URI for each minted NFT
		_setTokenURI(newItemId, baseTokenURI);

		return newItemId;
	}
}
