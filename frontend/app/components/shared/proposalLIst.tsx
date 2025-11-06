import { useReadContract } from 'wagmi';
import { CONTRACT_ADDRESS, VOTING_ABI } from '../../../core/web3/contants';
import * as React from "react";
import { Card, CardContent } from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import { useGetProposal } from '~/lib/hooks';

type Proposal = {
    description: string;
    voteCount: bigint;
};

/**
 * Composant pour afficher une proposition individuelle
 */
function ProposalItem({ proposalId }: { proposalId: bigint }) {
    const { data: proposal, isLoading, error } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: VOTING_ABI,
        functionName: 'getOneProposal',
        args: [proposalId],
    });

    console.log(`📝 Proposition #${proposalId}:`, proposal);

    if (isLoading) {
        return (
            <Card>
                <CardContent className="p-4">
                    <div className="animate-pulse flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="border-red-200">
                <CardContent className="p-4">
                    <p className="text-red-600 text-sm">
                        ❌ Erreur lors du chargement de la proposition #{proposalId.toString()}
                    </p>
                </CardContent>
            </Card>
        );
    }

    if (!proposal) {
        return null;
    }

    const { description, voteCount } = proposal as Proposal;

    return (
        <Card className="hover:shadow-md transition-all">
            <CardContent className="p-4">
                <div className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-700 rounded-full font-bold text-sm shrink-0">
                        #{proposalId.toString()}
                    </span>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 wrap-break-word">
                            {description}
                        </h3>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">
                                🗳️ {voteCount.toString()} vote(s)
                            </span>
                            {Number(voteCount) > 0 && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                    ✓ A des votes
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

/**
 * Composant pour afficher la liste complète des propositions
 * Utilise les logs pour récupérer les IDs et useReadContract pour les détails
 */
export function ProposalList() {
    const { logs, isLoading, refetch, proposalCount } = useGetProposal();

    console.log("📄 ProposalList - logs:", logs);
    console.log("� Nombre de propositions:", proposalCount);

    if (isLoading) {
        return (
            <Alert className="bg-blue-50">
                <AlertDescription className="flex items-center gap-2">
                    <span className="animate-spin">⏳</span>
                    Chargement des propositions...
                </AlertDescription>
            </Alert>
        );
    }

    if (logs.length === 0) {
        return (
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">📋 Liste des Propositions</h2>
                </div>
                <Alert>
                    <AlertDescription className="flex items-center justify-between">
                        <span>📝 Aucune proposition n'a encore été soumise.</span>
                        <Button variant="outline" size="sm" onClick={refetch}>
                            🔄 Rafraîchir
                        </Button>
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">📋 Liste des Propositions</h2>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                        {proposalCount} proposition(s)
                    </span>
                    <Button variant="outline" size="sm" onClick={refetch}>
                        🔄 Rafraîchir
                    </Button>
                </div>
            </div>
            
            <div className="space-y-3">
                {logs.map((log: any, index: number) => {
                    const proposalId = log.args?.proposalId;
                    
                    if (!proposalId && proposalId !== 0n) {
                        console.warn("⚠️ Log sans proposalId:", log);
                        return null;
                    }

                    return (
                        <ProposalItem 
                            key={`${log.transactionHash}-${index}`} 
                            proposalId={proposalId} 
                        />
                    );
                })}
            </div>
        </div>
    );
}
