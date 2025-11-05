import { useAccount, useReadContract } from "wagmi";
import VotingDAppABI from "../../../core/web3/abi/voting.abi.json";
import { CONTRACT_ADDRESS } from "../../../core/web3/contants";


export function userIsOwner(): boolean {
    const { address } = useAccount();
    const addressToLower = address?.toLowerCase();

    const { data: owner } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: VotingDAppABI,
        functionName: 'owner',
    });

    const ownerAddress = owner ? owner.toString().toLowerCase() : null;

    return addressToLower === ownerAddress;
}