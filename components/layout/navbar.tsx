"use client"

import { useState, useEffect, useContext } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, Sun, Moon } from "lucide-react"
import { WalletContext } from "@/context/walletContext"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { DisConnectWallet, currentAccount } = useContext(WalletContext)
  const [mode, setMode] = useState("light");
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      setMode("light");
      localStorage.setItem('theme', 'light');
    } else {
      html.classList.add('dark');
      setMode("dark");
      localStorage.setItem('theme', 'dark');
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
      setMode("dark");
    } else {
      document.documentElement.classList.remove('dark');
      setMode("light");
    }
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-brand-blue/30" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-10 w-10 transition-transform duration-500 group-hover:rotate-180">
              {/* <div className="absolute inset-0 bg-brand-blue rounded-full opacity-80 group-hover:opacity-100 transition-opacity"></div> */}
              <div className="absolute inset-[3px] bg-background rounded-full flex items-center justify-center">
                <Image src="/Subversepay-web/subv-logoblack.png" alt="subversepay logo" width={50} height={50} />
              </div>
              <div className="absolute inset-0 border-2 border-brand-blue/50 rounded-full animate-pulse"></div>
            </div>
            <span className="text-xl font-bold text-brand-blue relative">
              SubversePay
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-blue to-transparent"></span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              <Link href="/#features" className="text-muted-foreground hover:text-foreground transition-colors relative group">
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-blue group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/#platforms" className="text-muted-foreground hover:text-foreground transition-colors relative group">
                OTT Platforms
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-blue group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/#pricing" className="text-muted-foreground hover:text-foreground transition-colors relative group">
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-blue group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/#testimonials" className="text-muted-foreground hover:text-foreground transition-colors relative group">
                Testimonials
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-blue group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>
           
            {/* Theme Toggle Button */}
            <Button variant="ghost" onClick={toggleTheme} className="flex items-center gap-2">
              {mode === "light" ? <Moon /> : <Sun />}
              <span className="hidden sm:inline">{mode === "light" ? "Dark Mode" : "Light Mode"}</span>
            </Button>

            <div className="flex items-center gap-4">
              {!currentAccount ? (
                <>
                  <Button
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground relative overflow-hidden group"
                    onClick={() => router.push("/auth")}
                  >
                    <span className="relative z-10">Sign In</span>
                    <span className="absolute inset-0 w-0 bg-brand-blue/20 group-hover:w-full transition-all duration-300"></span>
                  </Button>
                  <Button
                    onClick={() => router.push("/auth")}
                    className="bg-brand-blue hover:bg-brand-blue/90 text-primary-foreground relative overflow-hidden group"
                  >
                    <span className="relative z-10">Get Started</span>
                    <span className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-primary-foreground opacity-20 group-hover:animate-shine"></span>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground relative overflow-hidden group"
                    onClick={() => router.push("/dashboard")}
                  >
                    <span className="relative z-10">Dashboard</span>
                    <span className="absolute inset-0 w-0 bg-brand-blue/20 group-hover:w-full transition-all duration-300"></span>
                  </Button>
                  <Button
                    onClick={DisConnectWallet}
                    className="bg-brand-blue hover:bg-brand-blue/90 text-primary-foreground relative overflow-hidden group"
                  >
                    <span className="relative z-10">Disconnect</span>
                    <span className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-primary-foreground opacity-20 group-hover:animate-shine"></span>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-muted-foreground hover:text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 border-b border-brand-blue/30 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col gap-4">
              <Link
                href="/#features"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/#platforms"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                OTT Platforms
              </Link>
              <Link
                href="/#pricing"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/#testimonials"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-muted-foreground">
                {!currentAccount ? (
                  <>
                    <Button
                      variant="ghost"
                      className="justify-start text-muted-foreground hover:text-foreground"
                      onClick={() => {
                        router.push("/auth")
                        setIsMenuOpen(false)
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      className="bg-brand-blue hover:bg-brand-blue/90 text-primary-foreground"
                      onClick={() => {
                        router.push("/auth")
                        setIsMenuOpen(false)
                      }}
                    >
                      Get Started
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      className="justify-start text-muted-foreground hover:text-foreground"
                      onClick={() => {
                        router.push("/dashboard")
                        setIsMenuOpen(false)
                      }}
                    >
                      Dashboard
                    </Button>
                    <Button
                      className="bg-brand-blue hover:bg-brand-blue/90 text-primary-foreground"
                      onClick={() => {
                        DisConnectWallet()
                        setIsMenuOpen(false)
                      }}
                    >
                      Disconnect
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}