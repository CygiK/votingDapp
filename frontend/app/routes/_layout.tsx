'use client';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link, Outlet, useLocation } from "react-router";
import { useAccount } from "wagmi";
import { userIsVoter, userIsOwner } from "~/lib/hooks";

/**
 * Layout principal de l'application
 * Gère la navigation et affiche le header/footer
 */
export default function Layout(): React.ReactNode {
    const { isConnected } = useAccount();
    const { isVoter } = userIsVoter();
    const isOwner = userIsOwner();
    const location = useLocation();

    console.log(isVoter);

    // Fonction pour déterminer si un lien est actif
    const isActive = (path: string) => {
        return location.pathname === path ? "border-b-2 border-blue-500 font-semibold" : "";
    };

    return (
        <>
            <header className="p-4 border-b border-gray-300 shadow">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold">Voting DApp</h1>
                    <ConnectButton />
                </div>
                
                {/* Navigation */}
                <nav className="flex space-x-6 text-sm">
                    <Link 
                        to="/" 
                        className={`hover:text-blue-600 transition-colors ${isActive("/")}`}
                    >
                        Accueil
                    </Link>
                    
                    {isConnected && isOwner && (
                        <Link 
                            to="/admin" 
                            className={`hover:text-blue-600 transition-colors ${isActive("/admin")}`}
                        >
                            Administration
                        </Link>
                    )}
                    
                    {isConnected && isVoter && !isOwner && (
                        <Link 
                            to="/voter" 
                            className={`hover:text-blue-600 transition-colors ${isActive("/voter")}`}
                        >
                            Espace Électeur
                        </Link>
                    )}
                    
                    {/* <Link 
                        to="/results" 
                        className={`hover:text-blue-600 transition-colors ${isActive("/results")}`}
                    >
                        Résultats
                    </Link> */}
                </nav>
            </header>
            
            <main className="p-6 min-h-[80vh] max-w-7xl mx-auto">
                <Outlet />
            </main>
            
            <footer className="p-4 border-t border-gray-300 text-center text-sm text-gray-600 mt-4">
                <p>&copy; {new Date().getFullYear()} Voting DApp. Tous droits réservés.</p>
                <p className="text-xs mt-1">Application décentralisée de vote sécurisé sur blockchain</p>
            </footer>
        </>
    );
}