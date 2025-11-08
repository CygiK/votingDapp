import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESS, VOTING_ABI } from '../../../core/web3/contants';

/**
 * Hook personnalisé pour permettre à un électeur de voter pour une proposition
 * 
 * @returns {Object} Objet contenant les fonctions et états du vote
 * @returns {Function} vote - Fonction pour voter pour une proposition donnée
 * @returns {boolean} isPending - Indique si la transaction est en cours
 * @returns {boolean} isConfirming - Indique si la transaction est en cours de confirmation
 * @returns {boolean} isConfirmed - Indique si la transaction est confirmée
 * @returns {string} hash - Hash de la transaction
 */
export function useVote() {
    const { data: hash, writeContract, isPending } = useWriteContract();

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
            address: CONTRACT_ADDRESS,
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
