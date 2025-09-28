"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-blue/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-blue/5 rounded-full blur-xl -z-10 animate-pulse"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-blue/5 rounded-full blur-xl -z-10 animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Beta Badge */}
          <div
            className={`inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-brand-blue/30 rounded-full px-4 py-1.5 mb-6 transition-all duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-brand-blue font-medium">Introducing SubversePay</span>
            <span className="bg-brand-blue text-white text-xs px-2 py-0.5 rounded-full">BETA</span>
          </div>

          {/* Hero Title */}
          <h1
            className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
              Accept Payments
            </span>{" "}
            <span className="text-brand-blue relative">
              Seamlessly
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-blue to-transparent"></span>
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
              in Stablecoins & Fiat
            </span>
          </h1>

          {/* Sub Text */}
          <p
            className={`text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100" : "opacity-0 translate-y-4"
            }`}
          >
            The all-in-one gateway for merchants to accept crypto & fiat payments,  
            with <strong>real-time settlement</strong> and <strong>1% + 0.2$ fees</strong>.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 mb-12 transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100" : "opacity-0 translate-y-4"
            }`}
          >
            <Button
              onClick={() => router.push("/auth/merchant/sign-up")}
              className="bg-brand-blue hover:bg-brand-blue/90 text-white px-8 py-6 text-lg"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="border-brand-blue text-primary hover:bg-brand-blue/20 px-8 py-6 text-lg"
              onClick={() => router.push("/auth/merchant/sign-in")}
            >
              Sign In
            </Button>
          </div>

          {/* Feature Pills */}
          <div
            className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-900 ${
              isVisible ? "opacity-100" : "opacity-0 translate-y-4"
            }`}
          >
            {[
              "Flat 1.5% Transaction Fee",
              "Secure API Integration",
              "Instant Stablecoin Settlement",
              "24/7 Merchant Support",
            ].map((text, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-background/50 backdrop-blur-sm border border-brand-blue/20 rounded-full px-4 py-2"
              >
                <CheckCircle2 className="h-5 w-5 text-brand-blue" />
                <span className="text-muted-foreground">{text}</span>
              </div>
            ))}
          </div>

          {/* Showcase Image */}
          <div
            className={`relative w-full max-w-3xl mx-auto rounded-xl overflow-hidden transition-all duration-1000 delay-1000 ${
              isVisible ? "opacity-100" : "opacity-0 translate-y-4"
            }`}
          >
            <Image
              src="/Subversepay-web/VolStable.png"
              alt="Merchant Dashboard Preview"
              width={400}
              height={350}
              className="w-full h-auto rounded-xl"
              priority
            />
            <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-brand-blue to-transparent opacity-30 blur-sm animate-glow"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
