import * as React from "react";
import { WorkflowStatusManagement } from "./workflowStatusManagement";
import { AddProposals } from "./shared/addProposals";
import { ProposalList } from "./shared/proposalLIst";
import { AddVoter } from "./shared/addvoter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { useWorkflowStatus } from "~/lib/hooks";

/**
 * Dashboard Administrateur
 * Interface complète pour gérer le processus de vote
 */
export function AdminDashboard(): React.ReactNode {
    const { status, currentPhase, getColorClasses } = useWorkflowStatus();

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
            {status === 0 && (
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

            {/* Section Propositions - visible en phase 1+ */}
            {status >= 1 && (
                <div className="space-y-4">
                    {/* Ajout de propositions - visible en phase 1 */}
                    {status === 1 && (
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

            {/* Guide des actions selon la phase */}
            <Card className="bg-gray-50">
                <CardHeader>
                    <CardTitle className="text-base">ℹ️ Actions Disponibles</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-sm space-y-2">
                        {status === 0 && (
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                <li>Ajoutez tous les électeurs nécessaires</li>
                                <li>Vérifiez les adresses avant de continuer</li>
                                <li>Cliquez sur "Passer à : startProposalsRegistering" pour commencer</li>
                            </ul>
                        )}
                        {status === 1 && (
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                <li>Les électeurs peuvent soumettre leurs propositions</li>
                                <li>Vous pouvez aussi ajouter des propositions</li>
                                <li>Une fois toutes les propositions reçues, terminez cette phase</li>
                            </ul>
                        )}
                        {status === 2 && (
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                <li>Vérifiez la liste des propositions</li>
                                <li>Assurez-vous que tout est correct</li>
                                <li>Démarrez la session de vote quand vous êtes prêt</li>
                            </ul>
                        )}
                        {status === 3 && (
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                <li>Les électeurs peuvent maintenant voter</li>
                                <li>Attendez que tous aient voté</li>
                                <li>Terminez la session de vote pour passer au décompte</li>
                            </ul>
                        )}
                        {status === 4 && (
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                <li>Le vote est terminé</li>
                                <li>Cliquez sur "tallyVotes" pour comptabiliser</li>
                                <li>Le gagnant sera déterminé automatiquement</li>
                            </ul>
                        )}
                        {status === 5 && (
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                <li>Le processus est terminé ✅</li>
                                <li>Les résultats sont disponibles sur la page dédiée</li>
                                <li>Un nouveau vote nécessite un nouveau déploiement du contrat</li>
                            </ul>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}