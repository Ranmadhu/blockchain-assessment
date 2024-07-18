const MyToken = artifacts.require("MyToken");
const TokenSale = artifacts.require("TokenSale");

module.exports = async function(deployer) {
  await deployer.deploy(MyToken);
  const tokenInstance = await MyToken.deployed();
  const tokenPrice = 1000000000000000; // Token price in Wei (0.001 Ether)
  await deployer.deploy(TokenSale, tokenInstance.address, tokenPrice);
  const tokenSaleInstance = await TokenSale.deployed();

  // Transfer some tokens to the TokenSale contract
  const totalSupply = await tokenInstance.totalSupply();
  await tokenInstance.transfer(tokenSaleInstance.address, totalSupply);
};