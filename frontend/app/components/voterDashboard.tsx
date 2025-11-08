import * as React from "react";
import { AddProposals } from "./shared/addProposals";
import { ProposalList } from "./shared/proposalLIst";
import { Results } from "./shared/results";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { useWorkflowStatus, userIsOwner } from "~/lib/hooks";

/**
 * Dashboard pour les électeurs enregistrés
 * Affiche les fonctionnalités appropriées selon la phase du vote
 */
export function VoterDashboard(): React.ReactNode {
    const { status, currentPhase, getColorClasses, isRegisteringVoters, isProposalsRegistrationStarted, isProposalsRegistrationEnded, isVotingSessionStarted, isVotingSessionEnded, isVotesTallied } = useWorkflowStatus();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">
                    🗳️ Dashboard Électeur
                </h2>
                <p className="text-gray-600 mt-1">
                    Participez au processus de vote démocratique
                </p>
            </div>

            {/* Alerte d'information selon la phase */}
            <Alert className={`${getColorClasses(currentPhase.color).bg} ${getColorClasses(currentPhase.color).border}`}>
                <AlertTitle className={getColorClasses(currentPhase.color).text}>
                    {currentPhase.emoji} {currentPhase.name}
                </AlertTitle>
                <AlertDescription className={getColorClasses(currentPhase.color).text.replace('900', '800')}>
                    {currentPhase.voterDescription}
                </AlertDescription>
            </Alert>

            {/* Phase 0: Enregistrement des votants */}
            {isRegisteringVoters && (
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-gray-600 text-center py-8">
                            ⏳ Vous êtes enregistré en tant qu'électeur. Veuillez attendre que l'administrateur démarre l'enregistrement des propositions.
                        </p>
                    </CardContent>
                </Card>
            )}

            {/* Phase 1: Enregistrement des propositions */}
            {isProposalsRegistrationStarted && (
                <div className="space-y-4">
                    <Card className={getColorClasses('purple').border}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span>💡</span> Soumettre une Proposition
                            </CardTitle>
                            <CardDescription>
                                Proposez vos idées pour le vote
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <AddProposals />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span>📋</span> Propositions Soumises
                            </CardTitle>
                            <CardDescription>
                                Consultez toutes les propositions
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ProposalList />
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Phase 2: Propositions enregistrées, en attente du vote */}
            {isProposalsRegistrationEnded && (
                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span>📋</span> Propositions Enregistrées
                            </CardTitle>
                            <CardDescription>
                                En attente du début de la session de vote
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ProposalList />
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Phase 3: Session de vote active */}
            {isVotingSessionStarted && (
                <Card className={getColorClasses('green').border}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span>🗳️</span> Voter pour une Proposition
                        </CardTitle>
                        <CardDescription>
                            Choisissez votre proposition préférée
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ProposalList />
                        {/* <Vote /> */}
                    </CardContent>
                </Card>
            )}

            {/* Phase 4: Vote terminé, en attente du décompte */}
            {isVotingSessionEnded && (
                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span>📋</span> Propositions Votées
                            </CardTitle>
                            <CardDescription>
                                Le vote est terminé, en attente du décompte
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ProposalList />
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Phase 5: Résultats disponibles */}
            {isVotesTallied && (
                <Card className={getColorClasses('yellow').border}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span>🏆</span> Résultats du Vote
                        </CardTitle>
                        <CardDescription>
                            Découvrez la proposition gagnante
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Results />
                    </CardContent>
                </Card>
            )}
        </div>
    );
}