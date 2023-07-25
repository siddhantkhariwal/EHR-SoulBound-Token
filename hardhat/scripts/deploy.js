const hre = require("hardhat");

async function main() {
  
  await hre.run('compile');
  const SoulboundToken = await hre.ethers.getContractFactory("Soulbound");

  const contract = await SBD.deploy("Soulbound Token", "SBT");

  await contract.deployed();

  console.log("SoulboundToken deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
