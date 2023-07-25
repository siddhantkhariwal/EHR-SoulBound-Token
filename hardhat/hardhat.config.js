require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({path:__dirname+'/config.env'});

module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  paths: {
    sources: "./contracts",
    artifacts: "./artifacts",
  }
};

