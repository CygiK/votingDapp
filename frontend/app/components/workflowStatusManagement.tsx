import { useChangeWorkflowStatus } from "~/lib/hooks";
import {Button} from "./ui/button";
import React from "react";

export function WorkflowStatusManagement(): React.ReactNode {
    const { getEvent, logs, changeWorkflowStatus, currentStatus } = useChangeWorkflowStatus();

    React.useEffect(() => {
        getEvent();
    }, []);

    return (
        <div>
            {/* <h2>Workflow Status Management</h2> */}
            {/* <Button onClick={getEvent}>Fetch Workflow Events</Button> */}
            <div>Current Status: {currentStatus.stepName} - next: {currentStatus.nextStepName}</div>
            <Button onClick={changeWorkflowStatus}>{currentStatus.nextStepName}</Button>
            <ul>
                {logs.map((log, index) => (
                    <li key={index}>{JSON.stringify(log)}</li>
                ))}
            </ul>
            {/* Workflow status management functionalities go here */}
        </div>
    );
}