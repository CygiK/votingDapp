import { CONTRACT_ADDRESS, VOTING_ABI } from '../../../core/web3/contants';
import { usePublicClient } from 'wagmi';
import * as React from 'react';
import { parseAbiItem } from 'viem';
import { publicClient } from '../../../core/web3/client';

/**
 * Hook simple pour récupérer les logs de l'événement ProposalRegistered
 * Retourne la liste des IDs de propositions enregistrées
 */
export function useGetProposal() {
    const [logs, setLogs] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const fetchLogs = React.useCallback(async () => {
        if (!publicClient) {
            console.log("⚠️ Public client not available");
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            console.log("🔍 Fetching ProposalRegistered logs...");
            console.log("📍 Contract:", CONTRACT_ADDRESS);
            
            // Use the full ABI instead of parseAbiItem for better type safety
            const logs = await publicClient.getLogs({
                address: CONTRACT_ADDRESS,
                event: parseAbiItem('event ProposalRegistered(uint256 proposalId)'),
                fromBlock: 0n,
                toBlock: 'latest'
            });

            console.log("✅ Logs retrieved:", logs.length);
            console.log("📋 Details:", logs);
            
            setLogs(logs);
        } catch (error) {
            console.error("❌ Error fetching logs:", error);
            console.error("Stack trace:", error instanceof Error ? error.stack : 'Unknown error');
            setLogs([]);
        } finally {
            setIsLoading(false);
        }
    }, [publicClient]);

    // Charger au montage
    React.useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    console.log("📊 useGetProposal - logs:", logs, "isLoading:", isLoading);

    return { 
        logs, 
        isLoading, 
        refetch: fetchLogs,
        proposalCount: logs.length 
    };
}