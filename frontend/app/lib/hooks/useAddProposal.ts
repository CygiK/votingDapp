import { useWriteContract, useAccount } from "wagmi";
import { VOTING_ABI, CONTRACT_ADDRESS } from '../../../core/web3/contants'

export function useAddProposal() {
    const { data, writeContract } = useWriteContract();
    const { address } = useAccount();

    const addProposal = (description: string) => {
        writeContract({
            address: CONTRACT_ADDRESS,
            abi: VOTING_ABI,
            functionName: 'addProposal',
            account: address,
            args: [description],
        });
    }

    console.log('📄 useAddProposal - data:', data);

    return { addProposal, data };
}