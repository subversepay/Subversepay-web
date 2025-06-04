"use client"

import { useContext, useState } from "react"
import { Button } from "@/components/ui/button"
import { ContractContext } from "@/context/contractContext"
import { Wallet, Plus } from "lucide-react"
import { hasWalletLinked, getCurrentUser } from "@/lib/auth"

export default function WalletLinkButton({ variant = "default", size = "default", className = "" }) {
  const { LinkWallet, isLinking, currentAccount } = useContext(ContractContext)
  const [isChecking, setIsChecking] = useState(false)

  const handleLinkWallet = async () => {
    setIsChecking(true)

    try {
      // Check if current wallet is already linked
      if (currentAccount && hasWalletLinked(currentAccount)) {
        const user = getCurrentUser()
        console.log("Wallet already linked to user:", user?.displayName)
        return
      }

      await LinkWallet()
    } finally {
      setIsChecking(false)
    }
  }

  const user = getCurrentUser()
  const walletCount = user?.wallets?.length || 0

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleLinkWallet}
      disabled={isLinking || isChecking}
    >
      {isLinking || isChecking ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          {isLinking ? "Linking..." : "Checking..."}
        </>
      ) : (
        <>
          {walletCount > 0 ? (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Link Another Wallet
            </>
          ) : (
            <>
              <Wallet className="mr-2 h-4 w-4" />
              Link Wallet
            </>
          )}
        </>
      )}
    </Button>
  )
}
