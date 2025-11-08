import * as React from "react";
import { useReadContract } from 'wagmi';
import { CONTRACT_ADDRESS, VOTING_ABI } from '../../../core/web3/contants';
import { useGetWinner, useGetProposal } from "~/lib/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Separator } from "../ui/separator";


/**
 * Composant pour afficher les résultats du vote
 * Accessible à tous les utilisateurs (votants et non-votants)
 * Affiche la proposition gagnante et les statistiques de vote
 */
export function Results(): React.ReactNode {
    const { winningProposalId, winningProposal, isLoading, isError } = useGetWinner();
    const { logs } = useGetProposal();
    
    // Récupère le statut du workflow
    const { data: workflowStatus } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: VOTING_ABI,
        functionName: 'getWorkflowStatus',
    });

    const isVotesTallied = workflowStatus === 5; // VotesTallied

    if (!isVotesTallied) {
        return (
            <Alert>
                <AlertTitle>⏳ Résultats non disponibles</AlertTitle>
                <AlertDescription>
                    Les votes n'ont pas encore été comptabilisés. Veuillez attendre que l'administrateur finalise le décompte.
                </AlertDescription>
            </Alert>
        );
    }

    if (isLoading) {
        return <p>Chargement des résultats...</p>;
    }

    if (isError) {
        return (
            <Alert variant="destructive">
                <AlertTitle>❌ Erreur</AlertTitle>
                <AlertDescription>
                    Impossible de charger les résultats. Veuillez réessayer.
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">🏆 Résultats du Vote</h2>
            
            {winningProposal && (
                <Card className="border-green-500 border-2 bg-green-50">
                    <CardHeader>
                        <CardTitle className="text-2xl text-green-700">
                            🎉 Proposition Gagnante
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-600">Proposition #{winningProposalId?.toString()}</p>
                            <p className="text-xl font-semibold mt-2">{winningProposal.description}</p>
                        </div>
                        <Separator />
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-green-700">
                                {winningProposal.voteCount?.toString()} vote(s)
                            </span>
                            <span className="text-gray-600">
                                • {logs.length > 0 ? Math.round((Number(winningProposal.voteCount) / logs.length) * 100) : 0}% des propositions
                            </span>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
