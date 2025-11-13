import { CONTRACT_ADDRESS_MAP } from "./contants";

export function addressbyChainIdAndEnv(chainId: keyof typeof CONTRACT_ADDRESS_MAP): `0x${string}` {
    const env = process.env.NODE_ENV;
    
    if (env === 'production') {
        return CONTRACT_ADDRESS_MAP[11155111 as keyof typeof CONTRACT_ADDRESS_MAP];
    }

    const address = CONTRACT_ADDRESS_MAP[chainId as keyof typeof CONTRACT_ADDRESS_MAP];
    if (!address) {
        throw new Error(`No contract address found for chain ID ${chainId}`);
    }
    
    return address;
}
