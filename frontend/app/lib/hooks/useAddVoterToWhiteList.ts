import { VOTING_ABI, CONTRACT_ADDRESS, CONTRACT_ADDRESS_MAP } from '../../../core/web3/contants'
import { addressbyChainIdAndEnv } from '../../../core/web3/utils';

import { useWriteContract, useAccount, useWaitForTransactionReceipt, useChainId } from 'wagmi'

export function useAddVoterToWhiteList() {
    const {data: hash, writeContract} = useWriteContract();
    const { address } = useAccount();
    const chainId = useChainId();

    const addVoterToWhiteList = (voterAddress: `0x${string}`) => {
        writeContract({
            address: addressbyChainIdAndEnv(chainId as keyof typeof CONTRACT_ADDRESS_MAP),
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

    