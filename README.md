# HeySalad Solana Pay Agent

Mobile-focused Solana Pay dApp for food-commerce agents that create Solana-native checkout requests.

This prototype is built for the Solana Frontier Hackathon. It shows how HeySalad can turn recipe, grocery, kitchen and creator-food intent into structured Solana Pay settlement flows.

## What It Does

- Takes a food-commerce intent, such as a Sally meal basket, kitchen restock or paid recipe.
- Produces merchant metadata: amount, memo, ingredients, customer context and risk score.
- Generates a Solana Pay URI and QR code for wallet checkout.
- Frames receipts as future commerce memory for AI agents.

## Why Solana

Food-commerce agents need fast, low-friction settlement for small orders, creator paywalls, kitchen restocks and merchant payouts. Solana Pay gives the project a simple route to wallet-native checkout, instant settlement UX and composable payment data.

## Demo

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`.

For a real recipient, copy `.env.example` to `.env.local` and set `VITE_MERCHANT_WALLET` to the public Solana recipient address. Do not commit `.env.local`.

## Deploy

This repo is configured for Cloudflare Pages.

```bash
npm run deploy
```

Target project: `heysalad-solana-pay`

Target production domain:

```text
https://solana-pay.heysalad.app
```

After the first Pages deploy, attach the custom domain in Cloudflare Pages:

```text
heysalad-solana-pay -> Custom domains -> solana-pay.heysalad.app
```

## Submission Summary

**Project:** HeySalad Solana Pay Agent

**One-liner:** Mobile AI food agents that settle orders with Solana Pay.

**Category fit:** AI agents, mobile dApps, payments, consumer crypto, commerce infrastructure.

**Current status:** Hackathon prototype. Existing HeySalad assets include Sally by HeySalad, HeySalad Cash, HeySalad Wallet, x402 finance agent experiments, food AI work and payment infrastructure prototypes. This repo focuses those assets into a Solana-native submission.

## Next Build Steps

1. Add Phantom wallet connection and real devnet transaction signing.
2. Support SPL USDC token transfers.
3. Add merchant dashboard for paid kitchen and recipe orders.
4. Persist receipts and expose a food-commerce API for agents.
5. Connect Sally by HeySalad to create live Solana Pay requests.

## Relevant Existing Work

- `https://heysalad.app`
- `https://github.com/Hey-Salad/heysalad-cash`
- `https://github.com/Hey-Salad/heysalad-wallet`
- `https://github.com/Hey-Salad/x402`

## License

Copyright (C) 2026 HeySalad Inc.

Licensed under the GNU Affero General Public License v3.0 only (AGPL-3.0-only). See [LICENSE](LICENSE) and [NOTICE](NOTICE). If you run a modified version of this software to provide a network service, the AGPL requires you to offer its users the corresponding source code. Versions published before this change remain under their previous licence.
