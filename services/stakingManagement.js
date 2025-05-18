import { staking } from "../context/contractContext.js"

// Stake SUBV tokens
async function stakeTokens(amount) {
  const amountWei = ethers.utils.parseEther(amount.toString());
  
  // First approve the Staking contract to spend tokens
  const approveTx = await subvToken.approve(StakingAddress, amountWei);
  await approveTx.wait();
  
  // Then stake tokens
  const stakeTx = await staking.stake(amountWei);
  return await stakeTx.wait();
}

// Get staker information
async function getStakerInfo(address) {
  const info = await staking.getStakerInfo(address);
  
  return {
    amount: ethers.utils.formatEther(info.amount),
    stakedTime: new Date(info.stakedTime.toNumber() * 1000).toLocaleString(),
    unlockTime: new Date(info.unlockTime.toNumber() * 1000).toLocaleString(),
    active: info.active
  };
}

// Claim rewards
async function claimRewards(token) {
  const tx = await staking.claimRewards(token);
  return await tx.wait();
}