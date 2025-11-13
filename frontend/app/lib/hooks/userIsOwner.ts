import { useAccount, useReadContract, useChainId } from "wagmi";
import VotingDAppABI from "../../../core/web3/abi/voting.abi.json";
import { CONTRACT_ADDRESS, CONTRACT_ADDRESS_MAP } from "../../../core/web3/contants";
import { addressbyChainIdAndEnv } from '../../../core/web3/utils';


export function userIsOwner(): boolean {
    const { address } = useAccount();
    const chainId = useChainId();
    const addressToLower = address?.toLowerCase();

    const { data: owner } = useReadContract({
        address: addressbyChainIdAndEnv(chainId as keyof typeof CONTRACT_ADDRESS_MAP),
        abi: VotingDAppABI,
        functionName: 'owner',
    });

    const ownerAddress = owner ? owner.toString().toLowerCase() : null;

    return addressToLower === ownerAddress;
}