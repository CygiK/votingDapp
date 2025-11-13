import { useReadContract, useAccount, useChainId } from "wagmi";
import { CONTRACT_ADDRESS, VOTING_ABI, CONTRACT_ADDRESS_MAP } from "../../../core/web3/contants";
import { addressbyChainIdAndEnv } from '../../../core/web3/utils';

export function userIsVoter(): { isVoter: boolean  } {
    const { address } = useAccount();
    const chainId = useChainId();
    const { data: voter } = useReadContract({
        address: addressbyChainIdAndEnv(chainId as keyof typeof CONTRACT_ADDRESS_MAP),
        abi: VOTING_ABI,
        functionName: 'getVoter',
        args: [address],

    });

	return { isVoter: Boolean(voter) };
}