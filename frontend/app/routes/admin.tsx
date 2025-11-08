import { AdminDashboard } from "~/components/adminDashboard";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { useAccount } from "wagmi";
import { userIsOwner, userIsVoter } from "~/lib/hooks";

export default function Admin() {
    const { isConnected } = useAccount();
    const isOwner = userIsOwner();

    if (!isConnected) {
        return (
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">Espace Administrateur</h1>
                {!isConnected && (
                    <Alert variant="destructive">
                        <AlertTitle>⚠️ Wallet non connecté</AlertTitle>
                        <AlertDescription>
                            Veuillez connecter votre wallet pour accéder à l'espace électeur.
                        </AlertDescription>
                    </Alert>
                )}
            </div>
        );
    }

    if (!isOwner) {
        return (
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">Espace Administrateur</h1>
                <Alert variant="destructive">
                    <AlertTitle>❌ Accès refusé</AlertTitle>
                    <AlertDescription>
                        Vous n'êtes pas enregistré en tant qu'administrateur.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div>
            <AdminDashboard />
        </div>
    );
}
