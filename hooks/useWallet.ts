"use client";

import { useState, useEffect } from "react";
import { initWalletConnect } from "@/lib/wallet";

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [provider, setProvider] = useState<any>(null);

  async function connect() {
    const wcProvider = await initWalletConnect();
    const accounts = await wcProvider.enable();

    setAddress(accounts[0]);
    setChainId(parseInt(wcProvider.chainId, 16));
    setProvider(wcProvider);

    wcProvider.on("accountsChanged", (accounts: string[]) => {
      setAddress(accounts.length ? accounts[0] : null);
    });

    wcProvider.on("chainChanged", (id: string) => {
      setChainId(parseInt(id, 16));
    });
  }

  async function disconnect() {
    if (provider) {
      await provider.disconnect();
    }
    setAddress(null);
    setChainId(null);
    setProvider(null);
  }

  return { address, chainId, connect, disconnect, provider };
}
