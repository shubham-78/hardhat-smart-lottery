const { network, ethers } = require("hardhat")
const {
  developmentChains,
  networkConfig,
  VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
const VRF_SUB_FUND_AMOUNT = ethers.utils.parseEther("1")

module.exports = async (hre) => {
  const { getNamedAccounts, deployments } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId
  let vrfCoordinatorV2Address, subscriptionId, vrfCoordinatorV2Mock

  if (chainId == 31337) {
    vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
    vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address
    const transactionResponse = await vrfCoordinatorV2Mock.createSubscription()
    const transactionReceipt = await transactionResponse.wait(1)
    subscriptionId = transactionReceipt.events[0].args.subId
    // fund the subscription
    //usually you need link token to fund real network
    await vrfCoordinatorV2Mock.fundSubscription(subscriptionId, VRF_SUB_FUND_AMOUNT)
  } else {
    vrfCoordinatorV2Address = networkConfig[chainId]["vrfCoordinatorV2"]
    subscriptionId = networkConfig[chainId]["subscriptionId"]
  }

  const waitBlockConfirmations = developmentChains.includes(network.name)
    ? 1
    : VERIFICATION_BLOCK_CONFIRMATIONS
  const entranceFee = networkConfig[chainId]["entranceFee"]
  const gasLane = networkConfig[chainId]["gasLane"]
  const callbackGasLimit = networkConfig[chainId]["callbackGasLimit"]
  const interval = networkConfig[chainId]["interval"]

  const raffle = await deploy("Raffle", {
    from: deployer,
    args: [
      vrfCoordinatorV2Address,
      entranceFee,
      gasLane,
      subscriptionId,
      callbackGasLimit,
      interval,
    ],
    log: true,
    waitConfirmations: waitBlockConfirmations,
  })

  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    log("Verifying...")
    await verify(raffle.address, args)
  }
  log("---------------------------------")
}

module.exports.tags = ["all", "raffle"]
