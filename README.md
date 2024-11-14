# ShieldBid-FE

A blockchain-based online auction service using zero-knowledge proofs.

# Run
1. Install hardhat in ShieldBid-Contract
```sh
npm i hardhat
```

2. Run hardhat node in ShieldBid-Contract

```sh
npx hardhat node
```

3. Add custom network in Metamask

   - Default RPC URL: localhost:8545

Metamask - Settings - Advanced - Clear activity tab data

Metamask - Settings - Advanced - Customize transaction nonce

4. Deploy contract in ShieldBid-Contract and copy contract address

```sh
npx hardhat run scripts/deploy.ts --network localhost
```

5. Paste contract address to contract.ts

```ts
const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; //example address
```

6. Run FE

```sh
npm i
npm run start
```
