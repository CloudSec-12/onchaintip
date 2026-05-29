# ◈ OnchainTip

A minimal, permissionless tipping app built on [Base](https://base.org). Send ETH to any wallet address with an optional message — no accounts, no fees beyond gas.

![Base](https://img.shields.io/badge/Built%20on-Base-0052FF?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## Stack
- **Next.js 15** (App Router)
- **Wagmi v2** + **Viem** for onchain interactions
- **ConnectKit** for wallet connection UI
- **Tailwind CSS**
- **Base** L2 network

## Getting Started

```bash
git clone https://github.com/CloudSec-12/onchaintip.git
cd onchaintip
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

```bash
npm i -g vercel
vercel --prod
```

## Extend It
- ENS / Basename resolution
- Tip history from onchain events
- USDC / ERC-20 support
- Farcaster Frame wrapper
