import { VOTING_ABI, CONTRACT_ADDRESS } from '../../../core/web3/contants'

import { useWriteContract, useAccount, useWaitForTransactionReceipt } from 'wagmi'

export function useAddVoterToWhiteList() {
    const {data: hash, writeContract} = useWriteContract();
    const { address } = useAccount();

    const addVoterToWhiteList = (voterAddress: `0x${string}`) => {
        writeContract({
            address: CONTRACT_ADDRESS,
            abi: VOTING_ABI,
            functionName: 'addVoter',
            account: address,
            args: [voterAddress],
        });
    }

    const { isLoading, isSuccess, isPending, error: errorConfirmation } = useWaitForTransactionReceipt({
        hash,
    });

    return { addVoterToWhiteList, isLoading, isSuccess, errorConfirmation, isPending };
}

    