"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, ArrowRight, Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function BusinessSignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Company Information
    companyName: "",
    website: "",
    companySize: "",
    platformType: "",

    // Step 2: Contact Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Step 3: Account Setup
    password: "",
    agreeTerms: false,
    agreeDataProcessing: false,
  })

  const [errors, setErrors] = useState({
    // Step 1
    companyName: "",
    website: "",
    companySize: "",
    platformType: "",

    // Step 2
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Step 3
    password: "",
    agreeTerms: "",
    agreeDataProcessing: "",

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

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user selects
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))

    // Clear error when user checks
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateStep = (step: number) => {
    let valid = true
    const newErrors = { ...errors }

    if (step === 1) {
      if (!formData.companyName.trim()) {
        newErrors.companyName = "Company name is required"
        valid = false
      }

      if (!formData.website.trim()) {
        newErrors.website = "Website is required"
        valid = false
      } else if (!/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?/.test(formData.website)) {
        newErrors.website = "Please enter a valid website URL"
        valid = false
      }

      if (!formData.companySize) {
        newErrors.companySize = "Company size is required"
        valid = false
      }

      if (!formData.platformType) {
        newErrors.platformType = "Platform type is required"
        valid = false
      }
    }

    if (step === 2) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required"
        valid = false
      }

      if (!formData.lastName.trim()) {
        newErrors.lastName = "Last name is required"
        valid = false
      }

      if (!formData.email) {
        newErrors.email = "Email is required"
        valid = false
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid"
        valid = false
      }

      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required"
        valid = false
      }
    }

    if (step === 3) {
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

      if (!formData.agreeDataProcessing) {
        newErrors.agreeDataProcessing = "You must agree to the data processing agreement"
        valid = false
      }
    }

    setErrors(newErrors)
    return valid
  }

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep(currentStep)) return

    setIsLoading(true)
    setErrors({ ...errors, general: "" })

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, redirect to dashboard
      router.push("/dashboard")
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
    <div className="w-full max-w-2xl">
      <div className="bg-background/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">OTT Platform Registration</h1>
          <p className="text-brand-grey">Join SubversePay to offer stablecoin payments for your subscribers</p>
        </div>

        {errors.general && (
          <div className="mb-6 p-3 bg-red-900/30 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {errors.general}
          </div>
        )}

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep === step
                      ? "bg-brand-blue text-foreground"
                      : currentStep > step
                        ? "bg-brand-blue/20 text-brand-blue"
                        : "bg-gray-800 text-muted-foreground"
                  }`}
                >
                  {currentStep > step ? <Check className="h-5 w-5" /> : step}
                </div>
                <div
                  className={`text-xs mt-2 ${
                    currentStep === step ? "text-foreground" : currentStep > step ? "text-brand-blue" : "text-muted-foreground"
                  }`}
                >
                  {step === 1 ? "Company" : step === 2 ? "Contact" : "Account"}
                </div>
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800 rounded-full"></div>
            <div
              className="absolute top-0 left-0 h-1 bg-brand-blue rounded-full transition-all duration-300"
              style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Company Information */}
          {currentStep === 1 && (
            <>
              <div className="space-y-2.5">
                <Label htmlFor="companyName" className="inline-block mb-1">
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  name="companyName"
                  type="text"
                  placeholder="Your OTT Platform Name"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={`bg-background/60 border ${
                    errors.companyName ? "border-red-500/50" : "border-brand-blue/30"
                  } focus:border-brand-blue/70 h-11`}
                  disabled={isLoading}
                />
                {errors.companyName && <p className="text-red-400 text-xs mt-1">{errors.companyName}</p>}
              </div>

              <div className="space-y-2.5">
                <Label htmlFor="website" className="inline-block mb-1">
                  Website
                </Label>
                <Input
                  id="website"
                  name="website"
                  type="text"
                  placeholder="https://yourplatform.com"
                  value={formData.website}
                  onChange={handleChange}
                  className={`bg-background/60 border ${
                    errors.website ? "border-red-500/50" : "border-brand-blue/30"
                  } focus:border-brand-blue/70 h-11`}
                  disabled={isLoading}
                />
                {errors.website && <p className="text-red-400 text-xs mt-1">{errors.website}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2.5">
                  <Label htmlFor="companySize" className="inline-block mb-1">
                    Company Size
                  </Label>
                  <Select
                    value={formData.companySize}
                    onValueChange={(value) => handleSelectChange("companySize", value)}
                  >
                    <SelectTrigger
                      id="companySize"
                      className={`bg-background/60 border ${
                        errors.companySize ? "border-red-500/50" : "border-brand-blue/30"
                      } focus:border-brand-blue/70 h-11`}
                    >
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="501+">501+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.companySize && <p className="text-red-400 text-xs mt-1">{errors.companySize}</p>}
                </div>

                <div className="space-y-2.5">
                  <Label htmlFor="platformType" className="inline-block mb-1">
                    Platform Type
                  </Label>
                  <Select
                    value={formData.platformType}
                    onValueChange={(value) => handleSelectChange("platformType", value)}
                  >
                    <SelectTrigger
                      id="platformType"
                      className={`bg-background/60 border ${
                        errors.platformType ? "border-red-500/50" : "border-brand-blue/30"
                      } focus:border-brand-blue/70 h-11`}
                    >
                      <SelectValue placeholder="Select platform type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="streaming">Video Streaming</SelectItem>
                      <SelectItem value="music">Music Streaming</SelectItem>
                      <SelectItem value="gaming">Gaming</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.platformType && <p className="text-red-400 text-xs mt-1">{errors.platformType}</p>}
                </div>
              </div>
            </>
          )}

          {/* Step 2: Contact Information */}
          {currentStep === 2 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2.5">
                  <Label htmlFor="firstName" className="inline-block mb-1">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`bg-background/60 border ${
                      errors.firstName ? "border-red-500/50" : "border-brand-blue/30"
                    } focus:border-brand-blue/70 h-11`}
                    disabled={isLoading}
                  />
                  {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
                </div>

                <div className="space-y-2.5">
                  <Label htmlFor="lastName" className="inline-block mb-1">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Smith"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`bg-background/60 border ${
                      errors.lastName ? "border-red-500/50" : "border-brand-blue/30"
                    } focus:border-brand-blue/70 h-11`}
                    disabled={isLoading}
                  />
                  {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div className="space-y-2.5">
                <Label htmlFor="email" className="inline-block mb-1">
                  Business Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@yourcompany.com"
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
                <Label htmlFor="phone" className="inline-block mb-1">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`bg-background/60 border ${
                    errors.phone ? "border-red-500/50" : "border-brand-blue/30"
                  } focus:border-brand-blue/70 h-11`}
                  disabled={isLoading}
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>
            </>
          )}

          {/* Step 3: Account Setup */}
          {currentStep === 3 && (
            <>
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
                    id="dataProcessing"
                    checked={formData.agreeDataProcessing}
                    onCheckedChange={(checked) => handleCheckboxChange("agreeDataProcessing", checked as boolean)}
                    className="border-brand-blue/50 data-[state=checked]:bg-brand-blue data-[state=checked]:border-brand-blue mt-1"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <label
                        htmlFor="dataProcessing"
                        className="text-sm text-brand-grey leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the Data Processing Agreement
                      </label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3.5 w-3.5 text-brand-grey cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>
                              This agreement covers how SubversePay processes user data for your OTT platform in
                              compliance with privacy regulations.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    {errors.agreeDataProcessing && (
                      <p className="text-red-400 text-xs mt-1">{errors.agreeDataProcessing}</p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="flex justify-between pt-4">
            {currentStep > 1 ? (
              <Button
                type="button"
                variant="outline"
                className="border-brand-blue/30 text-foreground hover:bg-brand-blue/10 h-11"
                onClick={handlePrevStep}
                disabled={isLoading}
              >
                Back
              </Button>
            ) : (
              <div></div> // Empty div to maintain flex spacing
            )}

            {currentStep < 3 ? (
              <Button
                type="button"
                className="bg-brand-blue hover:bg-brand-blue/90 text-foreground h-11 relative overflow-hidden group"
                onClick={handleNextStep}
                disabled={isLoading}
              >
                <span className="relative z-10 flex items-center">
                  Next
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></span>
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-brand-blue hover:bg-brand-blue/90 text-foreground h-11 relative overflow-hidden group"
                disabled={isLoading}
              >
                <span className="relative z-10 flex items-center">
                  {isLoading ? "Creating account..." : "Create account"}
                  {!isLoading && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                </span>
                <span className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></span>
              </Button>
            )}
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-brand-grey text-sm">
            Already have a business account?{" "}
            <Link
              href="/login/business"
              className="text-brand-blue hover:text-brand-blue/80 transition-colors inline-flex items-center"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
