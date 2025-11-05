import * as React from "react";
import { WorkflowStatusManagement } from "./workflowStatusManagement";
import { AddProposals } from "./shared/addProposals";
import { ProposalList } from "./shared/proposalLIst";
import { AddVoter } from "./shared/addvoter";


export function AdminDashboard(): React.ReactNode {
    return (
        <div>
            <WorkflowStatusManagement />
            <AddVoter />
            <AddProposals />
            <ProposalList />
        </div>
    );
}