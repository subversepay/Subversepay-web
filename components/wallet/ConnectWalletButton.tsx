"use client";

import { useWallet } from "@/hooks/useWallet";

export default function ConnectButton() {
  const { address, connect, disconnect } = useWallet();

  return (
    <button
      onClick={address ? disconnect : connect}
      className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
    >
      {address
        ? `Connected: ${address.slice(0, 6)}...${address.slice(-4)}`
        : "Connect Wallet"}
    </button>
  );
}
