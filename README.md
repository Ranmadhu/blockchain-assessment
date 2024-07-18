# Blockchain Developer Assessment

Welcome to the blockchain developer assessment for Ceylon Dazzling Dev Holding (Pvt.) Ltd. This project includes smart contracts and a Web3.js integration script for a simple token and a token sale.

## Tools and Versions

- Node.js: v20.15.1
- Truffle: v5.11.5
- Ganache CLI: v6.12.2
- Web3.js: v4.11.0
- OpenZeppelin Contracts: v4.1.0 (compatible with Solidity v0.8.13)
- Solidity Compiler: v0.8.13

## Installation

### Step 1: Install Node.js

Download and install Node.js v20.15.1 from Node.js official website.

### Step 2: Install Truffle

Install Truffle globally using npm:

npm install -g truffle@5.11.5

### Step 3: Install Ganache CLI

Install Ganache CLI globally using npm:

npm install -g ganache-cli@6.12.2

### Step 4: Install Project Dependencies

Navigate to the project directory and install the project dependencies:

npm install

### Step 5: Install OpenZeppelin Contracts

Install the specific version of OpenZeppelin Contracts:

npm install @openzeppelin/contracts@4.1.0

## Running the Code

### Step 1: Start Ganache CLI

In a terminal, start Ganache CLI to run a local Ethereum blockchain instance:

ganache-cli

### Step 2: Compile the Contracts

In another terminal, navigate to the project directory and compile the smart contracts:

truffle compile

### Step 3: Deploy the Contracts

Deploy the smart contracts to the local Ganache blockchain:

truffle migrate --reset

### Step 4: Run the Web3.js Integration Script

Run the Web3.js integration script to interact with the deployed contracts:

node web3-integration.js

## Explanation

The project consists of the following components:

1. MyToken.sol: A simple ERC20 token contract with a total supply of 1,000,000 tokens.
2. TokenSale.sol: A token sale contract that allows users to buy tokens using Ether.
3. 2_deploy_contracts.js: A migration script to deploy MyToken and TokenSale contracts.
4. web3-integration.js: A script to interact with the deployed contracts using Web3.js, including purchasing tokens and displaying balances.

## Notes

- Ensure Ganache CLI is running on the default port (8545) before deploying the contracts.
- The Web3.js integration script assumes that Ganache CLI and Truffle are correctly set up and running.
- Adjust the gas and gas price settings in the scripts if needed based on your network conditions.

## Contact

For any issues or questions, please contact the project maintainer.