import * as React from "react";
import { WorkflowStatusManagement } from "./workflowStatusManagement";
import { AddProposals } from "./shared/addProposals";
import { ProposalList } from "./shared/proposalLIst";
import { AddVoter } from "./shared/addvoter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { useWorkflowStatus } from "~/lib/hooks";
import { useAccount } from "wagmi";
import { Results } from "./shared/results";

/**
 * Dashboard Administrateur
 * Interface complète pour gérer le processus de vote
 */
export function AdminDashboard(): React.ReactNode {
    const { status, currentPhase, getColorClasses, isProposalsRegistrationStarted, isRegisteringVoters, isVotesTallied } = useWorkflowStatus();
    const { isConnected } = useAccount();

    if(!isConnected) {
        return (
            <Alert variant="destructive">
                <AlertTitle>❌ Non Connecté</AlertTitle>
                <AlertDescription>
                    Veuillez vous connecter avec votre portefeuille pour accéder au tableau de bord administrateur.
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="space-y-6">
            {/* En-tête */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900">
                    👑 Tableau de Bord Administrateur
                </h2>
                <p className="text-gray-600 mt-1">
                    Gérez le processus de vote de bout en bout
                </p>
            </div>

            {/* Alerte d'information selon la phase */}
            <Alert className={`${getColorClasses(currentPhase.color).bg} ${getColorClasses(currentPhase.color).border}`}>
                <AlertTitle className={getColorClasses(currentPhase.color).text}>
                    {currentPhase.emoji} {currentPhase.name}
                </AlertTitle>
                <AlertDescription className={getColorClasses(currentPhase.color).text.replace('900', '800')}>
                    {currentPhase.adminDescription}
                </AlertDescription>
            </Alert>

            {/* Gestion du Workflow */}
            <WorkflowStatusManagement />

            <Separator className="my-6" />

            {/* Section Gestion des Électeurs - visible en phase 0 */}
            {isRegisteringVoters && (
                <Card className={getColorClasses('blue').border}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span>👥</span> Gestion des Électeurs
                        </CardTitle>
                        <CardDescription>
                            Ajoutez les adresses des électeurs qui pourront participer au vote
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <AddVoter />
                    </CardContent>
                </Card>
            )}

            <Separator className="my-6" />

            {/* Section Résultats - visible en phase 5 */}
            {isVotesTallied && (
                <Results />
            )}

            <Separator className="my-6" />

            {/* Section Propositions - visible en phase 1+ */}
            {status >= 1 && (
                <div className="space-y-4">
                    {/* Ajout de propositions - visible en phase 1 */}
                    {isProposalsRegistrationStarted && (
                        <Card className={getColorClasses('purple').border}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <span>💡</span> Ajouter une Proposition
                                </CardTitle>
                                <CardDescription>
                                    En tant qu'administrateur, vous pouvez également soumettre des propositions
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <AddProposals />
                            </CardContent>
                        </Card>
                    )}

                    {/* Liste des propositions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span>📋</span> Liste des Propositions
                            </CardTitle>
                            <CardDescription>
                                Consultez toutes les propositions soumises par les électeurs
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ProposalList />
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}