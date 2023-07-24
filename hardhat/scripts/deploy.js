const hre = require("hardhat");

async function main() {
  // Compile the smart contract
  await hre.run('compile');

  // Get the contract instance
  const SoulboundToken = await hre.ethers.getContractFactory("SBD");

  // Deploy the contract
  const contract = await SBD.deploy("Soulbound Token", "SBT");

  // Wait for the contract to be deployed
  await contract.deployed();

  console.log("SoulboundToken deployed to:", contract.address);
}

// Run the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
