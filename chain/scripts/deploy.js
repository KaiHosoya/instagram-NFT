// async function main() {
//   // Grab the contract factory 
//   const MyNFT = await ethers.getContractFactory("MyNFT");

//   // Start deployment, returning a promise that resolves to a contract object
//   const myNFT = await MyNFT.deploy(); // Instance of the contract 
//   console.log("Contract deployed to address:", myNFT.address);
// }

// main()
//  .then(() => process.exit(0))
//  .catch(error => {
//    console.error(error);
//    process.exit(1);
//  });

const hre = require("hardhat");

const currentTimestampInSeconds = Math.round(Date.now() / 1000);
const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

const lockedAmount = hre.ethers.utils.parseEther("1");
async function main() {
  const myNFT = await hre.ethers.getContractFactory("MyNFT")
  await myNFT.deploy();
  console.log("MyNFT deployed to", myNFT.address)
}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });