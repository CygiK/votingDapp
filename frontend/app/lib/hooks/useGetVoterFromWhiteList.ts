import { VOTING_ABI, CONTRACT_ADDRESS, WORKFLOW_STEP_NAME } from '../../../core/web3/contants'

import { useWriteContract, useAccount, useWaitForTransactionReceipt } from 'wagmi'
import { publicClient } from '../../../core/web3/client'
import  * as React from 'react'
import { parseAbiItem } from 'viem';

export function useChangeWorkflowStatus() {
    const [logs, setLogs] = React.useState<any[]>([]);

    const getEvent = async () => {
        console.log("Fetching logs...");
        const event = await publicClient.getLogs({
            address: CONTRACT_ADDRESS,
            event: parseAbiItem('event WorkflowStatusChange(uint8 previousStatus, uint8 newStatus)'),
            fromBlock: 0n,
            toBlock: 'latest',

        });

        console.log("Fetched logs:", event);

        setLogs(event.map(log => ({
            oldValue: Number(log.args.previousStatus) ?? 0,
            newValue: Number(log.args.newStatus) ?? 0
        })));
    }

    const {data: hash, writeContract} = useWriteContract();
    const { address } = useAccount();

    function changeWorkflowStatus () {
        // getEvent();
        writeContract({
            address: CONTRACT_ADDRESS,
            abi: VOTING_ABI,
            functionName: WORKFLOW_STEP_NAME[logs.length + 1],
            account: address,
        });
    }

    return { getEvent, logs, changeWorkflowStatus, currentStatus: {stepName: WORKFLOW_STEP_NAME[logs.length], stepNumber: logs.length, nextStepName: WORKFLOW_STEP_NAME[logs.length + 1]} };
}