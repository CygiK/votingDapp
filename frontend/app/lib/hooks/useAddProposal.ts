import { useWriteContract, useAccount, useChainId } from "wagmi";
import { VOTING_ABI, CONTRACT_ADDRESS, CONTRACT_ADDRESS_MAP } from '../../../core/web3/contants'

export function useAddProposal() {
    const { data, writeContract } = useWriteContract();
    const { address } = useAccount();
    const chainId = useChainId();

    const addProposal = (description: string) => {
        writeContract({
            address: CONTRACT_ADDRESS_MAP[chainId as keyof typeof CONTRACT_ADDRESS_MAP],
            abi: VOTING_ABI,
            functionName: 'addProposal',
            account: address,
            args: [description],
        });
    }

    return { addProposal, data };
}