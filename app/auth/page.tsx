"use client"

import type React from "react"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

function AuthContent() {
  const [activeTab, setActiveTab] = useState("login")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const searchParams = useSearchParams();
  
  const next = searchParams.get("next");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    displayName: "",
  })

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    })
  }

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:3002/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
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
          'x-auth-token': data.token,
        },
      })

      if (userResponse.ok) {
        const userData = await userResponse.json()
        localStorage.setItem("user", JSON.stringify(userData))
      }

      toast({
        title: "Login successful",
        description: "Welcome back to SubversePay!",
        variant: "success",
      })

      router.push(next || "/dashboard");
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:3002/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
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
             'x-auth-token': data.token,
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
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

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          {/* <h1 className="text-3xl font-bold mb-2">Welcome to SubversePay</h1> */}
          <p className="text-brand-grey">Access your OTT subscription dashboard</p>
        </div>

        <Card className="border-brand-blue/30 bg-background/60 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-center">Authentication</CardTitle>
            <CardDescription className="text-center">Sign in or create your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        required
                        className="bg-background/60 border-brand-blue/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        required
                        className="bg-background/60 border-brand-blue/30"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-brand-blue hover:bg-brand-blue/90" disabled={isLoading}>
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="register">
                <form onSubmit={handleRegister}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Name</Label>
                      <Input
                        id="displayName"
                        name="displayName"
                        placeholder="Enter your name"
                        value={registerData.displayName}
                        onChange={handleRegisterChange}
                        required
                        className="bg-background/60 border-brand-blue/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={registerData.email}
                        onChange={handleRegisterChange}
                        required
                        className="bg-background/60 border-brand-blue/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Create a password"
                        value={registerData.password}
                        onChange={handleRegisterChange}
                        required
                        className="bg-background/60 border-brand-blue/30"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-brand-blue hover:bg-brand-blue/90" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Register"}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="text-center">
            <p className="text-sm text-brand-grey">
              By continuing, you agree to our{" "}
              <Link href="/terms" className="text-brand-blue hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-brand-blue hover:underline">
                Privacy Policy
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthContent />
    </Suspense>
  );
}
