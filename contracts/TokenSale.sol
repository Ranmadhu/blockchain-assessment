// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./MyToken.sol";

contract TokenSale {
    address public owner;
    MyToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;

    event Sell(address _buyer, uint256 _amount);

    constructor(MyToken _tokenContract, uint256 _tokenPrice) {
        owner = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }

    function buyTokens(uint256 _numberOfTokens) public payable {
        require(msg.value == _numberOfTokens * tokenPrice, "Incorrect Ether value");
        require(tokenContract.balanceOf(address(this)) >= _numberOfTokens, "Not enough tokens available");

        tokensSold += _numberOfTokens;
        require(tokenContract.transfer(msg.sender, _numberOfTokens), "Transfer failed");

        emit Sell(msg.sender, _numberOfTokens);
    }

    function endSale() public {
        require(msg.sender == owner, "Only the owner can end the sale");
        require(tokenContract.transfer(owner, tokenContract.balanceOf(address(this))), "Transfer failed");

        payable(owner).transfer(address(this).balance);
    }
}