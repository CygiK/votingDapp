import { useReadContract } from 'wagmi';
import { CONTRACT_ADDRESS, VOTING_ABI } from '../../../core/web3/contants';

/**
 * Hook personnalisé pour récupérer les informations sur la proposition gagnante
 * 
 * @returns {Object} Objet contenant les informations du gagnant
 * @returns {bigint} winningProposalId - ID de la proposition gagnante
 * @returns {Object} winningProposal - Détails de la proposition gagnante
 * @returns {boolean} isLoading - Indique si les données sont en cours de chargement
 * @returns {boolean} isError - Indique si une erreur s'est produite
 */
export function useGetWinner() {
    // Récupère l'ID de la proposition gagnante
    const { 
        data: winningProposalId, 
        isLoading: isLoadingId,
        isError: isErrorId 
    } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: VOTING_ABI,
        functionName: 'winningProposalID',
    });

    // Récupère les détails de la proposition gagnante
    const { 
        data: winningProposal, 
        isLoading: isLoadingProposal,
        isError: isErrorProposal 
    } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: VOTING_ABI,
        functionName: 'getOneProposal',
        args: [winningProposalId as bigint],
        query: {
            enabled: !!winningProposalId,
        },
    });

    return {
        winningProposalId: winningProposalId as bigint,
        winningProposal: winningProposal as { description: string; voteCount: bigint },
        isLoading: isLoadingId || isLoadingProposal,
        isError: isErrorId || isErrorProposal,
    };
}
