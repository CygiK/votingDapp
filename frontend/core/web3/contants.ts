import abi from './abi/voting.abi.json';

const CONTRACT_ADDRESS = '0x5fbdb2315678afecb367f032d93f642f64180aa3' as `0x${string}`;
const CONTRACT_ADDRESS_SEPOLIA = '0x883E7c1DFa080473F29401544216521A261fb501' as `0x${string}`;
const CONTRACT_ADDRESS_LOCAL = '0x5fbdb2315678afecb367f032d93f642f64180aa3' as `0x${string}`;
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
const SEPOLIA_RPC_URL = 'https://sepolia.infura.io/v3/9669721cbaeb428f866a74b2f6aa2793';
const CONTRACT_ADDRESS_MAP = {
    11155111: CONTRACT_ADDRESS_SEPOLIA,
    31337: CONTRACT_ADDRESS_LOCAL,
} as const;

export { CONTRACT_ADDRESS, WALLETCONNECT_PROJECT_ID, VOTING_ABI, WORKFLOW_STEP_NAME, SEPOLIA_RPC_URL, CONTRACT_ADDRESS_MAP };