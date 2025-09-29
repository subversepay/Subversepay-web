"use client"

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

export default function MerchantSignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [currentStep, setCurrentStep] = useState(3)
  const [formData, setFormData] = useState({
    // Step 1: Business Information
    businessName: "",
    website: "",
    businessSize: "",
    industry: "",

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
    businessName: "",
    website: "",
    businessSize: "",
    industry: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    agreeTerms: "",
    agreeDataProcessing: "",
    general: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof typeof errors]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof typeof errors]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
    if (errors[name as keyof typeof errors]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const validateStep = (step: number) => {
    let valid = true
    const newErrors = { ...errors }

    if (step === 1) {
      if (!formData.businessName.trim()) {
        newErrors.businessName = "Business name is required"
        valid = false
      }
      if (!formData.website.trim()) {
        newErrors.website = "Website is required"
        valid = false
      }
      if (!formData.businessSize) {
        newErrors.businessSize = "Business size is required"
        valid = false
      }
      if (!formData.industry) {
        newErrors.industry = "Industry is required"
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
        newErrors.email = "Business email is required"
        valid = false
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email address"
        valid = false
      } else {
        // Block common free email domains
        const blockedDomains = [
          "gmail.com",
          "yahoo.com",
          "hotmail.com",
          "outlook.com",
          "aol.com",
          "protonmail.com",
          "icloud.com",
          "live.com",
        ]

        const emailDomain = formData.email.split("@")[1]?.toLowerCase()
        if (blockedDomains.includes(emailDomain)) {
          newErrors.email = "Please use your business email (not Gmail, hotmail, etc.)"
          valid = false
        }
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
        newErrors.agreeTerms = "You must agree to the terms"
        valid = false
      }
      if (!formData.agreeDataProcessing) {
        newErrors.agreeDataProcessing = "You must agree to data processing"
        valid = false
      }
    }

    setErrors(newErrors)
    return valid
  }

  const handleNextStep = () => {
    if (validateStep(currentStep)) setCurrentStep(currentStep + 1)
  }

  const handlePrevStep = () => setCurrentStep(currentStep - 1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(currentStep)) return

    setIsLoading(true)
    try {
      // TODO: replace with API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      router.push("/merchant")
    } catch {
      setErrors((prev) => ({ ...prev, general: "Signup failed. Please try again." }))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="bg-background/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Merchant Registration</h1>
          <p className="text-sm text-muted-foreground">
            Create your business account to integrate and accept payments
          </p>
        </div>

        {errors.general && (
          <div className="mb-6 p-3 bg-red-900/30 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Business Info */}
          {currentStep === 1 && (
            <>
              <div className="space-y-2.5">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  name="businessName"
                  type="text"
                  placeholder="Your Business Name"
                  value={formData.businessName}
                  onChange={handleChange}
                />
                {errors.businessName && <p className="text-red-400 text-xs">{errors.businessName}</p>}
              </div>

              <div className="space-y-2.5">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  type="text"
                  placeholder="https://yourbusiness.com"
                  value={formData.website}
                  onChange={handleChange}
                />
                {errors.website && <p className="text-red-400 text-xs">{errors.website}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2.5">
                  <Label>Business Size</Label>
                  <Select
                    value={formData.businessSize}
                    onValueChange={(value) => handleSelectChange("businessSize", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="200+">200+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.businessSize && <p className="text-red-400 text-xs">{errors.businessSize}</p>}
                </div>

                <div className="space-y-2.5">
                  <Label>Industry</Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) => handleSelectChange("industry", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="gaming">Gaming</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.industry && <p className="text-red-400 text-xs">{errors.industry}</p>}
                </div>
              </div>
            </>
          )}

          {/* Step 2: Contact Info */}
          {currentStep === 2 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && <p className="text-red-400 text-xs">{errors.firstName}</p>}
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && <p className="text-red-400 text-xs">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="email">Business Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <p className="text-red-400 text-xs">{errors.phone}</p>}
              </div>
            </>
          )}

          {/* Step 3: Account Setup */}
          {currentStep === 3 && (
            <>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-xs">{errors.password}</p>}
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => handleCheckboxChange("agreeTerms", checked as boolean)}
                  />
                  <label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-brand-blue hover:underline">
                      Terms of Service
                    </Link>
                  </label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="dataProcessing"
                    checked={formData.agreeDataProcessing}
                    onCheckedChange={(checked) => handleCheckboxChange("agreeDataProcessing", checked as boolean)}
                  />
                  <label htmlFor="dataProcessing" className="text-sm">
                    I agree to the Data Processing Agreement
                  </label>
                </div>
              </div>
            </>
          )}

          {/* Step buttons */}
          <div className="flex justify-between pt-4">
            {currentStep > 1 && (
              <Button type="button" variant="outline" onClick={handlePrevStep} disabled={isLoading}>
                Back
              </Button>
            )}
            {currentStep < 3 ? (
              <Button type="button" onClick={handleNextStep} disabled={isLoading}>
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create account"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link href="/auth/merchant/sign-in" className="text-brand-blue hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
