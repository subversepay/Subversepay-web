// lib/wallet.ts
import EthereumProvider from "@walletconnect/ethereum-provider";
import { createWalletClient, custom } from "viem";
import { supportedChains } from "./chains";

let wcProvider: any = null;

export async function initWalletConnect() {
  if (wcProvider) return wcProvider;

  wcProvider = await EthereumProvider.init({
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!, // from cloud.walletconnect.com
    chains: supportedChains.map((c) => c.id), // EVM chains
    showQrModal: true,
  });

  return wcProvider;
}

export function getWalletClient(chainId: number) {
  if (!wcProvider) throw new Error("WalletConnect not initialized");

  const chain = supportedChains.find((c) => c.id === chainId);
  if (!chain) throw new Error("Unsupported chain");

  return createWalletClient({
    chain,
    transport: custom(wcProvider),
  });
}
