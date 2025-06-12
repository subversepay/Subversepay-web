"use client"

import { useState, useContext } from "react"
import { Button } from "@/components/ui/button"
import { Wallet, Check, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { WalletContext } from "@/context/walletContext"
import { linkWalletToAccount, verifyWalletOwnership } from "@/lib/auth/wallet-auth"

export default function WalletLinkButton() {
  const [isLinking, setIsLinking] = useState(false)
  const [isLinked, setIsLinked] = useState(false)
  const { currentAccount, ConnectWallet, isConnecting } = useContext(WalletContext)
  const { toast } = useToast()

  const handleLinkWallet = async () => {
    try {
      // Step 1: Connect wallet if not connected
      if (!currentAccount) {
        await ConnectWallet()
        return // Let user click again after connection
      }

      // Step 2: Link and verify
      setIsLinking(true)

      toast({
        title: "Linking wallet...",
        description: "Adding wallet to your account",
        variant: "info",
      })

      // Link wallet to account
      await linkWalletToAccount(currentAccount)

      toast({
        title: "Verifying ownership...",
        description: "Please sign the verification message",
        variant: "info",
      })

      // Verify ownership
      await verifyWalletOwnership(currentAccount)

      setIsLinked(true)
      toast({
        title: "Wallet linked successfully! ✅",
        description: "Your wallet has been linked and verified",
        variant: "success",
      })
    } catch (error) {
      console.error("Failed to link wallet:", error)

      let errorMessage = "An unknown error occurred"
      if (error.message.includes("User rejected")) {
        errorMessage = "Signature was rejected. Please try again."
      } else if (error.message.includes("Authentication required")) {
        errorMessage = "Please log in first"
      } else if (error.message.includes("MetaMask")) {
        errorMessage = "Please install MetaMask"
      } else {
        errorMessage = error.message
      }

      toast({
        title: "Failed to link wallet",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLinking(false)
    }
  }

  if (isLinked) {
    return (
      <Button disabled className="w-full">
        <Check className="mr-2 h-4 w-4" />
        Wallet Linked
      </Button>
    )
  }

  return (
    <Button onClick={handleLinkWallet} disabled={isConnecting || isLinking} className="w-full">
      {isConnecting || isLinking ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Wallet className="mr-2 h-4 w-4" />
      )}
      {isConnecting ? "Connecting..." : isLinking ? "Linking..." : currentAccount ? "Link Wallet" : "Connect Wallet"}
    </Button>
  )
}
