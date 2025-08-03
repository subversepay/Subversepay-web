"use client"

import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

export default function PricingSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const plans = [
    {
      name: "Basic",
      price: "$9",
      description: "Perfect for individuals with a few streaming subscriptions.",
      features: [
        "Manage up to 3 OTT subscriptions",
        "Pay with USDC and USDT",
        "Save up to 5% on subscription fees",
        "Email support",
        "Basic analytics",
      ],
    },
    {
      name: "Premium",
      price: "$19",
      description: "Ideal for streaming enthusiasts with multiple subscriptions.",
      features: [
        "Manage unlimited OTT subscriptions",
        "Pay with any stablecoin",
        "Save up to 10% on subscription fees",
        "Priority support",
        "Advanced analytics",
        "Family account sharing",
      ],
      highlighted: true,
    },
    {
      name: "Business",
      price: "Custom",
      description: "For OTT platforms and businesses requiring API integration.",
      features: [
        "Full API access for OTT platforms",
        "Custom integration solutions",
        "White-label options",
        "24/7 dedicated support",
        "Enterprise-grade security",
        "Custom reporting",
        "SLA guarantees",
      ],
    },
  ]

  return (
    <section id="pricing" className="py-20 relative" ref={ref}>
      {/* Background elements */}
      <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute left-0 top-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent"></div>
        <div className="absolute left-1/2 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-brand-blue/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4">
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            inView ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Simple, Transparent Subscription Plans
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose the plan that works best for your streaming needs. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative group transition-all duration-700 delay-${index * 200} ${
                inView ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
              }`}
            >
              <div
                className={`absolute inset-0 ${
                  plan.highlighted
                    ? "bg-gradient-to-b from-brand-blue/30 to-transparent"
                    : "bg-gradient-to-br from-brand-blue/10 to-transparent"
                } rounded-xl opacity-0 group-hover:opacity-100 transition-opacity`}
              ></div>

              <div
                className={`absolute inset-0 border ${
                  plan.highlighted ? "border-brand-blue" : "border-brand-blue/30"
                } rounded-xl`}
              ></div>

              <div className="absolute inset-0 backdrop-blur-sm rounded-xl"></div>

              {/* Glowing effect on hover */}
              <div
                className={`absolute -inset-0.5 bg-gradient-to-r from-brand-blue/0 via-brand-blue/30 to-brand-blue/0 rounded-xl opacity-0 ${
                  plan.highlighted ? "opacity-50" : ""
                } group-hover:opacity-100 blur-sm transition-opacity`}
              ></div>

              <div
                className={`relative bg-background/50 backdrop-blur-sm rounded-xl overflow-hidden z-10 ${
                  plan.highlighted
                    ? "border-2 border-brand-blue"
                    : "border border-brand-blue/10 hover:border-brand-blue/30"
                } transition-colors`}
              >
                {plan.highlighted && <div className="absolute top-0 left-0 w-full h-1 bg-brand-blue"></div>}

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-foreground flex items-center">
                    {plan.name}
                    {plan.highlighted && (
                      <span className="ml-2 text-xs bg-brand-blue text-primary-foreground px-2 py-0.5 rounded-full">Popular</span>
                    )}
                  </h3>
                  <div className="flex items-end gap-1 mb-4">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                  </div>
                  <p className="text-muted-foreground mb-6">{plan.description}</p>

                  <Button
                    className={`w-full relative overflow-hidden group ${
                      plan.highlighted
                        ? "bg-brand-blue hover:bg-brand-blue/90 text-primary-foreground"
                        : "bg-background/80 hover:bg-background/90 text-foreground"
                    }`}
                  >
                    <span className="relative z-10">{plan.price === "Custom" ? "Contact Sales" : "Get Started"}</span>
                    <span className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-primary-foreground opacity-20 group-hover:animate-shine"></span>
                  </Button>
                </div>

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
          ))}
        </div>
      </div>
    </section>
  )
}