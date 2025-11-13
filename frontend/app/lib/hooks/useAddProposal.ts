import { useWriteContract, useAccount, useChainId } from "wagmi";
import { VOTING_ABI, CONTRACT_ADDRESS, CONTRACT_ADDRESS_MAP } from '../../../core/web3/contants'
import { addressbyChainIdAndEnv } from '../../../core/web3/utils';

export function useAddProposal() {
    const { data, writeContract } = useWriteContract();
    const { address } = useAccount();
    const chainId = useChainId();

    const addProposal = (description: string) => {
        writeContract({
            address: addressbyChainIdAndEnv(chainId as keyof typeof CONTRACT_ADDRESS_MAP),
            abi: VOTING_ABI,
            functionName: 'addProposal',
            account: address,
            args: [description],
        });
    }

    return { addProposal, data };
}