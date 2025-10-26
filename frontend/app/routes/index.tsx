import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
    return [
        { title: "Voting DApp" },
        { name: "description", content: "Welcome to the Voting DApp! alyra project" },
    ];
}

export default function Index() {
    return <>
    <h1 className="text-2xl font-bold">
        Bienvenue sur la DApp de vote
    </h1>
    <p className="mt-4">
        Veuillez vous connecter pour commencer à utiliser l'application de vote décentralisée.
    </p>
    </>;
}