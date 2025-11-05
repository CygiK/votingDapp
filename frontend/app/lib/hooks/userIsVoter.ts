import { useReadContract, useAccount } from "wagmi";
import { CONTRACT_ADDRESS, VOTING_ABI,  } from "../../../core/web3/contants";

export function userIsVoter(): { isVoter: boolean  } {
    const { address } = useAccount();
    const { data: voter } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: VOTING_ABI,
        functionName: 'getVoter',
        account: address,

    });
    console.log("voter", Boolean(voter));


	return { isVoter: Boolean(voter) };
}