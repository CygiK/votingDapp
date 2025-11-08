import { CONTRACT_ADDRESS } from '../../../core/web3/contants';
import * as React from 'react';
import { parseAbiItem } from 'viem';
import { publicClient } from '../../../core/web3/client';

export function useGetProposal() {
    const [logs, setLogs] = React.useState<any[]>([]);
    // const [isLoading, setIsLoading] = React.useState(true);

    const fetchLogs = React.useCallback(async () => {
        if (!publicClient) {
            // setIsLoading(false);
            return;
        }

        try {
            const logs = await publicClient.getLogs({
                address: CONTRACT_ADDRESS,
                event: parseAbiItem('event ProposalRegistered(uint256 proposalId)'),
                fromBlock: 0n,
                toBlock: 'latest'
            });
            
            setLogs(logs);
        } catch (error) {
            setLogs([]);
        }
    }, [publicClient]);

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