import { VOTING_ABI, CONTRACT_ADDRESS, WORKFLOW_STEP_NAME  } from '../../../core/web3/contants'

import { useReadContract, useAccount, useWaitForTransactionReceipt } from 'wagmi'
import  * as React from 'react'
import { parseAbiItem } from 'viem';

type Voter = {
    isRegistered: boolean;
    hasVoted: boolean;
    votedProposalId: bigint;
};

export function useGetVoterFromWhiteList(): Voter {
    const { address } = useAccount();

    const { data: voter } = useReadContract({
        abi: VOTING_ABI,
        address: CONTRACT_ADDRESS,
        functionName: 'getVoter',
        args: [address],
    });

    return voter as Voter;
}