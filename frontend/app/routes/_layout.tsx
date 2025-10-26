import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Outlet } from "react-router";

export default function Layout() {
    return (
        <>
            <header className="p-4 border-b border-gray-300 shadow flex justify-between items-center mb-2">
                <h1 className="text-xl font-bold">Voting DApp</h1>
                <ConnectButton />
            </header>
            <main className="p-4 min-h-[80vh] scroll-auto">
                <Outlet />
            </main>
            <footer className="p-4 border-t border-gray-300 text-center text-sm text-gray-600 mt-4">
                &copy; {new Date().getFullYear()} Voting DApp. All rights reserved.
            </footer>
        </>
    );
}