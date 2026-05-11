# Colosseum Submission Draft

## Project Name

HeySalad Solana Pay Agent

## Short Description

Mobile AI food agents that create Solana Pay checkout requests for kitchens, grocery workflows, recipes and merchant settlement.

## Long Description

HeySalad is building AI infrastructure for the food ecosystem. Food businesses, recipe platforms, kitchens and grocery workflows need mobile-first agents that understand ingredients, recipes, stock, customer intent and payment context. This prototype demonstrates the onchain wedge: Sally, a HeySalad food agent, turns food intent into a Solana Pay checkout request with structured merchant metadata.

The mobile dApp generates Solana Pay URIs and QR codes for sample workflows including meal baskets, kitchen restocking and paid recipe access. The next step is wallet connection, devnet signing, SPL USDC settlement and receipt persistence so food-commerce agents can pay, reconcile and learn from transactions.

## Problem

Food-commerce workflows are fragmented. AI agents can recommend meals or baskets, but they usually stop before payment, settlement, reconciliation and merchant data capture. Existing payment systems are built for human checkout, not autonomous agents that need fast, programmable and verifiable commerce rails.

## Solution

HeySalad Solana Pay Agent creates a bridge between AI food intent and Solana-native settlement. The agent generates payment requests with order metadata, risk context and merchant memo fields, then exposes them as Solana Pay links and QR codes.

## Why It Matters To Solana

This expands Solana Pay into agentic food commerce: grocery orders, restaurant restocks, paid recipes, creator food products and merchant settlement. It is a practical consumer and merchant use case where low-fee, fast settlement matters.

## Technical Stack

- React
- TypeScript
- Vite
- Solana Pay URI format
- `@solana/web3.js`
- QR code generation

## What Is Working

- Mobile-first dApp interface
- Food intent selection
- Merchant payment metadata generation
- Solana Pay URI generation
- QR code generation
- Submission-ready explanation and demo UI

## What Comes Next

- Phantom wallet connection
- SPL USDC transfer support
- Devnet transaction verification
- Merchant dashboard
- Sally by HeySalad integration
