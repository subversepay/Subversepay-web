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

export default function BusinessLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
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
    setErrors({ email: "", password: "", general: "" })

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: "Invalid email or password. Please try again.",
      }))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-background/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">OTT Platform Sign In</h1>
          <p className="text-brand-grey">Access your SubversePay business dashboard</p>
        </div>

        {errors.general && (
          <div className="mb-6 p-3 bg-red-900/30 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Business Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="admin@yourcompany.com"
              value={formData.email}
              onChange={handleChange}
              className={`bg-background/60 border ${
                errors.email ? "border-red-500/50" : "border-brand-blue/30"
              } focus:border-brand-blue/70 h-11`}
              disabled={isLoading}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
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

          <div className="flex items-center space-x-2">
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
            Don't have a business account?{" "}
            <Link
              href="/signup/business"
              className="text-brand-blue hover:text-brand-blue/80 transition-colors inline-flex items-center"
            >
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-brand-blue/20">
          <p className="text-center text-xs text-brand-grey mb-4">Are you a regular user?</p>
          <Link href="/login" className="block w-full">
            <Button variant="outline" className="w-full border-brand-blue/30 text-foreground hover:bg-brand-blue/10 h-10">
              Sign in as User
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
