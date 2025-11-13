import { useWriteContract, useWaitForTransactionReceipt, useChainId } from 'wagmi';
import { CONTRACT_ADDRESS, VOTING_ABI, CONTRACT_ADDRESS_MAP } from '../../../core/web3/contants';
import { addressbyChainIdAndEnv } from '../../../core/web3/utils';
export function useVote() {
    const { data: hash, writeContract, isPending } = useWriteContract();
    const chainId = useChainId();

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    /**
     * Fonction pour soumettre un vote pour une proposition
     * 
     * @param {bigint} proposalId - ID de la proposition pour laquelle voter
     */
    const vote = (proposalId: bigint) => {
        writeContract({
            address: addressbyChainIdAndEnv(chainId as keyof typeof CONTRACT_ADDRESS_MAP),
            abi: VOTING_ABI,
            functionName: 'setVote',
            args: [proposalId],
        });
    };

    return {
        vote,
        isPending,
        isConfirming,
        isConfirmed,
        hash,
    };
}
