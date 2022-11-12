// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyNFT is ERC721, ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("MyNFT", "NFT") {}

    // 所有権と売られているかの情報を格納する配列
    struct ListedToken {
        uint256 tokenId;
        address payable owner;
        address payable seller;
        uint256 plice;
        bool isListed;
    }

    mapping(uint256 => ListedToken) idToListedToken;

    function mintNFT(address to, string memory uri) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    // 所有権の移譲と値段の設定

    function transferNFT(address from, address to, uint256 tokenId) public {
        _transfer(from, to, tokenId);
    }

    // NFT数の取得
    function latest_tokenId() public view returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        return  tokenId;
    }
}