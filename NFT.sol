// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintNft is ERC721, Ownable {
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private tokenIds;

    mapping (uint256 => string) private _tokenURIs;
    mapping (address => uint256[])  ownerTokens;

    string private _baseURIextended;

    constructor(
            string memory _name,
            string memory _symbol,
            string memory _baseUri
        )
         ERC721(
            _name ,_symbol
        ){
            _baseURIextended = _baseUri;
        }

    function _baseUri() internal view returns(string memory){
        return _baseURIextended;
    }

    function tokenURI(uint256 tokenID) public view virtual override returns(string memory){
        require(_exists(tokenID), "ERC721:  token does not exist !");
        string memory _tokenUri = _tokenURIs[tokenID];
        string memory base = _baseUri();

        if(bytes(_tokenUri).length > 0){
            return string(abi.encodePacked(base, _tokenUri));
        }
        return string(abi.encodePacked(base,tokenID.toString()));
    }
    
    function mintNFT() public {
        require(msg.sender != address(0), "ERC721: Invalid Address !");

        uint256 newTokenId = tokenIds.current();
        _mint(msg.sender, newTokenId);
        tokenURI(newTokenId);
        ownerTokens[msg.sender].push(newTokenId);
        
        tokenIds.increment();
    }

    function totalSupply() external view returns(uint256){
        return  tokenIds.current();
    }

    function tokenOfOwner(address _owner) public view returns(uint256[] memory){
        require(msg.sender != address(0), "ERC721: Invalid address !");

        ownerTokens[_owner];
    }
}