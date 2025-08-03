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
import { useToast } from "@/hooks/use-toast"

export default function SignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    agreeTerms: false,
    subscribeNewsletter: false,
  })
  const [errors, setErrors] = useState({
    displayName: "",
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

    if (!formData.displayName.trim()) {
      newErrors.displayName = "Name is required"
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

    try {
      const response = await fetch("http://localhost:3002/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          displayName: formData.displayName,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.errors?.[0]?.msg || data.msg || "Registration failed")
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
        title: "Registration successful",
        description: "Your account has been created.",
        variant: "success",
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
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
      <div className="bg-background/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Create your account</h1>
          <p className="text-brand-grey">Sign up to start managing your OTT subscriptions</p>
        </div>

        {errors.general && (
          <div className="mb-6 p-3 bg-red-900/30 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2.5">
            <Label htmlFor="displayName" className="inline-block mb-1">
              Full Name
            </Label>
            <Input
              id="displayName"
              name="displayName"
              type="text"
              placeholder="John Smith"
              value={formData.displayName}
              onChange={handleChange}
              className={`bg-background/60 border ${
                errors.displayName ? "border-red-500/50" : "border-brand-blue/30"
              } focus:border-brand-blue/70 h-11`}
              disabled={isLoading}
            />
            {errors.displayName && <p className="text-red-400 text-xs mt-1">{errors.displayName}</p>}
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
              className={`bg-background/60 border ${
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
            className="w-full bg-brand-blue hover:bg-brand-blue/90 text-foreground h-11 relative overflow-hidden group"
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
            <Button variant="outline" className="w-full border-brand-blue/30 text-foreground hover:bg-brand-blue/10 h-10">
              Sign up as OTT Platform
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
