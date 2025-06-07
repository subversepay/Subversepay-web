"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wallet, Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { getCurrentUser, refreshUserData } from "@/lib/auth/auth"
import { verifyLinkWallet } from "@/lib/auth/wallet-auth"
import WalletLinkButton from "./walletLinkButton"
import { signMessage, requestWalletConnection } from "@/lib/web3/web3-utils"


export default function WalletManager() {
  const [user, setUser] = useState(null)
  const [copiedAddress, setCopiedAddress] = useState(null)
  const { toast } = useToast()

  useEffect(() => {
    loadUserData()
  }, [])


  const loadUserData = async () => {
    try {
      const userData = getCurrentUser()
      setUser(userData)

      // Optionally refresh from server
      const freshData = await refreshUserData()
      setUser(freshData)
    } catch (error) {
      console.error("Failed to load user data", error)
    }
  }

  const copyToClipboard = async (address) => {
    try {
      await navigator.clipboard.writeText(address)
      setCopiedAddress(address)

      toast({
        variant: "success",
        title: "Address copied",
        description: "Wallet address copied to clipboard",
      })

      setTimeout(() => setCopiedAddress(null), 2000)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to copy",
        description: "Could not copy address to clipboard",
      })
    }
  }

  const formatAddress = (address) => {
    return `${address.substring(0, 6)}...${address.substring(38)}`
  }

  const handleVerifyWallet = async()=>{
    try{
    const address = await requestWalletConnection()
      // 3. Sign the nonce
    const message = `I am signing my one-time nonce: $ {nonce}`
    const signature = await signMessage(message, address)

    console.log("address & signature to verify:", address, signature);
    // 4. Verify signature with backend
    await verifyLinkWallet(address, signature)

        // 5. Update local storage and refresh user data
        localStorage.setItem("walletAddress", address)
        await refreshUserData()

        return { success: true, address }
      } catch (error) {
        console.error("Error completing wallet linking:", error)
        throw error
      }
  }
  if (!user) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Loading wallet information...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Connected Wallets
            </CardTitle>
            <CardDescription>Manage your linked cryptocurrency wallets</CardDescription>
          </div>
          <WalletLinkButton variant="outline" size="sm" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {user.wallets && user.wallets.length > 0 ? (
          user.wallets.map((wallet) => (
            <div key={wallet.id} className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">{formatAddress(wallet.address)}</span>
                    {wallet.isPrimary && (
                      <Badge variant="default" className="text-xs">
                        Primary
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Added {new Date(wallet.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleVerifyWallet}>
                Verify wallet
              </Button>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(wallet.address)} className="h-8 w-8 p-0">
                {copiedAddress === wallet.address ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Wallet className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No wallets connected yet</p>
            <WalletLinkButton />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
