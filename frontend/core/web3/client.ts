import { createPublicClient, http } from "viem";
import { sepolia, hardhat } from "viem/chains";
import { SEPOLIA_RPC_URL } from "./contants";

export function getPublicClient(chainId: number = 31337) {
    const config = {
        11155111: {
            chain: sepolia,
            transport: http(SEPOLIA_RPC_URL),
        },
        31337: {
            chain: hardhat,
            transport: http(),
        },
    } as const;

    type ChainId = keyof typeof config;
    const publicClient = createPublicClient(config[chainId as ChainId]);

    return publicClient;
}
