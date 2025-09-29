"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Sun, Moon } from "lucide-react"

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Testimonials", href: "/#testimonials" },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mode, setMode] = useState("light")
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    const html = document.documentElement
    if (html.classList.contains("dark")) {
      html.classList.remove("dark")
      setMode("light")
      localStorage.setItem("theme", "light")
    } else {
      html.classList.add("dark")
      setMode("dark")
      localStorage.setItem("theme", "dark")
    }
  }

  useEffect(() => {
    const saved = localStorage.getItem("theme")
    if (saved === "dark") {
      document.documentElement.classList.add("dark")
      setMode("dark")
    }
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-brand-blue/30"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-10 w-10">
            <Image
              src="/Subversepay-web/subv-logoblack.png"
              alt="SubversePay logo"
              fill
              className="object-contain"
            />
          </div>
        <span>
          <span className="text-xl font-bold text-brand-blue">Subverse
          </span>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
          Pay
          </span>
        </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-blue group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}

          <Button variant="ghost" onClick={toggleTheme} className="flex items-center gap-2">
            {mode === "light" ? <Moon /> : <Sun />}
            <span className="hidden sm:inline">
              {mode === "light" ? "Dark Mode" : "Light Mode"}
            </span>
          </Button>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/auth/merchant/sign-in")}
            >
              Sign In
            </Button>
            <Button
              onClick={() => router.push("/auth/merchant/sign-up")}
              className="bg-brand-blue hover:bg-brand-blue/90 text-white"
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-muted-foreground hover:text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 border-b border-brand-blue/30 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="py-2 text-muted-foreground hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}

            <Button variant="ghost" onClick={toggleTheme} className="flex items-center gap-2">
              {mode === "light" ? <Moon /> : <Sun />}
              <span>{mode === "light" ? "Dark Mode" : "Light Mode"}</span>
            </Button>

            <div className="flex flex-col gap-2 pt-4 border-t border-muted-foreground">
              <Button
                variant="ghost"
                onClick={() => {
                  router.push("/auth/merchant/sign-in")
                  setIsMenuOpen(false)
                }}
              >
                Sign In
              </Button>
              <Button
                onClick={() => {
                  router.push("/auth/merchant/sign-up")
                  setIsMenuOpen(false)
                }}
                className="bg-brand-blue hover:bg-brand-blue/90 text-white"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
