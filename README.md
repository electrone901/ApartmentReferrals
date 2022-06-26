# Project name

Apartment Referrals

# Description

Apartment Referrals is a safeguard for landlords and tenants in this chaotic market. It is an app that brings transparency and accountability to all partners. Ultimately, decreasing wasted time and resources. If you are a tenant you should be able to find your apartment and rate its management, installations, equipment, the building, etcetera. If you are the owner you can register your apartment.

If you are the owner you can register your apartment. Apartment Referrals is a platform that makes the renting process a little easier while protecting the user's privacy and the transparency of the apartment process.

### Website Demo

- https://apartment-referrals-app.netlify.app/

### Video Demo

- coming soon 

# deployed Address

- deployedMaticContract = '0x62dDfd4447E5c894fa7860c1271b5B0293cBCa09'
- deployedSkaleContract = '0x16d7be29ebc6db2e9c92E0Bf1dE5c1cfe6b1AD2a'
- deployedOptimismContract ='0x16d7be29ebc6db2e9c92E0Bf1dE5c1cfe6b1AD2a'

# How it's made

Apartment Referrals application makes use of the following software:

- `Matic - Polygon Network` is the network where we deployed our dApp for scalability.
- `Skale Network` is the network where we deployed our dApp for scalability.
- `OptimismNetwork` is the network where we deployed our dApp for scalability.
- `ENS Domains` facilitated the lookup process for searching by tenant’s ENS Domain name. This protocol simplified the user experience of our app by allowing landlords to look up users by domain names instead of copying long crypto addresses.

- `Covalent API` facilitated the retrieval of user’s NFTs. The Covalent API endpoints to get all NFTs balance and metadata from a wallet address such us images, contracts name, NFTs images and balances.

* `IPFS NFTStorage` for data storage on IPFS that generates a transaction hash used to create an NFT of a photo.

* `textile/eth-storage`: facilitated a fast way to store metadata for NFTs such: names, locations, description, images, wallet addresses, and more. It was perfect for our use case to save their needs on the textile storage.

* `NFTPort` smooths the path of minting and awarding NFTs to tenants. This is a win-win situation for tenants and landlords because they don't have to pay transactions fee.

* `Pocket Network` smooths the path of deploying and the hassle of paying big transactions to deploy our app contract to a node using the Matic, Skale, Optimism, and Rinkeby network.
* `Solidity` for the smart contract.
* `OpenZeppelin ERC721` we use the ERC721 template for faster development of our smart contract.

* `Ganache` for local blockchain development.

* `Rinkeby Network` is the network where we deployed our dApp.

* `React Js, Material-ui, Web3` React Js for the frontend, Material-ui, and Web3 to connect to the blockchain.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.

## Notes

- npx create-react-app realEstate
- npx hardhat init, basic project, deploy
  `to deploy`
  npx hardhat run scripts/sample-script.js --network matic
  npx hardhat run ./scripts/deploy.ts --network localhost
- connect fronent to MetaMask wallet

# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
