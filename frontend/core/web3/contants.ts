import abi from './abi/voting.abi.json';

const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3' as `0x${string}`;
const WALLETCONNECT_PROJECT_ID = '43ad57af286e1c1ce143a75ef96efa3c';
const VOTING_ABI = abi;
const WORKFLOW_STEP_NAME = [
    "RegisteringVoters",
    "startProposalsRegistering",
    "ProposalsRegistrationEnded",
    "VotingSessionStarted",
    "VotingSessionEnded",
    "VotesTallied"
] as const;


export { CONTRACT_ADDRESS, WALLETCONNECT_PROJECT_ID, VOTING_ABI, WORKFLOW_STEP_NAME };