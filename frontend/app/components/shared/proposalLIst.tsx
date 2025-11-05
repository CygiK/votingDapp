import { useGetProposal } from "~/lib/hooks";
import { useWriteContract, useAccount, useWaitForTransactionReceipt, useReadContract, useReadContracts } from 'wagmi';
import { CONTRACT_ADDRESS, VOTING_ABI } from '../../../core/web3/contants'
import * as React from "react";
import { Button } from "../ui/button";

// type Proposal = {
//     address: `0x${string}`;
//     abi: typeof VOTING_ABI;
//     functionName: string;
//     args: [unknown];
// };
    
export function ProposalList() {
    const { logs } = useGetProposal();
    const [proposals, setProposals] = React.useState<any[]>([]);
    console.log("logs in ProposalList :", logs);

    const calls = logs.map(log => ({
        address: CONTRACT_ADDRESS,
        abi: VOTING_ABI,
        functionName: 'getOneProposal',
        args: [log.args.proposalId],
    }));

    const { data: proposalsData} = useReadContracts({
        contracts: calls,
    });

    console.log("proposalsData :", proposalsData);

    React.useEffect(() => {
        console.log("proposalsData :", proposalsData);
        setProposals(proposalsData as any[]);
    }, [proposalsData] );


    // React.useEffect(() => {
    //     const { data: proposalsData, isLoading, isError } = useReadContracts({
    //         contracts: calls,
    //     });
    //     console.log("proposalsData :", proposalsData);
    //     setProposals(proposalsData?.result as any[]);
    // }, [logs] );

    // const calls = logs.map(log => {
    // const { data: proposalData, isLoading, isError } = useReadContract({
    //     address: CONTRACT_ADDRESS,
    //     abi: VOTING_ABI,
    //     functionName: 'getOneProposal',
    //     args: [1n],
    // });

        // console.log("proposalData :", proposalData);
    
    return (
        <div>
            <h2>Proposal List Component</h2>
            {proposals && proposals.map(({result}, index) => (
                <div key={index} className="border p-4 mb-4">
                    <p><strong>Description:</strong> {result.description}</p>
                    <p><strong>Vote Count:</strong> {result.voteCount}</p>
                </div>
            ))}
            {/* <div>{logs.map((log, index) => {
                const { data: proposal } = useReadContract({
                    address: CONTRACT_ADDRESS,
                    abi: VOTING_ABI,
                    functionName: 'getOneProposal',
                    args: [log.args.proposalId],
                });
                return (
                    <div key={index}>
                        <p>Proposal ID: {log.args.proposalId.toString()}</p>
                        <p>Description: {proposal ? proposal.description : 'Loading...'}</p>
                    </div>
                );
            })
            }</div> */}
        </div>
    )
}