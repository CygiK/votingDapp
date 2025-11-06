import * as React from "react";
import { useReadContracts, useAccount } from 'wagmi';
import { CONTRACT_ADDRESS, VOTING_ABI } from '../../../core/web3/contants';
import { useGetProposal, useVote } from "~/lib/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";

/**
 * Composant permettant aux électeurs de voter pour une proposition
 * Affiche la liste des propositions avec leurs votes et permet de voter
 */
export function Vote(): React.ReactNode {
    const { logs } = useGetProposal();
    const { vote, isPending, isConfirming, isConfirmed } = useVote();
    const { address } = useAccount();
    const [proposals, setProposals] = React.useState<any[]>([]);
    const [hasVoted, setHasVoted] = React.useState(false);
    const [votedProposalId, setVotedProposalId] = React.useState<bigint | null>(null);

    // Récupère toutes les propositions
    const proposalCalls = logs.map(log => ({
        address: CONTRACT_ADDRESS,
        abi: VOTING_ABI as any,
        functionName: 'getOneProposal' as const,
        args: [log.args.proposalId],
    }));

    const { data: proposalsData } = useReadContracts({
        contracts: proposalCalls as any,
    });

    // Récupère les informations du votant
    const { data: voterData } = useReadContracts({
        contracts: [{
            address: CONTRACT_ADDRESS,
            abi: VOTING_ABI as any,
            functionName: 'getVoter' as const,
            args: [address],
        }] as any,
    });

    React.useEffect(() => {
        if (proposalsData) {
            setProposals(proposalsData as any[]);
        }
    }, [proposalsData]);

    React.useEffect(() => {
        if (voterData && voterData[0]?.result) {
            const voter = voterData[0].result as any;
            setHasVoted(voter.hasVoted);
            setVotedProposalId(voter.votedProposalId);
        }
    }, [voterData]);

    /**
     * Gère le vote pour une proposition
     * 
     * @param proposalId - ID de la proposition
     */
    const handleVote = (proposalId: bigint) => {
        if (!hasVoted && !isPending) {
            vote(proposalId);
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Voter pour une proposition</h2>
            
            {isConfirmed && (
                <Alert>
                    <AlertDescription>
                        ✅ Votre vote a été enregistré avec succès !
                    </AlertDescription>
                </Alert>
            )}

            {hasVoted && !isConfirmed && (
                <Alert>
                    <AlertDescription>
                        Vous avez déjà voté pour la proposition #{votedProposalId?.toString()}
                    </AlertDescription>
                </Alert>
            )}

            {proposals.length === 0 ? (
                <p>Aucune proposition disponible pour le moment.</p>
            ) : (
                <div className="grid gap-4">
                    {proposals.map(({ result }, index) => {
                        const proposalId = logs[index]?.args.proposalId;
                        const isVotedProposal = votedProposalId === proposalId;
                        
                        return (
                            <Card key={index} className={isVotedProposal ? "border-green-500 border-2" : ""}>
                                <CardHeader>
                                    <CardTitle className="flex justify-between items-center">
                                        <span>Proposition #{proposalId?.toString()}</span>
                                        <span className="text-sm font-normal">
                                            {result?.voteCount?.toString() || '0'} vote(s)
                                        </span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-lg">{result?.description}</p>
                                    <Button 
                                        onClick={() => handleVote(proposalId)}
                                        disabled={hasVoted || isPending || isConfirming}
                                        className="w-full"
                                    >
                                        {isPending || isConfirming 
                                            ? 'Vote en cours...' 
                                            : hasVoted 
                                                ? 'Déjà voté' 
                                                : 'Voter'}
                                    </Button>
                                    {isVotedProposal && (
                                        <p className="text-green-600 font-medium">✓ Vous avez voté pour cette proposition</p>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
