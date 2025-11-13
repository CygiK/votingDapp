import { useReadContract, useChainId } from 'wagmi';
import { CONTRACT_ADDRESS, VOTING_ABI, CONTRACT_ADDRESS_MAP } from '../../../core/web3/contants';
import { addressbyChainIdAndEnv } from '../../../core/web3/utils';

export function useGetWinner() {
    // Récupère l'ID de la proposition gagnante
    const chainId = useChainId();
    const { 
        data: winningProposalId, 
        isLoading: isLoadingId,
        isError: isErrorId 
    } = useReadContract({
        address: addressbyChainIdAndEnv(chainId as keyof typeof CONTRACT_ADDRESS_MAP),
        abi: VOTING_ABI,
        functionName: 'winningProposalID',
    });

    // Récupère les détails de la proposition gagnante
    const { 
        data: winningProposal, 
        isLoading: isLoadingProposal,
        isError: isErrorProposal 
    } = useReadContract({
        address: addressbyChainIdAndEnv(chainId as keyof typeof CONTRACT_ADDRESS_MAP),
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
