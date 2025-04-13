"use client"
import { useInView } from "react-intersection-observer"
import { CreditCard, Shield, Zap, BarChart3, Wallet, Tv } from "lucide-react"

export default function FeaturesSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const features = [
    {
      icon: <Tv className="h-10 w-10 text-brand-blue" />,
      title: "OTT Platform Integration",
      description: "Connect with Netflix, Disney+, HBO Max, and other major streaming services.",
    },
    {
      icon: <CreditCard className="h-10 w-10 text-brand-blue" />,
      title: "Stablecoin Payments",
      description: "Pay for subscriptions with USDC, USDT, DAI and other major stablecoins.",
    },
    {
      icon: <Zap className="h-10 w-10 text-brand-blue" />,
      title: "Instant Activation",
      description: "Get immediate access to your subscriptions after payment confirmation.",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-brand-blue" />,
      title: "Subscription Management",
      description: "Manage all your OTT subscriptions in one dashboard with detailed analytics.",
    },
    {
      icon: <Shield className="h-10 w-10 text-brand-blue" />,
      title: "Secure Transactions",
      description: "Your payments are protected with military-grade encryption and security protocols.",
    },
    {
      icon: <Wallet className="h-10 w-10 text-brand-blue" />,
      title: "Subscription Savings",
      description: "Save up to 15% on subscription fees compared to direct payments.",
    },
  ]

  return (
    <section id="features" className="py-20 relative" ref={ref}>
      {/* Background elements */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute left-0 top-1/3 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent"></div>
        <div className="absolute left-1/3 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-brand-blue/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4">
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            inView ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Streamlined OTT Subscription Management
          </h2>
          <p className="text-brand-grey text-lg">
            Everything you need to manage and pay for your streaming subscriptions with stablecoins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative group transition-all duration-700 delay-${index * 100} ${
                inView ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 border border-brand-blue/30 rounded-xl"></div>
              <div className="absolute inset-0 backdrop-blur-sm rounded-xl"></div>

              {/* Glowing corners */}
              <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-brand-blue/50 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-brand-blue/50 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-brand-blue/50 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-brand-blue/50 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative bg-black/50 backdrop-blur-sm rounded-xl p-6 z-10 border border-brand-blue/10 hover:border-brand-blue/30 transition-colors">
                <div className="mb-4 relative">
                  {feature.icon}
                  <div className="absolute -inset-1 bg-brand-blue/20 rounded-full blur-md opacity-0 group-hover:opacity-70 transition-opacity"></div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-brand-grey">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
