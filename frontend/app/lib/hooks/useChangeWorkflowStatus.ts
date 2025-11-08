import { VOTING_ABI, CONTRACT_ADDRESS, WORKFLOW_STEP_NAME } from '../../../core/web3/contants'

import { useWriteContract, useAccount, useWaitForTransactionReceipt, useWatchContractEvent } from 'wagmi'
import { publicClient } from '../../../core/web3/client'
import  * as React from 'react'
import { parseAbiItem } from 'viem';

export function useChangeWorkflowStatus() {
    const [logs, setLogs] = React.useState<any[]>([]);

    const getEvent = React.useCallback(async () => {
        console.log("Fetching logs...");
        const event = await publicClient.getLogs({
            address: CONTRACT_ADDRESS,
            event: parseAbiItem('event WorkflowStatusChange(uint8 previousStatus, uint8 newStatus)'),
            fromBlock: 0n,
            toBlock: 'latest',

        });

        setLogs(event.map(log => ({
            oldValue: Number(log.args.previousStatus) ?? 0,
            newValue: Number(log.args.newStatus) ?? 0,
            blockNumber: log.blockNumber,
            args: log.args
        })));
    }, []);

    const {data: hash, writeContract, isPending} = useWriteContract();
    const { address } = useAccount();
    
    // Attendre la confirmation de la transaction
    const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    // Rafraîchir les événements après confirmation de la transaction
    React.useEffect(() => {
        console.log("isConfirmed changed:", isConfirmed);
        if (isConfirmed) {
            console.log("Transaction confirmed, refreshing events...");
            getEvent();
        }
    }, [isConfirmed]);

    // pas justifié !!!
    // Écouter les événements WorkflowStatusChange en temps réel
    // useWatchContractEvent({
    //     address: CONTRACT_ADDRESS,
    //     abi: VOTING_ABI,
    //     eventName: 'WorkflowStatusChange',
    // });

    function changeWorkflowStatus () {
        writeContract({
            address: CONTRACT_ADDRESS,
            abi: VOTING_ABI,
            functionName: WORKFLOW_STEP_NAME[logs.length + 1],
            account: address,
        });
    }

    return { 
        getEvent, 
        logs, 
        changeWorkflowStatus, 
        isPending,
        isConfirmed,
        currentStatus: {
            stepName: WORKFLOW_STEP_NAME[logs.length], 
            stepNumber: logs.length, 
            nextStepName: WORKFLOW_STEP_NAME[logs.length + 1]
        } 
    };
}