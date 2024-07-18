module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545, // Default port for Ganache CLI
      network_id: "*",
      gas: 6721975, // Set gas limit within the block gas limit
      gasPrice: 20000000000,
    },
  },
  compilers: {
    solc: {
      version: "0.8.13", // Use the compatible version
    },
  },
};
