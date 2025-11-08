import { useReadContract } from 'wagmi';
import { CONTRACT_ADDRESS, VOTING_ABI } from '../../../core/web3/contants';

/**
 * Hook personnalisé pour gérer le statut du workflow
 * Fournit le statut actuel et les informations contextuelles
 */
export function useWorkflowStatus() {
    // Récupère le statut actuel du workflow
    const { data: workflowStatus, isLoading, isError, refetch } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: VOTING_ABI,
        functionName: 'getWorkflowStatus',
    });

    const status = Number(workflowStatus || 0);

    // WorkflowStatus enum:
    // 0: RegisteringVoters
    // 1: ProposalsRegistrationStarted
    // 2: ProposalsRegistrationEnded
    // 3: VotingSessionStarted
    // 4: VotingSessionEnded
    // 5: VotesTallied

    // Mapping des phases avec des informations contextuelles
    const phaseInfo: Record<number, { 
        name: string; 
        emoji: string; 
        color: string; 
        description: string;
        adminDescription?: string;
        voterDescription?: string;
    }> = {
        0: {
            name: 'RegisteringVoters',
            emoji: '📝',
            color: 'blue',
            description: 'Enregistrement des électeurs dans la liste blanche',
            adminDescription: 'Ajoutez les électeurs à la liste blanche. Une fois terminé, démarrez l\'enregistrement des propositions.',
            voterDescription: 'Vous êtes enregistré en tant qu\'électeur. Veuillez attendre que l\'administrateur démarre l\'enregistrement des propositions.'
        },
        1: {
            name: 'ProposalsRegistrationStarted',
            emoji: '💡',
            color: 'purple',
            description: 'Les électeurs peuvent soumettre leurs propositions',
            adminDescription: 'Les électeurs peuvent maintenant soumettre leurs propositions. Vous pouvez aussi en ajouter.',
            voterDescription: 'Vous pouvez maintenant soumettre vos propositions de vote.'
        },
        2: {
            name: 'ProposalsRegistrationEnded',
            emoji: '📋',
            color: 'indigo',
            description: 'Propositions enregistrées, préparation du vote',
            adminDescription: 'Toutes les propositions sont enregistrées. Démarrez la session de vote quand vous êtes prêt.',
            voterDescription: 'L\'enregistrement des propositions est terminé. En attente du début de la session de vote...'
        },
        3: {
            name: 'VotingSessionStarted',
            emoji: '🗳️',
            color: 'green',
            description: 'Session de vote active, les électeurs peuvent voter',
            adminDescription: 'La session de vote est active. Les électeurs peuvent voter pour leur proposition préférée.',
            voterDescription: 'La session de vote est ouverte ! Votez pour votre proposition préférée.'
        },
        4: {
            name: 'VotingSessionEnded',
            emoji: '⏱️',
            color: 'orange',
            description: 'Vote terminé, en attente de la comptabilisation',
            adminDescription: 'La session de vote est terminée. Comptabilisez les votes pour déterminer le gagnant.',
            voterDescription: 'Le vote est terminé. En attente du décompte des votes...'
        },
        5: {
            name: 'VotesTallied',
            emoji: '🏆',
            color: 'yellow',
            description: 'Votes comptabilisés, résultats disponibles',
            adminDescription: 'Le processus est terminé ! Les résultats sont disponibles sur la page Résultats.',
            voterDescription: 'Les votes ont été comptabilisés. Consultez les résultats !'
        }
    };

    const currentPhase = phaseInfo[status];

    // Fonction helper pour obtenir les classes Tailwind de couleur
    const getColorClasses = (color: string) => {
        const colorMap: Record<string, { bg: string; border: string; text: string }> = {
            blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-900' },
            purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-900' },
            indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-900' },
            green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-900' },
            orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-900' },
            yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-900' },
        };
        return colorMap[color] || colorMap.blue;
    };

    return {
        status,
        currentPhase,
        phaseInfo,
        isLoading,
        isError,
        refetch,
        getColorClasses,
        // Helpers pour vérifications rapides
        isRegisteringVoters: status === 0,
        isProposalsRegistrationStarted: status === 1,
        isProposalsRegistrationEnded: status === 2,
        isVotingSessionStarted: status === 3,
        isVotingSessionEnded: status === 4,
        isVotesTallied: status === 5,
    };
}
