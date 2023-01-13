const { ethers } = require("hardhat")

const networkConfig = {
  default: {
    name: "hardhat",
    interval: "30",
  },
  31337: {
    name: "localhost",
    entranceFee: ethers.utils.parseEther("0.01"),
    gasLane: process.env.GAS_LANE,
    callbackGasLimit: "500000",
    interval: "30",
    subscriptionId: "588",
  },
  5: {
    name: "goerli",
    vrfCoordinatorV2: process.env.VRF_COORD,
    entranceFee: ethers.utils.parseEther("0.01"),
    gasLane: process.env.GAS_LANE,
    subscriptionId: "6926", // this we need to get rom vrf.chain.linl. fo rthat we need 10 fake link from goerli network
    callbackGasLimit: "500000",
    interval: "30",
  },
}

const developmentChains = ["hardhat", "localhost"]
const VERIFICATION_BLOCK_CONFIRMATIONS = 6
const BASE_FEE = "250000000000000000" //or this one ethers.utils.parseEther("0.25")
const GAS_PRICE_LINK = 1e9 //link per gas
const FRONT_END_ADDRESSES_FILE =
  "../hardhat-smart-lottery-frontend/constants/contractAddresses.json"
const FRONT_END_ABI_FILE = "../hardhat-smart-lottery-frontend/constants/abi.json"

module.exports = {
  networkConfig,
  developmentChains,
  BASE_FEE,
  VERIFICATION_BLOCK_CONFIRMATIONS,
  GAS_PRICE_LINK,
  FRONT_END_ADDRESSES_FILE,
  FRONT_END_ABI_FILE,
}
