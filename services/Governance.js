// Initialize Governance contract
const GovernanceAddress = '0x859C849F17258296a3Bb6a36292639F669ABC219';
const GovernanceABI = require('./abis/Governance.json');
const governance = new ethers.Contract(GovernanceAddress, GovernanceABI.abi, signer);

// Create a proposal
async function createProposal(title, description, targetContract, callData) {
  const tx = await governance.propose(title, description, targetContract, callData);
  return await tx.wait();
}

// Cast a vote
async function castVote(proposalId, support) {
  // support: 0=against, 1=for, 2=abstain
  const tx = await governance.castVote(proposalId, support);
  return await tx.wait();
}

// Get proposal details
async function getProposalDetails(proposalId) {
  const details = await governance.getProposalDetails(proposalId);
  
  return {
    title: details.title,
    description: details.description,
    proposer: details.proposer,
    targetContract: details.targetContract,
    startTime: new Date(details.startTime.toNumber() * 1000).toLocaleString(),
    endTime: new Date(details.endTime.toNumber() * 1000).toLocaleString(),
    forVotes: ethers.utils.formatEther(details.forVotes),
    againstVotes: ethers.utils.formatEther(details.againstVotes),
    state: translateProposalState(details.state)
  };
}

// Helper to translate proposal state
function translateProposalState(state) {
  const states = ['Pending', 'Active', 'Canceled', 'Defeated', 'Succeeded', 'Executed'];
  return states[state];
}