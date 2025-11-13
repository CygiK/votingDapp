import { CONTRACT_ADDRESS, CONTRACT_ADDRESS_MAP } from '../../../core/web3/contants';
import * as React from 'react';
import { parseAbiItem } from 'viem';
import { getPublicClient } from '../../../core/web3/client';
import { useChainId } from 'wagmi';

export function useGetProposal() {
    const [logs, setLogs] = React.useState<any[]>([]);
    const chainId = useChainId();
    const fetchLogs = React.useCallback(async () => {
        const publicClient = getPublicClient(chainId);
        if (!publicClient) {
            return;
        }

        try {
            const logs = await publicClient.getLogs({
                address: CONTRACT_ADDRESS_MAP[chainId as keyof typeof CONTRACT_ADDRESS_MAP],
                event: parseAbiItem('event ProposalRegistered(uint256 proposalId)'),
                fromBlock: 0n,
                toBlock: 'latest'
            });
            
            setLogs(logs);
        } catch (error) {
            setLogs([]);
        }
    }, [getPublicClient, chainId]);

    // Charger au montage
    React.useEffect(() => {
        fetchLogs();
    }, []);

    return { 
        logs, 
        // isLoading, 
        refetch: fetchLogs,
        proposalCount: logs.length 
    };
}