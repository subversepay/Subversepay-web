"use client"

import { Button } from "@/components/ui/button"

export default function walletBalance() {
  return (
    <div className="bg-black/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-5 h-full">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-white">Wallet Balance</h2>
            <Button
            variant="outline"
            size="sm"
            className="text-xs h-8 border-brand-blue/30 text-brand-blue hover:bg-brand-blue/10"
            >
            Add Funds
            </Button>
        </div>

        <div className="space-y-4">
            <div className="bg-black/60 border border-brand-blue/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-brand-blue/20 flex items-center justify-center">
                <span className="text-brand-blue font-bold">$</span>
                </div>
                <div>
                <div className="text-white font-medium">USDC Balance</div>
                <div className="text-2xl font-bold text-white">$124.50</div>
                </div>
            </div>
            </div>

            <div className="bg-black/60 border border-brand-blue/10 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center">
                <span className="text-brand-grey font-bold">$</span>
                </div>
                <div>
                <div className="text-white font-medium">USDT Balance</div>
                <div className="text-2xl font-bold text-white">$75.00</div>
                </div>
            </div>
            </div>
        </div>

        <div className="text-sm text-brand-grey mt-4">
            Auto-convert enabled for subscription payments
        </div>
    </div>
  )
}
