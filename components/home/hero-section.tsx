"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { ContractContext } from '../../context/contractContext'

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const { ConnectWallet, currentAccount } =  useContext(ContractContext)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  console.log("contexts :", currentAccount, ConnectWallet);
  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-blue/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-blue/5 rounded-full blur-xl -z-10 animate-pulse"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-blue/5 rounded-full blur-xl -z-10 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Animated lines */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute left-0 top-1/4 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent"></div>
        <div className="absolute left-0 top-3/4 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent"></div>
        <div className="absolute left-1/4 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-brand-blue/20 to-transparent"></div>
        <div className="absolute left-3/4 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-brand-blue/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div
            className={`inline-flex items-center gap-2 bg-gradient-to-r from-black to-black/80 backdrop-blur-sm border border-brand-blue/30 rounded-full px-4 py-1.5 mb-6 transition-all duration-1000 ${
              isVisible ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-brand-blue font-medium">Introducing SubversePay</span>
            <span className="bg-brand-blue text-white text-xs px-2 py-0.5 rounded-full">BETA</span>
          </div>

          <h1
            className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Pay for</span>
            <span className="relative ml-2">
              <span className="text-brand-blue">OTT Subscriptions</span>
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-blue to-transparent"></span>
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 block mt-2">
              with Stablecoins
            </span>
          </h1>

          <p
            className={`text-lg md:text-xl text-brand-grey mb-8 max-w-2xl transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
            }`}
          >
            Subscribe to your favorite streaming platforms like Netflix, Disney+, and HBO Max with stablecoin payments.
            Save up to 15% on subscription fees with our seamless crypto payment gateway.
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-4 mb-12 transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
            }`}
          >
            <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white px-8 py-6 text-lg relative overflow-hidden group">
              <span className="relative z-10 flex items-center">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></span>
            </Button>
            <Button
              variant="outline"
              className="border-brand-blue text-white hover:bg-brand-blue/20 px-8 py-6 text-lg relative group"
            >
              <span className="relative z-10">View Demo</span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-brand-blue/0 via-brand-blue/5 to-brand-blue/0 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Button>
          </div>

          <div
            className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-900 ${
              isVisible ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm border border-brand-blue/20 rounded-full px-4 py-2">
              <CheckCircle2 className="h-5 w-5 text-brand-blue" />
              <span className="text-gray-300">15% Savings on OTT Plans</span>
            </div>
            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm border border-brand-blue/20 rounded-full px-4 py-2">
              <CheckCircle2 className="h-5 w-5 text-brand-blue" />
              <span className="text-gray-300">Stablecoin Payments</span>
            </div>
            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm border border-brand-blue/20 rounded-full px-4 py-2">
              <CheckCircle2 className="h-5 w-5 text-brand-blue" />
              <span className="text-gray-300">Manage All Subscriptions</span>
            </div>
          </div>

          <div
            className={`relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden transition-all duration-1000 delay-1000 ${
              isVisible ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/30 to-transparent opacity-70"></div>
            <div className="absolute inset-0 backdrop-blur-[2px]"></div>
            <div className="absolute inset-0 border border-brand-blue/50 rounded-xl"></div>
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30"></div>

            {/* Glowing corners */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-brand-blue rounded-tl-xl"></div>
            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-brand-blue rounded-tr-xl"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-brand-blue rounded-bl-xl"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-brand-blue rounded-br-xl"></div>

            <Image
              src="/placeholder.jpg?height=600&width=1200"
              alt="SubversePay Dashboard"
              width={1200}
              height={600}
              className="w-full h-auto relative z-10"
            />

            {/* Animated glow */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-brand-blue to-transparent opacity-30 blur-sm animate-glow"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
