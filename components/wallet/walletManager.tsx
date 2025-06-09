"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wallet, Copy, Check, AlertCircle, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { getCurrentUser, refreshUserData, getToken } from "@/lib/auth/auth"
import { verifyWalletOwnership, connectWalletOnly } from "@/lib/auth/wallet-auth"
import WalletLinkButton from "./walletLinkButton"

interface WalletType {
  id: string
  address: string
  isPrimary: boolean
  nonce: string
  isVerified: boolean
  linkedAt: string
}

interface UserType {
  id: string
  email: string
  wallets: WalletType[]
}

export default function WalletManager() {
  const [user, setUser] = useState<UserType | null>(null)
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)
  const [verifyingWallet, setVerifyingWallet] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const { toast } = useToast()

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async (): Promise<void> => {
    try {
      setLoading(true)
      const userData = getCurrentUser()
      setUser(userData)

      // Refresh from server to get latest wallet data
      const freshData = await refreshUserData()
      setUser(freshData)
    } catch (error) {
      console.error("Failed to load user data:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load wallet information",
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async (address: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(address)
      setCopiedAddress(address)

      toast({
        variant: "default",
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

  const formatAddress = (address: string): string => {
    if (!address) return ""
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  const handleVerifyWallet = async (walletAddress: string, nonce: string): Promise<void> => {
    console.log("handleVerify:", nonce);
    try {
      setVerifyingWallet(walletAddress)
      console.log("Starting wallet verification for:", walletAddress)

      const token = getToken()
      if (!token) {
        throw new Error("Please log in first")
      }

      // Connect to the specific wallet
      const connectResult = await connectWalletOnly()

      if (connectResult.address.toLowerCase() !== walletAddress.toLowerCase()) {
        throw new Error("Please connect the correct wallet address")
      }

      // Verify ownership with our simplified method
      await verifyWalletOwnership( walletAddress, nonce )

      // Refresh user data to show updated verification status
      await loadUserData()

      toast({
        variant: "default",
        title: "Wallet verified",
        description: "Wallet ownership verified successfully",
      })
    } catch (error: any) {
      console.error("Error verifying wallet:", error)
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: error.message || "Failed to verify wallet ownership",
      })
    } finally {
      setVerifyingWallet(null)
    }
  }

  const handleRemoveWallet = async (walletId: string): Promise<void> => {
    try {
      const token = getToken()
      if (!token) {
        throw new Error("Please log in first")
      }
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/remove-wallet`, {
      //   method: "DELETE",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "x-auth-token": token,
      //   },
      //   body: JSON.stringify({ walletId }),
      // })

      // if (!response.ok) {
      //   const errorData = await response.json()
      //   throw new Error(errorData.message || "Failed to remove wallet")
      // }

      // await loadUserData()
      toast({
        variant: "default",
        title: "Coming soon!",
        description: "Wallet can't be unlinked from your account",
        // title: "Wallet removed",
        // description: "Wallet has been unlinked from your account",
      })
    } catch (error: any) {
      console.error("Error removing wallet:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to remove wallet",
      })
    }
  }

  if (loading) {
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
          <WalletLinkButton variant="outline" size="sm" onSuccess={loadUserData} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {user?.wallets && user.wallets.length > 0 ? (
          user.wallets.map((wallet) => (
            <div
              key={wallet.id || wallet.address}
              className="flex items-center justify-between p-4 border rounded-lg bg-muted/50"
            >
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
                    {wallet.isVerified ? (
                      <Badge variant="secondary" className="text-xs flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Unverified
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Added {new Date(wallet.linkedAt || Date.now()).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {!wallet.isVerified && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVerifyWallet(wallet.address, wallet.nonce)}
                    disabled={verifyingWallet === wallet.address}
                  >
                    {verifyingWallet === wallet.address ? "Verifying..." : "Verify"}
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(wallet.address)}
                  className="h-8 w-8 p-0"
                >
                  {copiedAddress === wallet.address ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveWallet(wallet.id)}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                >
                  ×
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Wallet className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No wallets connected yet</p>
            <WalletLinkButton onSuccess={loadUserData} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
