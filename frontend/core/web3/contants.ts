import abi from './abi/voting.abi.json';

const CONTRACT_ADDRESS = '0x883E7c1DFa080473F29401544216521A261fb501' as `0x${string}`;
const WALLETCONNECT_PROJECT_ID = '43ad57af286e1c1ce143a75ef96efa3c';
const VOTING_ABI = abi;
const WORKFLOW_STEP_NAME = [
    "RegisteringVoters",
    "startProposalsRegistering",
    "endProposalsRegistering",
    "startVotingSession",
    "endVotingSession",
    "tallyVotes"
] as const;


export { CONTRACT_ADDRESS, WALLETCONNECT_PROJECT_ID, VOTING_ABI, WORKFLOW_STEP_NAME };