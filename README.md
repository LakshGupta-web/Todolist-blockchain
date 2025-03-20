# TodoList DApp

A decentralized Todo List application built on the Ethereum blockchain using Solidity smart contracts, Web3.js, and Truffle.

## Features
- Add tasks to the blockchain.
- Mark tasks as completed.
- Store and retrieve tasks from a smart contract.
- Event listeners to detect real-time task updates.
- Uses MetaMask for account authentication.

## Technologies Used
- **Solidity** (Smart contract development)
- **Web3.js** (Interacting with the Ethereum blockchain)
- **Truffle** (Smart contract deployment and testing framework)
- **Bootstrap** (Frontend styling)
- **JavaScript (jQuery)** (Frontend logic)

## Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Truffle](https://www.trufflesuite.com/docs/truffle/getting-started/installation)
- [Ganache](https://trufflesuite.com/ganache/) (For local Ethereum blockchain)
- [MetaMask](https://metamask.io/) (Browser extension for Ethereum interaction)

## Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/todolist-dapp.git
   cd todolist-dapp
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Compile and deploy the smart contract:
   ```sh
   truffle compile
   truffle migrate --reset
   ```

4. Start a local blockchain using Ganache and configure Truffle to connect.

5. Run the application:
   ```sh
   npm run dev
   ```

6. Open MetaMask and connect to your local blockchain.

7. Access the app in your browser at `http://localhost:3000`.

## Smart Contract Overview
The `todolist.sol` contract:
- Maintains a list of tasks with an ID, content, and completion status.
- Allows users to add new tasks.
- Enables toggling task completion status.
- Emits events (`TaskCreated` and `TaskCompleted`) for real-time updates.

## Known Issues
- Ensure MetaMask is connected to the correct network.
- If tasks are doubling up, check event listeners in `app.js`.
- Restart Ganache and re-deploy the contract if necessary.

## Future Improvements
- Add user authentication for personalized task lists.
- Store task data using IPFS for a fully decentralized approach.
- Implement a better UI/UX.

## License
This project is licensed under the MIT License.

