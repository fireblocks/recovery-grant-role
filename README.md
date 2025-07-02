# Recovery Tool: Grant Role Example

This code example demonstrates how to grant a specific role to an Ethereum account on a Fireblocks ERC20F smart contract that implements role-based access control.
It is especially useful for recovery scenarios or administrative operations.

---

## Features

- **Interactive prompts** for all required parameters (contract address, sender, recipient, and role).
- **Role selection** from a predefined list (no need to enter role hashes manually).
- **Offline signing**: The tool generates the transaction hash and expects it to be signed by the Fireblocks Recovery Utility.
- **Broadcasts** the signed transaction to the Ethereum network.

---

## Supported Roles

- `DEFAULT_ADMIN_ROLE`
- `MINTER_ROLE`
- `BURNER_ROLE`
- `PAUSER_ROLE`
- `RECOVERY_ROLE`

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v20 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/fireblocks/recovery-grant-role.git
   cd recovery-tool-grant-role-example
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```

---

## Usage

1. **Start the tool:**
   ```sh
   npm start
   ```
   or
   ```sh
   yarn start
   ```

2. **Follow the prompts:**
   - Enter the **contract address** (the address of the ERC20F smart contract you want to interact with).
   - Enter the **sender address** (the account that will send the transaction. This account needs to have sufficient permissions to grant roles).
   - Enter the **recipient address** (the account to which you want to grant the role).
   - Select the **role** to grant from the provided list.

3. **Sign the transaction:**
   - The tool will generate the transaction and display a hash for you to sign.
   - Sign the provided hash using the Fireblocks Recovery Utility.
   - Provide the signature when prompted (the signing process may be handled by a separate tool or wallet).

4. **Broadcast and confirm:**
   - The tool will broadcast the signed transaction to the Ethereum network.
   - It will display the transaction hash and wait for confirmation.

---

## How It Works

- The tool uses the contract's ABI to encode a `grantRole` call.
- It collects all necessary parameters from the user interactively.
- It prepares an unsigned transaction and asks you to sign it.
- After receiving the signature, it broadcasts the transaction and waits for confirmation.

---