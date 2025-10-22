# Copilot Instructions for Voting DApp

## Architecture Overview

This is a decentralized voting application with a clear separation between blockchain backend and React frontend:

- **Root**: Hardhat 3 project for smart contract development
- **`contracts/`**: Solidity smart contracts for voting logic
- **`test/`**: Backend tests using Hardhat testing framework
- **`scripts/`**: Deployment and utility scripts
- **`frontend/`**: React application with React Router for navigation

## Key Technologies & Patterns

### Blockchain Stack
- **Hardhat 3**: Primary development framework - use `npx hardhat` commands
- **Viem**: Preferred over ethers.js for blockchain interactions
- **Solidity**: Smart contract language - follow latest best practices

### Frontend Stack
- **React + React Router**: SPA with client-side routing
- **Wagmi**: React hooks for Ethereum - preferred over direct Viem calls in components
- **Viem**: Type-safe Ethereum client for direct blockchain calls

## Development Workflows

### Backend Development
```bash
# From project root
npm install                    # Install dependencies
npx hardhat compile           # Compile contracts
npx hardhat test             # Run backend tests
npx hardhat node             # Start local network
npx hardhat deploy --network localhost  # Deploy to local
```

### Frontend Development
```bash
# From frontend/ directory
cd frontend
npm install                   # Install frontend dependencies
npm test                     # Run frontend tests
npm start                    # Start development server
```

## Code Quality Standards

This project follows **Software Craftsmanship** principles:

### Clean Code Requirements
- Functions should be small and focused
- Meaningful variable and function names
- Comprehensive documentation for complex logic
- No magic numbers - use named constants
- Proper error handling and validation

### Testing Standards
- **Backend**: Test all smart contract functions, edge cases, and failure scenarios
- **Frontend**: Test components, user interactions, and integration with contracts
- Aim for high test coverage on critical voting logic

## Smart Contract Patterns

When implementing voting contracts:
- Use access control patterns (Ownable, roles)
- Implement proper state management for voting phases
- Include events for all important state changes
- Consider gas optimization for frequently called functions
- Validate all inputs and handle edge cases

## Frontend Integration

- Use Wagmi hooks for contract interactions (`useContractRead`, `useContractWrite`)
- Handle wallet connection states gracefully
- Implement proper error handling for blockchain interactions
- Show transaction progress and confirmations to users
- Cache contract data appropriately to reduce RPC calls

## File Organization

- Keep contracts focused - separate voting logic, access control, and data structures
- Frontend components should be organized by feature/domain
- Shared utilities and hooks in dedicated directories
- Test files should mirror the structure of source files

## Important Notes

- This project prioritizes code quality over rapid development
- All code should be self-documenting with clear intent
- Consider security implications in all smart contract code
- Frontend should handle blockchain uncertainty (pending transactions, network issues)