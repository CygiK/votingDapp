'use client';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAccount } from "wagmi";
import StatusBanner from "~/components/shared/statusBanner";
import { userIsVoter, userIsOwner } from "~/lib/hooks";

export default function Layout(): React.ReactNode | Response {
    // a modifier trouver un meilleur moyen pour rediriger si pas connecté
    const { isConnected } = useAccount();
    const navigate = useNavigate();

    const { isVoter } = userIsVoter();
    const isOwner = userIsOwner();


    useEffect(() => {
        console.log("isOwner", isOwner);
        console.log("isVoter", isVoter);
        console.log("isConnected", isConnected);

        if (!isConnected) {
            navigate('/', { replace: true });
        }

        if(isConnected && isOwner) {
            navigate('/admin', { replace: true });
        }

        if(isConnected && isVoter && !isOwner) {
            navigate('/voter', { replace: true });
        }

        // if(isConnected && !isVoter ) {
        //     navigate('/results', { replace: true });
        // }
    }, [isConnected, navigate]);

    useEffect(() => {
        console.log("isConnected", isConnected);
    }, [isConnected]);
    // ----------------------------------------------------- fin a modifier

    return (
        <>
            <header className="p-4 border-b border-gray-300 shadow flex justify-between items-center mb-2">
                <h1 className="text-xl font-bold">Voting DApp</h1>
                <ConnectButton />
            </header>
            <div className="flex space-x-4 px-4 mb-4">
                {isConnected && <StatusBanner />}
            </div>
            <main className="p-4 min-h-[80vh] scroll-auto">
                <Outlet />
            </main>
            <footer className="p-4 border-t border-gray-300 text-center text-sm text-gray-600 mt-4">
                &copy; {new Date().getFullYear()} Voting DApp. All rights reserved.
            </footer>
        </>
    );
}