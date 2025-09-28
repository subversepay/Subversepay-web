"use client"

import { useInView } from "react-intersection-observer"
import { CreditCard, Shield, Zap, BarChart3, Wallet, Network } from "lucide-react"

export default function FeaturesSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const features = [
    {
      icon: Network,
      title: "Easy API Integration",
      description: "Plug-and-play REST APIs and SDKs for quick onboarding into your platform.",
    },
    {
      icon: CreditCard,
      title: "Multi-Currency Payments",
      description: "Accept stablecoins (USDC, USDT, DAI) and fiat seamlessly in one checkout flow.",
    },
    {
      icon: Zap,
      title: "Instant Settlement",
      description: "Receive your funds in minutes, not days. No waiting for bank clearing times.",
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Track transactions, revenue, and customer trends with powerful dashboards.",
    },
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description: "PCI-DSS compliance, fraud monitoring, and encryption keep your business safe.",
    },
    {
      icon: Wallet,
      title: "Transparent Pricing",
      description: "Flat 1% + 0.2$ per transaction with no hidden fees. High-volume merchants get discounts.",
    },
  ]

  return (
    <section id="features" className="container px-4 py-20 relative" ref={ref}>
      {/* Background blur */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-3xl -z-10" />

      {/* Section heading */}
      <div
        className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
          inView ? "opacity-100" : "opacity-0 translate-y-4"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          Powerful Payments for Merchants
        </h2>
        <p className="text-muted-foreground text-lg">
          Everything you need to accept payments, manage revenue, and grow your business securely.
        </p>
      </div>

      {/* Features grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div
              key={index}
              className={`relative group transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative bg-background/60 backdrop-blur-sm rounded-xl p-6 border border-brand-blue/20 hover:border-brand-blue/40 transition-colors">
                {/* Icon with glow */}
                <div className="mb-4 relative">
                  <Icon className="h-10 w-10 text-brand-blue" aria-hidden="true" />
                  <div className="absolute -inset-2 bg-brand-blue/20 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
