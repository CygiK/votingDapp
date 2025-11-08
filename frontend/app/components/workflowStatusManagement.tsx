import { useChangeWorkflowStatus } from "~/lib/hooks";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { Separator } from "./ui/separator";
import React from "react";

/**
 * Composant de gestion du workflow de vote
 * Affiche l'état actuel et permet à l'administrateur de faire progresser le processus
 */
export function WorkflowStatusManagement(): React.ReactNode {
    const { getEvent, logs, changeWorkflowStatus, currentStatus, isPending, isConfirmed } = useChangeWorkflowStatus();

    // Charger les événements au montage
    React.useEffect(() => {
        getEvent();
    }, [getEvent]);

    // Rafraîchir après confirmation de transaction
    React.useEffect(() => {
        if (isConfirmed) {
            getEvent();
        }
    }, [isConfirmed, getEvent]);

    // Mapping des phases avec des emojis et couleurs
    const phaseInfo: Record<string, { emoji: string; color: string; description: string }> = {
        'RegisteringVoters': {
            emoji: '📝',
            color: 'bg-blue-50 border-blue-200',
            description: 'Enregistrement des électeurs dans la liste blanche'
        },
        'startProposalsRegistering': {
            emoji: '💡',
            color: 'bg-purple-50 border-purple-200',
            description: 'Les électeurs peuvent soumettre leurs propositions'
        },
        'endProposalsRegistering': {
            emoji: '📋',
            color: 'bg-indigo-50 border-indigo-200',
            description: 'Propositions enregistrées, préparation du vote'
        },
        'startVotingSession': {
            emoji: '🗳️',
            color: 'bg-green-50 border-green-200',
            description: 'Session de vote active, les électeurs peuvent voter'
        },
        'endVotingSession': {
            emoji: '⏱️',
            color: 'bg-orange-50 border-orange-200',
            description: 'Vote terminé, en attente de la comptabilisation'
        },
        'tallyVotes': {
            emoji: '🏆',
            color: 'bg-yellow-50 border-yellow-200',
            description: 'Votes comptabilisés, résultats disponibles'
        }
    };

    const currentPhase = phaseInfo[currentStatus.stepName] || { emoji: '⚙️', color: 'bg-gray-50 border-gray-200', description: 'État du workflow' };
    const nextPhase = phaseInfo[currentStatus.nextStepName] || { emoji: '➡️', color: '', description: '' };

    return (
        <div className="space-y-4">
            <Card className={`${currentPhase.color} border-2`}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                        <span className="text-2xl">{currentPhase.emoji}</span>
                        Gestion du Workflow
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                        {currentPhase.description}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* État actuel */}
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                        <div>
                            <p className="text-sm text-gray-600 font-medium">Phase actuelle</p>
                            <p className="text-lg font-bold text-gray-900 mt-1">
                                {currentPhase.emoji} {currentStatus.stepName}
                            </p>
                        </div>
                        {currentStatus.nextStepName && (
                            <div className="text-right">
                                <p className="text-sm text-gray-600 font-medium">Prochaine phase</p>
                                <p className="text-lg font-semibold text-blue-600 mt-1">
                                    {nextPhase.emoji} {currentStatus.nextStepName}
                                </p>
                            </div>
                        )}
                    </div>

                    <Separator />

                    {/* Bouton d'action */}
                    {currentStatus.nextStepName && (
                        <div className="flex flex-col gap-2">
                            <Button 
                                onClick={changeWorkflowStatus}
                                size="lg"
                                className="w-full text-base font-semibold"
                                disabled={isPending}
                            >
                                {isPending ? '⏳ Transaction en cours...' : `${nextPhase.emoji} Passer à : ${currentStatus.nextStepName}`}
                            </Button>
                            
                            {isConfirmed && (
                                <Alert className="bg-green-50 border-green-200">
                                    <AlertDescription className="text-sm text-green-800">
                                        ✅ Changement de phase effectué avec succès !
                                    </AlertDescription>
                                </Alert>
                            )}
                            
                            {nextPhase.description && !isPending && (
                                <Alert>
                                    <AlertDescription className="text-sm">
                                        <strong>Après cette action :</strong> {nextPhase.description}
                                    </AlertDescription>
                                </Alert>
                            )}
                        </div>
                    )}

                    {/* Historique des événements */}
                    {logs.length > 0 && (
                        <details className="mt-4">
                            <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                                📊 Historique des changements ({logs.length})
                            </summary>
                            <div className="mt-3 space-y-2 max-h-40 overflow-y-auto">
                                {logs.slice().reverse().map((log, index) => (
                                    <div 
                                        key={index} 
                                        className="text-xs p-2 bg-gray-50 rounded border border-gray-200"
                                    >
                                        <span className="font-mono text-gray-600">
                                            Bloc #{log.blockNumber?.toString() || 'N/A'}
                                        </span>
                                        <span className="mx-2">→</span>
                                        <span className="font-semibold text-gray-800">
                                            {log.args?.newStatus !== undefined 
                                                ? Object.keys(phaseInfo)[Number(log.args.newStatus)]
                                                : 'Changement de statut'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </details>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}