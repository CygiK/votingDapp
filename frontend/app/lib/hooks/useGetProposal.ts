import {CONTRACT_ADDRESS, VOTING_ABI } from '../../../core/web3/contants'

import { publicClient } from '../../../core/web3/client'
import  * as React from 'react'
import { parseAbiItem } from 'viem';

export function useGetProposal() {
    const [logs, setLogs] = React.useState<any[]>([]);

    React.useEffect(() => {
        getEvent();
    }, []);

    const getEvent = async () => {
        console.log("Fetching logs...");
        const event = await publicClient.getLogs({
            address: CONTRACT_ADDRESS,
            event: parseAbiItem('event ProposalRegistered(uint256 proposalId)'),
            fromBlock: 0n,
            toBlock: 'latest',
        });

        console.log("Fetched logs:", event);

        setLogs(event);
    }

    console.log("logs in useGetProposal :", logs);

    return { getEvent, logs };
}