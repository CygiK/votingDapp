import { createPublicClient, http } from "viem";
import { sepolia, hardhat } from "viem/chains";

export const publicClient = createPublicClient({
    chain: sepolia,
    transport: http('https://sepolia.infura.io/v3/9669721cbaeb428f866a74b2f6aa2793'),
});
