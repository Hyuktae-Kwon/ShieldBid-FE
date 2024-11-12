# ShieldBid-FE

A blockchain-based online auction service using zero-knowledge proofs.

# Run

1. Add custom network in Metamask

   - Default RPC URL: localhost:8545

2. Metamask - Settings - Advanced - Clear activity tab data

3. Metamask - Settings - Advanced - Customize transaction nonce

4. Run hardhat node in ShieldBid-Contract

```sh
npx hardhat node
```

5. Deploy contract in ShieldBid-Contract and copy contract address

```sh
npx hardhat run scripts/deploy.ts --network localhost
```

6. Paste contract address to Groth16Verify.ts

```ts
const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; //example address
```

7. Run FE

```sh
npm run start
```
