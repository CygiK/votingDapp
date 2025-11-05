
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { DesktopIcon } from "@radix-ui/react-icons"
import { useReadContract } from "wagmi";

import VotingDAppABI from "../../../core/web3/abi/voting.abi.json";
import { CONTRACT_ADDRESS } from "../../../core/web3/contants";

const votingStatus: Record<string, string> = {
    '0': "Registering Voters",
    '1': "Proposals Registration Started",
    '2': "Proposals Registration Ended",
    '3': "Voting Session Started",
    '4': "Voting Session Ended",
    '5': "Votes Tallied"
}

export default function StatusBanner(): React.ReactNode {
    const {data: getWorkflowStatus, fetchStatus: fetchWorkflowStatus} = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: VotingDAppABI,
        functionName: 'getWorkflowStatus',
    })
    
    return  (
        <Alert variant={"default"}>
            <DesktopIcon />
            <AlertTitle>Vote Status !</AlertTitle>
            <AlertDescription>
                nous en somme à l'étape : {votingStatus[getWorkflowStatus?.toString() || '0'] || 'no data'}.
                <br />
            </AlertDescription>
        </Alert>)
}

