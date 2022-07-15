const { ethers } = require("hardhat");

async function main() {

  const taxRate = 100;
  const startTime = 10000000000;

  const wTokenAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

  // Get the signer
  const [deployer] = await ethers.getSigners();
  console.log("Deployer Address: " + deployer.address);

  // Deploy token
  const Tomb = await ethers.getContractFactory("Tomb");
  const tomb = await Tomb.deploy(100, deployer.address);
  console.log("Tomb deployed at: " + tomb.address);

  // Deploy TBonds
  const TBond = await ethers.getContractFactory("TBond");
  const tBond = await TBond.deploy();
  console.log("TBond deployed at: " + tBond.address);

  // Deploy TShare
  const TShare = await ethers.getContractFactory("TShare");
  const tShare = await TShare.deploy(startTime, deployer.address, deployer.address);
  console.log("TShare deployed at: " + tShare.address);

  // Deploy Pools
  const GenesisRewardPool = await ethers.getContractFactory("TombGenesisRewardPool");
  const genesisRewardPool = await GenesisRewardPool.deploy(tomb.address, wTokenAddress, startTime); 
  console.log("GenesisRewardPool deployed at: " + genesisRewardPool.address);

  const TombRewardPool = await ethers.getContractFactory("TombRewardPool");
  const tombRewardPool = await TombRewardPool.deploy(tomb.address, startTime);
  console.log("TombRewardPool deployed at: " + tombRewardPool.address);

  const TShareRewardPool = await ethers.getContractFactory("TShareRewardPool");
  const tShareRewardPool = await TShareRewardPool.deploy(tShare.address, startTime);
  console.log("TShareRewardPool deployed at: " + tShareRewardPool.address);



    console.log(
      JSON.stringify({
        TOKEN: tomb.address,
      })
    );

}

main()
    .then(() => process.exit())
    .catch(error => {
        console.error(error);
        process.exit(1);
})
