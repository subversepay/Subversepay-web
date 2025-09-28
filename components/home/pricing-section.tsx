"use client"

import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

export default function PricingSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const plan = {
    name: "Flat Pricing",
    fee: "1% + 0.2$",
    description: "Simple, transparent fees for every transaction. No setup costs, no hidden charges.",
    features: [
      "Instant API integration",
      "Secure stablecoin & fiat settlements",
      "Real-time reporting & analytics",
      "24/7 merchant support",
    ],
  }

  return (
    <section id="pricing" className="py-20 relative" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute left-0 top-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent"></div>
        <div className="absolute left-1/2 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-brand-blue/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            inView ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground text-lg">
            One flat rate for all merchants. No setup fees. No hidden costs.
          </p>
        </div>

        {/* Pricing Card */}
        <div
          className={`relative group transition-all duration-700 ${
            inView ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
          } max-w-md mx-auto`}
        >
          {/* Card background & border */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute inset-0 border border-brand-blue/30 rounded-xl"></div>
          <div className="absolute inset-0 backdrop-blur-sm rounded-xl"></div>

          <div className="relative bg-background/50 rounded-xl overflow-hidden z-10 border border-brand-blue/10 hover:border-brand-blue/30 transition-colors">
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-2 text-foreground">{plan.name}</h3>
              <div className="flex items-end justify-center gap-1 mb-4">
                <span className="text-4xl font-bold text-foreground">{plan.fee}</span>
                <span className="text-muted-foreground">per transaction</span>
              </div>
              <p className="text-muted-foreground mb-6">{plan.description}</p>

              <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-primary-foreground">
                Get Started
              </Button>
            </div>

            {/* Features */}
            <div className="p-6 border-t border-brand-blue/30">
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-blue shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom CTA (moved outside the card) */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          High volume business?{" "}
          <a href="/contact" className="text-brand-blue hover:underline">
            Contact us for custom pricing
          </a>
        </p>
      </div>
    </section>
  )
}
