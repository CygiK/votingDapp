import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getAddress } from "viem";

import { network } from "hardhat";

describe("Voting Contract", async function () {
    const { viem } = await network.connect();
    const publicClient = await viem.getPublicClient();

    // Deployment fixture for reusability
    async function deployVotingFixture() {
        const [owner, voter1, voter2, voter3, unauthorized] = await viem.getWalletClients();
        
        const voting = await viem.deployContract("Voting");
        
        return {
            voting,
            owner,
            voter1,
            voter2,
            voter3,
            unauthorized,
        };
    }

    describe("Deployment", function () {
        it("Should set the correct owner", async function () {
            const { voting, owner } = await deployVotingFixture();
            const contractOwner = await voting.read.owner();
            assert.equal(
                getAddress(contractOwner as string), 
                getAddress(owner.account.address)
            );
        });

        it("Should initialize with VoterRegistration status", async function () {
            const { voting } = await deployVotingFixture();
            assert.equal(await voting.read.workflowStatus(), 0); // VoterRegistration
        });

        it("Should start with no registered voters", async function () {
            const { voting, owner, voter1 } = await deployVotingFixture();
            // Le propriétaire doit être enregistré pour pouvoir appeler getVoter
            await voting.write.addVoter([owner.account.address]);
            const voterInfo: any = await voting.read.getVoter([voter1.account.address], { account: owner.account });
            assert.equal(voterInfo.isRegistered, false);
        });
    });

    describe("Voter Registration", function () {
        it("Should allow owner to register a voter", async function () {
            const { voting, owner, voter1 } = await deployVotingFixture();
            
            // Enregistrer d'abord le propriétaire pour qu'il puisse appeler getVoter
            await voting.write.addVoter([owner.account.address]);
            await voting.write.addVoter([voter1.account.address]);
            
            const voterInfo: any = await voting.read.getVoter([voter1.account.address], { account: owner.account });
            assert.equal(voterInfo.isRegistered, true);
            assert.equal(voterInfo.hasVoted, false);
            assert.equal(voterInfo.votedProposalId, 0n);
        });

        it("Should emit VoterRegistered event when adding voter", async function () {
            const { voting, voter1 } = await deployVotingFixture();
            
            const hash = await voting.write.addVoter([voter1.account.address]);
            const receipt = await publicClient.waitForTransactionReceipt({ hash });
            
            assert.ok(receipt.logs.length > 0);
        });

        it("Should prevent non-owner from registering voters", async function () {
            const { voting, voter1, voter2 } = await deployVotingFixture();
            
            await assert.rejects(
                voting.write.addVoter([voter2.account.address], { account: voter1.account })
            );
        });

        it("Should prevent registering the same voter twice", async function () {
            const { voting, voter1 } = await deployVotingFixture();
            
            await voting.write.addVoter([voter1.account.address]);
            
            await assert.rejects(
                voting.write.addVoter([voter1.account.address])
            );
        });

        it("Should prevent registering voters in wrong workflow status", async function () {
            const { voting, voter1, voter2 } = await deployVotingFixture();
            
            await voting.write.addVoter([voter1.account.address]);
            await voting.write.startProposalsRegistering();
            
            await assert.rejects(
                voting.write.addVoter([voter2.account.address])
            );
        });
    });

    describe("Proposal Registration", function () {
        it("Should allow starting proposal registration phase", async function () {
            const { voting } = await deployVotingFixture();
            
            await voting.write.startProposalsRegistering();
            
            assert.equal(await voting.read.workflowStatus(), 1); // ProposalsRegistrationStarted
        });

        it("Should allow registered voter to submit proposal", async function () {
            const { voting, voter1 } = await deployVotingFixture();
            const proposalDescription = "Build a new community center";
            
            await voting.write.addVoter([voter1.account.address]);
            await voting.write.startProposalsRegistering();
            
            await voting.write.addProposal([proposalDescription], { account: voter1.account });
            
            const proposal: any = await voting.read.getOneProposal([1n], { account: voter1.account });
            assert.equal(proposal.description, proposalDescription);
            assert.equal(proposal.voteCount, 0n);
        });

        it("Should prevent non-registered voters from submitting proposals", async function () {
            const { voting, unauthorized } = await deployVotingFixture();
            
            await voting.write.startProposalsRegistering();
            
            await assert.rejects(
                voting.write.addProposal(["Invalid proposal"], { account: unauthorized.account })
            );
        });

        it("Should prevent empty proposal descriptions", async function () {
            const { voting, voter1 } = await deployVotingFixture();
            
            await voting.write.addVoter([voter1.account.address]);
            await voting.write.startProposalsRegistering();
            
            await assert.rejects(
                voting.write.addProposal([""], { account: voter1.account })
            );
        });

        it("Should end proposal registration phase", async function () {
            const { voting } = await deployVotingFixture();
            
            await voting.write.startProposalsRegistering();
            await voting.write.endProposalsRegistering();
            
            assert.equal(await voting.read.workflowStatus(), 2); // ProposalsRegistrationEnded
        });
    });

    describe("Voting Session", function () {
        it("Should allow starting voting session", async function () {
            const { voting, voter1 } = await deployVotingFixture();
            
            await voting.write.addVoter([voter1.account.address]);
            await voting.write.startProposalsRegistering();
            await voting.write.addProposal(["Proposal 1"], { account: voter1.account });
            await voting.write.endProposalsRegistering();
            
            await voting.write.startVotingSession();
            
            assert.equal(await voting.read.workflowStatus(), 3); // VotingSessionStarted
        });

        it("Should allow registered voter to vote", async function () {
            const { voting, voter1 } = await deployVotingFixture();
            const proposalId = 1n;
            
            await voting.write.addVoter([voter1.account.address]);
            await voting.write.startProposalsRegistering();
            await voting.write.addProposal(["Proposal 1"], { account: voter1.account });
            await voting.write.endProposalsRegistering();
            await voting.write.startVotingSession();
            
            await voting.write.setVote([proposalId], { account: voter1.account });
            
            const voterInfo: any = await voting.read.getVoter([voter1.account.address], { account: voter1.account });
            assert.equal(voterInfo.hasVoted, true);
            assert.equal(voterInfo.votedProposalId, proposalId);
        });

        it("Should increment vote count for proposal", async function () {
            const { voting, voter1 } = await deployVotingFixture();
            const proposalId = 1n;
            
            await voting.write.addVoter([voter1.account.address]);
            await voting.write.startProposalsRegistering();
            await voting.write.addProposal(["Proposal 1"], { account: voter1.account });
            await voting.write.endProposalsRegistering();
            await voting.write.startVotingSession();
            
            await voting.write.setVote([proposalId], { account: voter1.account });
            
            const proposal: any = await voting.read.getOneProposal([proposalId], { account: voter1.account });
            assert.equal(proposal.voteCount, 1n);
        });

        it("Should prevent voter from voting twice", async function () {
            const { voting, voter1 } = await deployVotingFixture();
            
            await voting.write.addVoter([voter1.account.address]);
            await voting.write.startProposalsRegistering();
            await voting.write.addProposal(["Proposal 1"], { account: voter1.account });
            await voting.write.endProposalsRegistering();
            await voting.write.startVotingSession();
            
            await voting.write.setVote([1n], { account: voter1.account });
            
            await assert.rejects(
                voting.write.setVote([1n], { account: voter1.account })
            );
        });

        it("Should prevent voting for non-existent proposal", async function () {
            const { voting, voter1 } = await deployVotingFixture();
            
            await voting.write.addVoter([voter1.account.address]);
            await voting.write.startProposalsRegistering();
            await voting.write.endProposalsRegistering();
            await voting.write.startVotingSession();
            
            await assert.rejects(
                voting.write.setVote([999n], { account: voter1.account })
            );
        });

        it("Should end voting session", async function () {
            const { voting, voter1 } = await deployVotingFixture();
            
            await voting.write.addVoter([voter1.account.address]);
            await voting.write.startProposalsRegistering();
            await voting.write.addProposal(["Proposal 1"], { account: voter1.account });
            await voting.write.endProposalsRegistering();
            await voting.write.startVotingSession();
            
            await voting.write.endVotingSession();
            
            assert.equal(await voting.read.workflowStatus(), 4); // VotingSessionEnded
        });
    });

    describe("Vote Tallying", function () {
        it("Should tally votes and determine winner", async function () {
            const { voting, voter1, voter2 } = await deployVotingFixture();
            
            await voting.write.addVoter([voter1.account.address]);
            await voting.write.addVoter([voter2.account.address]);
            await voting.write.startProposalsRegistering();
            await voting.write.addProposal(["Proposal 1"], { account: voter1.account });
            await voting.write.addProposal(["Proposal 2"], { account: voter2.account });
            await voting.write.endProposalsRegistering();
            await voting.write.startVotingSession();
            await voting.write.setVote([2n], { account: voter1.account });
            await voting.write.setVote([2n], { account: voter2.account });
            await voting.write.endVotingSession();
            
            await voting.write.tallyVotes();
            
            assert.equal(await voting.read.workflowStatus(), 5); // VotesTallied
            assert.equal(await voting.read.winningProposalID(), 2n);
        });

        it("Should handle tie scenarios correctly", async function () {
            const { voting, voter1, voter2 } = await deployVotingFixture();
            
            await voting.write.addVoter([voter1.account.address]);
            await voting.write.addVoter([voter2.account.address]);
            await voting.write.startProposalsRegistering();
            await voting.write.addProposal(["Proposal 1"], { account: voter1.account });
            await voting.write.addProposal(["Proposal 2"], { account: voter2.account });
            await voting.write.endProposalsRegistering();
            await voting.write.startVotingSession();
            await voting.write.setVote([1n], { account: voter1.account });
            await voting.write.setVote([2n], { account: voter2.account });
            await voting.write.endVotingSession();
            
            await voting.write.tallyVotes();
            
            // GENESIS proposal (id 0) wins in case of tie since it has 0 votes like others
            // But based on the algorithm, the first proposal with max votes wins
            // With a tie of 1 vote each, proposal 1 should win
            assert.equal(await voting.read.winningProposalID(), 1n);
        });

        it("Should prevent tallying votes before voting session ends", async function () {
            const { voting, voter1 } = await deployVotingFixture();
            
            await voting.write.addVoter([voter1.account.address]);
            await voting.write.startProposalsRegistering();
            await voting.write.endProposalsRegistering();
            await voting.write.startVotingSession();
            
            await assert.rejects(voting.write.tallyVotes());
        });
    });

    describe("Workflow Status Transitions", function () {
        it("Should enforce correct workflow status transitions", async function () {
            const { voting } = await deployVotingFixture();
            
            // Cannot skip to voting session directly
            await assert.rejects(voting.write.startVotingSession());
            
            await voting.write.startProposalsRegistering();
            
            // Cannot start voting without ending proposals
            await assert.rejects(voting.write.startVotingSession());
        });

        it("Should emit WorkflowStatusChange events", async function () {
            const { voting } = await deployVotingFixture();
            
            const hash = await voting.write.startProposalsRegistering();
            const receipt = await publicClient.waitForTransactionReceipt({ hash });
            
            assert.ok(receipt.logs.length > 0);
        });
    });

    describe("Edge Cases", function () {
        it("Should handle voting with no proposals", async function () {
            const { voting } = await deployVotingFixture();
            
            await voting.write.startProposalsRegistering();
            await voting.write.endProposalsRegistering();
            await voting.write.startVotingSession();
            await voting.write.endVotingSession();
            
            await voting.write.tallyVotes();
            
            assert.equal(await voting.read.winningProposalID(), 0n);
        });

        it("Should handle multiple voters voting for same proposal", async function () {
            const { voting, voter1, voter2, voter3 } = await deployVotingFixture();
            
            await voting.write.addVoter([voter1.account.address]);
            await voting.write.addVoter([voter2.account.address]);
            await voting.write.addVoter([voter3.account.address]);
            await voting.write.startProposalsRegistering();
            await voting.write.addProposal(["Popular Proposal"], { account: voter1.account });
            await voting.write.endProposalsRegistering();
            await voting.write.startVotingSession();
            
            await voting.write.setVote([1n], { account: voter1.account });
            await voting.write.setVote([1n], { account: voter2.account });
            await voting.write.setVote([1n], { account: voter3.account });
            
            const proposal: any = await voting.read.getOneProposal([1n], { account: voter1.account });
            assert.equal(proposal.voteCount, 3n);
        });
    });
});