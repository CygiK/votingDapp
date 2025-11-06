import { Results as ResultsComponent } from "~/components/shared/results";
import StatusBanner from "~/components/shared/statusBanner";

// page a supprimer

/**
 * Page publique pour afficher les résultats du vote
 * Accessible à tous (votants et non-votants)
 */
export default function Results() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Résultats du Vote</h1>
            
            <StatusBanner />
            
            <ResultsComponent />
        </div>
    );
}