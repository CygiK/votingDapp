import { useReadContract, useWatchContractEvent, useChainId } from 'wagmi';
import { CONTRACT_ADDRESS, VOTING_ABI, CONTRACT_ADDRESS_MAP } from '../../../core/web3/contants';
import { addressbyChainIdAndEnv  } from '../../../core/web3/utils';
import * as React from "react";
import { Card, CardContent } from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import { useGetProposal, useWorkflowStatus, useVote, useGetVoterFromWhiteList } from '~/lib/hooks';

type Proposal = {
    description: string;
    voteCount: bigint;
};

function ProposalItem({ proposalId, isSelected, onClick }: { proposalId: bigint, isSelected: boolean, onClick: ({id, proposal}: {id: bigint, proposal: Proposal | {}}) => void }) {
    const chainId = useChainId();
    const { data: proposal, error } = useReadContract({
        address: addressbyChainIdAndEnv(chainId as keyof typeof CONTRACT_ADDRESS_MAP),
        abi: VOTING_ABI,
        functionName: 'getOneProposal',
        args: [proposalId],
    });

    console.log("🚀 ProposalItem proposal data:", proposal, "error:", error);

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
        <Card onClick={() => onClick({ id: proposalId, proposal })} className={`hover:shadow-md transition-all ${isSelected ? 'bg-blue-100' : ''}`}>
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

export function ProposalList() {
    const { logs: proposalLogs, refetch, proposalCount } = useGetProposal();
    const chainId = useChainId();
    const [selectedProposal, setSelectedProposal] = React.useState<{ id: bigint, proposal: Proposal | {}} | null>(null);
    const { isVotingSessionStarted } = useWorkflowStatus();
    const { vote} = useVote();
    const voter = useGetVoterFromWhiteList();
    
    useWatchContractEvent({
        address: addressbyChainIdAndEnv(chainId as keyof typeof CONTRACT_ADDRESS_MAP),
        abi: VOTING_ABI,
        eventName: 'ProposalRegistered',
        onLogs(logs){
            const latestLog = logs[logs.length - 1] as any;
            const currentLatestLog = proposalLogs[proposalLogs.length - 1] as any;
            
            if (latestLog?.args?.proposalId !== currentLatestLog?.args?.proposalId) {
                refetch();
            }
        },
    });

    React.useEffect(() => {
        if(voter?.hasVoted) {
            setSelectedProposal({ id: voter?.votedProposalId, proposal: {} });
        }
    }, []);

    if (proposalLogs.length === 0) {
        return (
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">📋 Liste des Propositions</h2>
                </div>
                <Alert>
                    <AlertDescription className="flex items-center justify-between">
                        <span>📝 Aucune proposition n'a encore été soumise.</span>
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
                </div>
            </div>
            
            <div className="space-y-3">
                {proposalLogs.map((log: any, index: number) => {
                    const proposalId = log.args?.proposalId;
                    
                    if (!proposalId && proposalId !== 0n) {
                        console.warn("⚠️ Log sans proposalId:", log);
                        return null;
                    }
                    { console.log("🚀 Rendering ProposalItem for proposalId:", proposalId, selectedProposal?.id, voter); }

                    return (
                        <ProposalItem 
                            key={`${log.transactionHash}-${index}`} 
                            proposalId={proposalId}
                            onClick={({ id, proposal }) => voter?.hasVoted ? null : setSelectedProposal({ id, proposal })}
                            isSelected={selectedProposal?.id === proposalId}
                        />
                    );
                })}
            </div>
            {isVotingSessionStarted && 
            <>
                <div>Vous avez selectionner la proposition {selectedProposal?.id.toString()}.
                    <div>{selectedProposal && 'description' in selectedProposal.proposal ? selectedProposal.proposal.description : ''}</div>
                </div> 
                <Button 
                    disabled={!selectedProposal || voter?.hasVoted}
                    onClick={() => selectedProposal?.id && vote(selectedProposal?.id)}
                    >Validate Vote</Button>
            </>}
        </div>
    );
}
