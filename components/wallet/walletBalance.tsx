"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw, Plus, Wallet } from "lucide-react"
import { useWalletBalance } from "@/hooks/useWalletBalance"
import { requestAccounts } from "@/lib/web3/web3-utils"
import { useState } from "react"

export default function WalletBalance() {
  const {
    balances,
    totalUsdValue,
    isLoading,
    error,
    walletAddress,
    isConnected,
    refreshBalances,
  } = useWalletBalance()

  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnectWallet = async () => {
    setIsConnecting(true)
    try {
      await requestAccounts()
      await refreshBalances()
    } catch (error) {
      console.error("Error connecting wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const formatAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`

  const formatBalance = (balance: string) => {
    const num = Number.parseFloat(balance)
    if (num === 0) return "0.00"
    if (num < 0.01) return "< 0.01"
    return num.toFixed(2)
  }

  const formatUsdValue = (value: number) => {
    if (value === 0) return "$0.00"
    if (value < 0.01) return "< $0.01"
    return `$${value.toFixed(2)}`
  }

  if (!isConnected) {
    return (
      <div className="bg-background/80 backdrop-blur-sm border border-border rounded-xl p-5 h-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-foreground">Wallet Balance</h2>
        </div>

        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Wallet className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-4">Connect your wallet to view balances</p>
          <Button
            onClick={handleConnectWallet}
            disabled={isConnecting}
            className="bg-brand-blue hover:bg-brand-blue/90 text-white"
          >
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background/80 backdrop-blur-sm border border-border rounded-xl p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-medium text-foreground">Wallet Balance</h2>
          {walletAddress && <p className="text-xs text-muted-foreground">{formatAddress(walletAddress)}</p>}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-8 border-border text-brand-blue hover:bg-brand-blue/10"
            onClick={refreshBalances}
            disabled={isLoading}
          >
            <RefreshCw className={`h-3 w-3 mr-1 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-8 border-border text-brand-blue hover:bg-brand-blue/10"
          >
            <Plus className="h-3 w-3 mr-1" />
            Add Funds
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 mb-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-3">
        {/* Total Balance */}
        <div className="bg-gradient-to-r from-brand-blue/20 to-brand-blue/10 border border-brand-blue/30 rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Total Portfolio Value</div>
          <div className="text-2xl font-bold text-foreground">{formatUsdValue(totalUsdValue)}</div>
        </div>

        {/* Individual Token Balances */}
        {balances.map((token) => {
          const isStablecoin = ["USDC", "USDT"].includes(token.symbol)
          const isMainToken = token.symbol === "ETH" || token.symbol === "SUBV"

          return (
            <div
              key={token.address}
              className={`rounded-lg p-4 ${
                isMainToken ? "bg-background/70 border border-brand-blue/30" : "bg-background/60 border border-brand-blue/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isMainToken ? "bg-brand-blue/20" : isStablecoin ? "bg-green-500/20" : "bg-brand-blue/10"
                  }`}
                >
                  <span
                    className={`font-bold text-sm ${
                      isMainToken ? "text-brand-blue" : isStablecoin ? "text-green-400" : "text-muted-foreground"
                    }`}
                  >
                    {token.symbol === "ETH" ? "Ξ" : token.symbol.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-foreground font-medium">{token.symbol}</div>
                    <div className="text-right">
                      <div className="text-foreground font-semibold">
                        {formatBalance(token.balance)} {token.symbol}
                      </div>
                      {token.usdValue !== undefined && (
                        <div className="text-xs text-muted-foreground">{formatUsdValue(token.usdValue)}</div>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{token.name}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {balances.length > 0 && (
        <div className="text-sm text-muted-foreground mt-4 text-center">
          Auto-convert enabled for subscription payments
        </div>
      )}

      {isLoading && balances.length === 0 && (
        <div className="flex items-center justify-center py-8">
          <RefreshCw className="h-6 w-6 animate-spin text-brand-blue" />
          <span className="ml-2 text-muted-foreground">Loading balances...</span>
        </div>
      )}
    </div>
  )
}
