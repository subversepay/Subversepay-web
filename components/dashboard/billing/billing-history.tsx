"use client"

import { useState } from "react"
import { Download, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Subscription {
  _id: string
  subscriberAddress: string
  ottPlatformAddress: string
  planId: string
  expiryTimestamp: number
  isActive: boolean
  transactionHash: string
  blockNumber: number
  createdAt: string
  updatedAt: string
}

const PLATFORM_NAMES: { [key: string]: string } = {
  "0x1234567890123456789012345678901234567890": "StreamFlix",
  "0x2345678901234567890123456789012345678901": "MusicFlow",
  "0x3456789012345678901234567890123456789012": "GamePass Pro",
}

export default function BillingHistory({
  subscriptions = [],
}: {
  subscriptions?: Subscription[]
}) {
  const [searchTerm, setSearchTerm] = useState("")

  // Convert subscriptions to transaction format
  const transactions = subscriptions.map((sub, index) => ({
    id: `TXN-${sub.blockNumber}-${index}`,
    date: new Date(sub.createdAt).toLocaleDateString(),
    amount: sub.planId === "premium" ? "$15.99" : sub.planId === "basic" ? "$9.99" : "$12.99",
    status: "Paid",
    method: "USDC",
    platform: PLATFORM_NAMES[sub.ottPlatformAddress] || "Unknown Platform",
    transactionHash: sub.transactionHash,
  }))

  const filteredTransactions = transactions.filter(
    (tx) =>
      tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.platform.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="bg-background/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-foreground">Transaction History</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-grey" />
            <input
              type="text"
              placeholder="Search transactions..."
              className="h-9 w-48 rounded-md bg-background/60 border border-brand-blue/20 pl-9 pr-4 text-sm focus:outline-none focus:border-brand-blue/50 text-foreground"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-9 border-brand-blue/30 text-brand-blue hover:bg-brand-blue/10"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-brand-blue/20">
              <th className="px-4 py-3 text-left text-xs font-medium text-brand-grey uppercase tracking-wider">
                Transaction
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-brand-grey uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-brand-grey uppercase tracking-wider">
                Platform
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-brand-grey uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-brand-grey uppercase tracking-wider">
                Method
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-brand-grey uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-brand-grey uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-blue/10">
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-brand-grey">
                  No transactions found
                </td>
              </tr>
            ) : (
              filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-brand-blue/5">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-foreground">{transaction.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-brand-grey">{transaction.date}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-foreground">{transaction.platform}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-foreground">{transaction.amount}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-blue/20 text-brand-blue">
                      {transaction.method}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-400">
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-brand-blue hover:text-brand-blue hover:bg-brand-blue/10"
                      onClick={() => window.open(`https://sepolia.etherscan.io/tx/${transaction.transactionHash}`, "_blank")}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}