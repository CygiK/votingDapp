import type { MetaFunction } from "react-router";
import NotConnected from "~/components/notConnected";
import { userIsOwner } from "~/lib/hooks";
import { AdminDashboard } from "~/components/adminDashboard";
import { VoterDashboard } from "../components/voterDashboard";


const dashBoardToDisplay = (isOwner: boolean): React.ReactNode => {
    if (isOwner) {
        return <AdminDashboard />;
    }

    return <VoterDashboard />;
}

export const meta: MetaFunction = () => {
    return [
        { title: "Voting DApp" },
        { name: "description", content: "Welcome to the Voting DApp! alyra project" },
    ];
}
    
export default function Index() {
    const isOwner = userIsOwner();

    return (
        <>
            <h1 className="text-2xl font-bold">
                Bienvenue sur la DApp de vote
            </h1>

            {<NotConnected />}

        </>
    );
}