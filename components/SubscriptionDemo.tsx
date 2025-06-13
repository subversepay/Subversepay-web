"use client"

import { useContext, useState } from "react"
import { WalletContext } from "@/context/walletContext"
import { useSubscription } from "@/hooks/useSubscription"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SubscriptionDemo() {
  const { wallets } = useContext(WalletContext)
  const { subscribeStablecoin, subscribeSubv, isSubscriptionActive, getDetails } = useSubscription()

  const [ottPlatform, setOttPlatform] = useState("")
  const [stablecoin, setStablecoin] = useState("")
  const [amount, setAmount] = useState("")
  const [duration, setDuration] = useState(30)
  const [status, setStatus] = useState<string | null>(null)
  const [details, setDetails] = useState<any>(null)

  const handleStablecoinSubscribe = async () => {
    if (!wallets?.[0]) return alert("Connect wallet")
    await subscribeStablecoin(ottPlatform, stablecoin, amount, duration)
  }

  const handleSubvSubscribe = async () => {
    if (!wallets?.[0]) return alert("Connect wallet")
    await subscribeSubv(ottPlatform, amount, duration)
  }

  const handleCheckStatus = async () => {
    if (!wallets?.[0]) return
    const active = await isSubscriptionActive(wallets[0], ottPlatform)
    setStatus(active ? "Active" : "Inactive")
  }

  const handleGetDetails = async () => {
    if (!wallets?.[0]) return
    const info = await getDetails(wallets[0], ottPlatform)
    setDetails(info)
  }

  return (
    <div className="space-y-4 p-4 border rounded">
      <h2 className="text-xl font-semibold">Subscription Contract Demo</h2>
      <Input placeholder="OTT Platform Address" value={ottPlatform} onChange={e => setOttPlatform(e.target.value)} />
      <Input placeholder="Stablecoin Address" value={stablecoin} onChange={e => setStablecoin(e.target.value)} />
      <Input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <Input placeholder="Duration (days)" type="number" value={duration} onChange={e => setDuration(Number(e.target.value))} />
      <div className="flex gap-2">
        <Button onClick={handleStablecoinSubscribe}>Subscribe (Stablecoin)</Button>
        <Button onClick={handleSubvSubscribe}>Subscribe (SUBV)</Button>
        <Button variant="outline" onClick={handleCheckStatus}>Check Subscription Status</Button>
        <Button variant="outline" onClick={handleGetDetails}>Get Subscription Details</Button>
      </div>
      {status && <div>Status: <strong>{status}</strong></div>}
      {details && (
        <pre className="bg-muted p-2 rounded text-xs">{JSON.stringify(details, null, 2)}</pre>
      )}
    </div>
  )
}