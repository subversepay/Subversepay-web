"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = () => {
    if (!email) {
      setError("Email is required")
      return false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email is invalid")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSubmitted(true)
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-black/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Reset your password</h1>
          <p className="text-brand-grey">
            {isSubmitted
              ? "Check your email for reset instructions"
              : "Enter your email and we'll send you a link to reset your password"}
          </p>
        </div>

        {isSubmitted ? (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-900/30 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-400" />
              </div>
            </div>
            <p className="text-brand-grey mb-6">
              We've sent a password reset link to <span className="text-white font-medium">{email}</span>
            </p>
            <p className="text-sm text-brand-grey mb-8">
              If you don't see the email in your inbox, please check your spam folder or{" "}
              <button
                className="text-brand-blue hover:text-brand-blue/80 transition-colors inline-flex items-center"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                try sending it again
              </button>
            </p>
            <Link href="/login" className="block w-full">
              <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white h-11 relative overflow-hidden group">
                <span className="relative z-10 flex items-center">
                  Return to sign in
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></span>
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-6 p-3 bg-red-900/30 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2.5">
                <Label htmlFor="email" className="inline-block mb-1">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (error) setError("")
                  }}
                  className="bg-black/60 border border-brand-blue/30 focus:border-brand-blue/70 h-11"
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white h-11 relative overflow-hidden group"
                disabled={isLoading}
              >
                <span className="relative z-10 flex items-center">
                  {isLoading ? "Sending..." : "Send reset link"}
                  {!isLoading && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                </span>
                <span className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></span>
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-brand-grey text-sm">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="text-brand-blue hover:text-brand-blue/80 transition-colors inline-flex items-center"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
