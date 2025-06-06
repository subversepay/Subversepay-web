"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agreeTerms: false,
    subscribeNewsletter: false,
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    agreeTerms: "",
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

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))

    // Clear error when user checks terms
    if (name === "agreeTerms" && errors.agreeTerms) {
      setErrors((prev) => ({ ...prev, agreeTerms: "" }))
    }
  }

  const validateForm = () => {
    let valid = true
    const newErrors = { ...errors }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
      valid = false
    }

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
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
      valid = false
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setErrors({ name: "", email: "", password: "", agreeTerms: "", general: "" })

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, redirect to dashboard
      router.push("/dashboard/customer")
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: "An error occurred during sign up. Please try again.",
      }))
    } finally {
      setIsLoading(false)
    }
  }

  // Password strength indicator
  const getPasswordStrength = () => {
    const { password } = formData
    if (!password) return { strength: 0, text: "" }

    if (password.length < 8) return { strength: 1, text: "Weak" }

    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    const strength = [hasUppercase, hasLowercase, hasNumbers, hasSpecialChars].filter(Boolean).length

    if (strength <= 2) return { strength: 2, text: "Medium" }
    if (strength === 3) return { strength: 3, text: "Strong" }
    return { strength: 4, text: "Very Strong" }
  }

  const passwordStrength = getPasswordStrength()
  const strengthColors = [
    "", // Empty for index 0
    "bg-red-500", // Weak
    "bg-yellow-500", // Medium
    "bg-green-500", // Strong
    "bg-brand-blue", // Very Strong
  ]

  return (
    <div className="w-full max-w-md">
      <div className="bg-black/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Create your account</h1>
          <p className="text-brand-grey">Sign up to start managing your OTT subscriptions</p>
        </div>

        {errors.general && (
          <div className="mb-6 p-3 bg-red-900/30 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2.5">
            <Label htmlFor="name" className="inline-block mb-1">
              Full Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Smith"
              value={formData.name}
              onChange={handleChange}
              className={`bg-black/60 border ${
                errors.name ? "border-red-500/50" : "border-brand-blue/30"
              } focus:border-brand-blue/70 h-11`}
              disabled={isLoading}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

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
              className={`bg-black/60 border ${
                errors.email ? "border-red-500/50" : "border-brand-blue/30"
              } focus:border-brand-blue/70 h-11`}
              disabled={isLoading}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="password" className="inline-block mb-1">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className={`bg-black/60 border ${
                  errors.password ? "border-red-500/50" : "border-brand-blue/30"
                } focus:border-brand-blue/70 h-11 pr-10`}
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-grey hover:text-white transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}

            {formData.password && (
              <div className="mt-2">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-xs text-brand-grey">Password strength:</div>
                  <div
                    className={`text-xs ${
                      passwordStrength.strength <= 1
                        ? "text-red-400"
                        : passwordStrength.strength === 2
                          ? "text-yellow-400"
                          : passwordStrength.strength === 3
                            ? "text-green-400"
                            : "text-brand-blue"
                    }`}
                  >
                    {passwordStrength.text}
                  </div>
                </div>
                <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${strengthColors[passwordStrength.strength]}`}
                    style={{ width: `${passwordStrength.strength * 25}%` }}
                  ></div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="flex items-center gap-1 text-xs text-brand-grey">
                    <Check
                      className={`h-3 w-3 ${formData.password.length >= 8 ? "text-green-400" : "text-brand-grey"}`}
                    />
                    <span>At least 8 characters</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-brand-grey">
                    <Check
                      className={`h-3 w-3 ${/[A-Z]/.test(formData.password) ? "text-green-400" : "text-brand-grey"}`}
                    />
                    <span>Uppercase letter</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-brand-grey">
                    <Check
                      className={`h-3 w-3 ${/\d/.test(formData.password) ? "text-green-400" : "text-brand-grey"}`}
                    />
                    <span>Number</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-brand-grey">
                    <Check
                      className={`h-3 w-3 ${/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? "text-green-400" : "text-brand-grey"}`}
                    />
                    <span>Special character</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3 py-1">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => handleCheckboxChange("agreeTerms", checked as boolean)}
                className="border-brand-blue/50 data-[state=checked]:bg-brand-blue data-[state=checked]:border-brand-blue mt-1"
              />
              <div>
                <label
                  htmlFor="terms"
                  className="text-sm text-brand-grey leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-brand-blue hover:text-brand-blue/80 transition-colors inline-flex items-center"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-brand-blue hover:text-brand-blue/80 transition-colors inline-flex items-center"
                  >
                    Privacy Policy
                  </Link>
                </label>
                {errors.agreeTerms && <p className="text-red-400 text-xs mt-1">{errors.agreeTerms}</p>}
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="newsletter"
                checked={formData.subscribeNewsletter}
                onCheckedChange={(checked) => handleCheckboxChange("subscribeNewsletter", checked as boolean)}
                className="border-brand-blue/50 data-[state=checked]:bg-brand-blue data-[state=checked]:border-brand-blue mt-1"
              />
              <label
                htmlFor="newsletter"
                className="text-sm text-brand-grey leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I want to receive updates about new OTT platforms and promotions
              </label>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white h-11 relative overflow-hidden group"
            disabled={isLoading}
          >
            <span className="relative z-10 flex items-center">
              {isLoading ? "Creating account..." : "Create account"}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
            </span>
            <span className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></span>
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-brand-grey text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-brand-blue hover:text-brand-blue/80 transition-colors inline-flex items-center"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-brand-blue/20">
          <p className="text-center text-xs text-brand-grey mb-4">Are you an OTT platform?</p>
          <Link href="/signup/business" className="block w-full">
            <Button variant="outline" className="w-full border-brand-blue/30 text-white hover:bg-brand-blue/10 h-10">
              Sign up as OTT Platform
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
