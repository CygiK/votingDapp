import { VoterDashboard } from "~/components/voterDashboard";
import { userIsVoter, userIsOwner } from "~/lib/hooks";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { useAccount } from "wagmi";

/**
 * Page dédiée aux électeurs enregistrés
 * Affiche le dashboard avec les fonctionnalités de vote
 */
export default function Voter() {
    const { isConnected } = useAccount();
    const { isVoter } = userIsVoter();

    if (!isConnected) {
        return (
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">Espace Électeur</h1>
                <Alert variant="destructive">
                    <AlertTitle>⚠️ Wallet non connecté</AlertTitle>
                    <AlertDescription>
                        Veuillez connecter votre wallet pour accéder à l'espace électeur.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    if (!isVoter) {
        return (
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">Espace Électeur</h1>
                <Alert variant="destructive">
                    <AlertTitle>❌ Accès refusé</AlertTitle>
                    <AlertDescription>
                        Vous n'êtes pas enregistré en tant qu'électeur. Contactez l'administrateur pour être ajouté à la liste blanche.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <VoterDashboard />
        </div>
    );
}
