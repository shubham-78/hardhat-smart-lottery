const { network } = require("hardhat")
const { BASE_FEE, GAS_PRICE_LINK } = require("../helper-hardhat-config")

module.exports = async (hre) => {
  const { getNamedAccounts, deployments } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId

  if (chainId == 31337) {
    log("Local Network detected. Deploying mocks...")
    await deploy("VRFCoordinatorV2Mock", {
      from: deployer,
      log: true,
      args: [BASE_FEE, GAS_PRICE_LINK],
    })
    log("Mocks Deployed!")
    log("----------------------------------------------")
  }
}

module.exports.tags = ["all", "mocks"]
