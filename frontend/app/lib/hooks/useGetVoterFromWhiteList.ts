import { VOTING_ABI, CONTRACT_ADDRESS, WORKFLOW_STEP_NAME, CONTRACT_ADDRESS_MAP  } from '../../../core/web3/contants'

import { useReadContract, useAccount, useWaitForTransactionReceipt, useChainId } from 'wagmi'

type Voter = {
    isRegistered: boolean;
    hasVoted: boolean;
    votedProposalId: bigint;
};

export function useGetVoterFromWhiteList(): Voter {
    const { address } = useAccount();
    const chainId = useChainId();

    const { data: voter } = useReadContract({
        abi: VOTING_ABI,
        address: CONTRACT_ADDRESS_MAP[chainId as keyof typeof CONTRACT_ADDRESS_MAP],
        functionName: 'getVoter',
        args: [address],
    });

    return voter as Voter;
}