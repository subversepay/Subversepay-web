"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, rememberMe: checked }))
  }

  const validateForm = () => {
    let valid = true
    const newErrors = { ...errors }

    if (!formData.email) {
      newErrors.email = "Email is required"
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
      valid = false
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:3002/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.errors?.[0]?.msg || data.msg || "Login failed")
      }

      // Store token in localStorage
      localStorage.setItem("token", data.token)

      // Fetch user data using the token
      const userResponse = await fetch("http://localhost:3002/api/users/me", {
        headers: {
          "x-auth-token": data.token,
        },
      })

      if (userResponse.ok) {
        const userData = await userResponse.json()
        localStorage.setItem("user", JSON.stringify(userData))
      }

      toast({
        title: "Login successful",
        description: "You have been logged in.",
        variant: "success",
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-background/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome back</h1>
          <p className="text-brand-grey">Sign in to manage your OTT subscriptions</p>
        </div>

        {errors.general && (
          <div className="mb-6 p-3 bg-red-900/30 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2.5">
            <Label htmlFor="email" className="inline-block mb-1">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={`bg-background/60 border ${
                errors.email ? "border-red-500/50" : "border-brand-blue/30"
              } focus:border-brand-blue/70 h-11`}
              disabled={isLoading}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between items-center mb-1">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="text-xs text-brand-blue hover:text-brand-blue/80 transition-colors inline-flex items-center"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className={`bg-background/60 border ${
                  errors.password ? "border-red-500/50" : "border-brand-blue/30"
                } focus:border-brand-blue/70 h-11 pr-10`}
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-grey hover:text-foreground transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>

          <div className="flex items-center space-x-2 py-1">
            <Checkbox
              id="remember"
              checked={formData.rememberMe}
              onCheckedChange={handleCheckboxChange}
              className="border-brand-blue/50 data-[state=checked]:bg-brand-blue data-[state=checked]:border-brand-blue"
            />
            <label
              htmlFor="remember"
              className="text-sm text-brand-grey leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me for 30 days
            </label>
          </div>

          <Button
            type="submit"
            className="w-full bg-brand-blue hover:bg-brand-blue/90 text-foreground h-11 relative overflow-hidden group"
            disabled={isLoading}
          >
            <span className="relative z-10 flex items-center">
              {isLoading ? "Signing in..." : "Sign in"}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
            </span>
            <span className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></span>
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-brand-grey text-sm">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-brand-blue hover:text-brand-blue/80 transition-colors inline-flex items-center"
            >
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-brand-blue/20">
          <p className="text-center text-xs text-brand-grey mb-4">Are you an OTT platform?</p>
          <Link href="/login/business" className="block w-full">
            <Button variant="outline" className="w-full border-brand-blue/30 text-foreground hover:bg-brand-blue/10 h-10">
              Sign in as OTT Platform
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
