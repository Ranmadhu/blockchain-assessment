const { Web3 } = require('web3');
const MyToken = require('./build/contracts/MyToken.json');
const TokenSale = require('./build/contracts/TokenSale.json');

// Ensure Web3 is correctly instantiated
const web3 = new Web3('http://localhost:8545');

const deployContracts = async () => {
    const accounts = await web3.eth.getAccounts();
    const tokenPrice = web3.utils.toWei('0.001', 'ether'); // Token price in Wei

    // Deploy MyToken contract
    const myTokenContract = new web3.eth.Contract(MyToken.abi);
    const myTokenInstance = await myTokenContract.deploy({
        data: MyToken.bytecode
    }).send({ from: accounts[0], gas: '1500000', gasPrice: '20000000000' });

    console.log('MyToken deployed at:', myTokenInstance.options.address);

    // Deploy TokenSale contract
    const tokenSaleContract = new web3.eth.Contract(TokenSale.abi);
    const tokenSaleInstance = await tokenSaleContract.deploy({
        data: TokenSale.bytecode,
        arguments: [myTokenInstance.options.address, tokenPrice]
    }).send({ from: accounts[0], gas: '1500000', gasPrice: '20000000000' });

    console.log('TokenSale deployed at:', tokenSaleInstance.options.address);

    // Transfer some tokens to the TokenSale contract
    await myTokenInstance.methods.transfer(tokenSaleInstance.options.address, 1000000 * (10 ** 18)).send({ from: accounts[0], gas: '1500000', gasPrice: '20000000000' });

    // Check balance of TokenSale contract
    const tokenSaleBalance = await myTokenInstance.methods.balanceOf(tokenSaleInstance.options.address).call();
    console.log('TokenSale contract balance:', web3.utils.fromWei(tokenSaleBalance, 'ether'));

    return { myTokenInstance, tokenSaleInstance, accounts };
};

const interactWithContracts = async () => {
    const { myTokenInstance, tokenSaleInstance, accounts } = await deployContracts();

    // Purchase tokens
    await tokenSaleInstance.methods.buyTokens(100).send({
        from: accounts[1],
        value: web3.utils.toWei('0.1', 'ether'),
        gas: '150000',
        gasPrice: '20000000000' // 20 gwei
    });

    // Display account's token balance
    const balance = await myTokenInstance.methods.balanceOf(accounts[1]).call();
    console.log('Account balance:', web3.utils.fromWei(balance, 'ether'));

    // Print the number of tokens left for sale
    const tokensLeft = await myTokenInstance.methods.balanceOf(tokenSaleInstance.options.address).call();
    console.log('Tokens left for sale:', web3.utils.fromWei(tokensLeft, 'ether'));
};

interactWithContracts().catch((error) => {
    console.error(error);
});