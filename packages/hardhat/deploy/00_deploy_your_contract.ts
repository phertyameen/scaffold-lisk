import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployGuestbook: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("Guestbook", {
    from: deployer,
    args: [], // no constructor args
    log: true,
    autoMine: true, // speed up on local network
  });
};

export default deployGuestbook;
deployGuestbook.tags = ["Guestbook"];