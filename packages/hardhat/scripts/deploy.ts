import { ethers } from "hardhat";

async function main() {
  const Guestbook = await ethers.getContractFactory("Guestbook");
  const guestbook = await Guestbook.deploy();
  await guestbook.deployed();

  console.log("Guestbook deployed to:", guestbook.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});