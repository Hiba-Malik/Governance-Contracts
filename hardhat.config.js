const { ethers } = require('ethers');

require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');

require('dotenv').config();
const { PRIVATE_KEY } = process.env;
task('accounts', 'Prints the list of accounts', async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 31337,
      gas: 9000000,
      blockGasLimit: 0x1fffffffffffff,
      allowUnlimitedContractSize: true
    }
  },
  //   defaultNetwork: 'rinkeby',
  //   networks: {
  //     hardhat: {},
  //     rinkeby: {
  //       url: 'https://rinkeby.infura.io/v3/093b4fa91bff4c14b88d04dccdb94bee',
  //       accounts: [PRIVATE_KEY],
  //     },
  //     goerli: {
  //       url: 'https://goerli.infura.io/v3/093b4fa91bff4c14b88d04dccdb94bee',
  //       accounts: [PRIVATE_KEY],
  //     },
  //     mumbai: {
  //       url: 'https://polygon-mumbai.g.alchemy.com/v2/RGYs6b1Ynxzx_NUlIN8BU5yrV50oee13',
  //       accounts: [PRIVATE_KEY],
  //     },
  //     matic: {
  //       url: 'https://rpc-mumbai.maticvigil.com',
  //       accounts: [PRIVATE_KEY],
  //     },
  //   },
  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.2",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      }
    ],
    // version: '^0.8.0',

  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    // coinmarketcap: COINMARKETCAP_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
  },
  mocha: {
    timeout: 200000, // 200 seconds max for running tests
  },
  //   paths: {
  //     artifacts: './src/backend/artifacts',
  //     sources: './src/backend/contracts',
  //     cache: './src/backend/cache',
  //     tests: './src/backend/test',
  //   },
  //   // mocha: {
  //   //   timeout: 40000,
  //   // },
  //   etherscan: {
  //     apiKey: 'ZZNYA7JY49DW31IFZYR58QQU37SBF7ZXPS', // for ethereum
  //   },
  //   // etherscan: {
  //   //   apiKey: {
  //   //     polygonMumbai: 'GTSCQ1A3N2TUUF3G69WQ63NGQ7KWW4Z1JB',
  //   //   },
  //   // },
};
