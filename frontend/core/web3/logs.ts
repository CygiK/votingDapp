import { CONTRACT_ADDRESS } from "./contants";
import { publicClient} from "./client";
import { parseAbiItem } from "viem";

async function getProposalListLog() {
    const proposalListLog = await publicClient.getLogs({
        address: CONTRACT_ADDRESS,
        fromBlock: 0n,
        toBlock: 'latest',
        event: parseAbiItem('event ProposalRegistered(uint256 proposalId)'),
    });

    return proposalListLog;
}

export { getProposalListLog };