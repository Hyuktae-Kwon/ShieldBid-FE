# ShieldBid-FE

A blockchain-based online auction service using zero-knowledge proofs.

# Run

Metamask - Settings - Advanced - Clear activity tab data

Run hardhat node in ShieldBid-Contract

```sh
npx hardhat node
```

Deploy contract in ShieldBid-Contract and copy contract address

```sh
npx hardhat run scripts/deploy.ts --network localhost
```

Paste contract address to Groth16Verify.ts

```ts
const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; //example address
```

Run FE

```sh
npm run start
```
