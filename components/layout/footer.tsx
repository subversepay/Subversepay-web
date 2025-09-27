import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Twitter, Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-background border-t border-brand-blue/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="relative h-10 w-10">
                {/* <div className="absolute inset-0 bg-brand-blue rounded-full opacity-80 group-hover:opacity-100 transition-opacity"></div> */}
                <div className="absolute inset-[3px] bg-background rounded-full flex items-center justify-center">
                  <Image src="/Subversepay-web/subv-logoblack.png" alt="subversepay logo" width={50} height={50} />
                </div>
                <div className="absolute inset-0 border border-brand-blue/50 rounded-full"></div>
              </div>
              <span className="text-xl font-bold text-brand-blue relative">
                SubversePay
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-blue group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              The next-generation cryptocurrency payment gateway for modern businesses. Accept crypto payments
              seamlessly and securely.
            </p>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-muted-foreground hover:text-foreground hover:bg-brand-blue/20 relative group"
              >
                <Twitter className="h-5 w-5 relative z-10" />
                <span className="absolute inset-0 bg-brand-blue/10 rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-muted-foreground hover:text-foreground hover:bg-brand-blue/20 relative group"
              >
                <Github className="h-5 w-5 relative z-10" />
                <span className="absolute inset-0 bg-brand-blue/10 rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-muted-foreground hover:text-foreground hover:bg-brand-blue/20 relative group"
              >
                <Linkedin className="h-5 w-5 relative z-10" />
                <span className="absolute inset-0 bg-brand-blue/10 rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-muted-foreground hover:text-foreground hover:bg-brand-blue/20 relative group"
              >
                <Mail className="h-5 w-5 relative z-10" />
                <span className="absolute inset-0 bg-brand-blue/10 rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4 relative inline-block">
              Product
              <span className="absolute -bottom-1 left-0 w-1/2 h-[1px] bg-brand-blue"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors relative group">
                  Features
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-blue group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors relative group">
                  Pricing
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-blue group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors relative group">
                  Integrations
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-blue group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors relative group">
                  API
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-blue group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors relative group">
                  Documentation
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-blue group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4 relative inline-block">
              Company
              <span className="absolute -bottom-1 left-0 w-1/2 h-[1px] bg-brand-blue"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors relative group">
                  About
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-blue group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors relative group">
                  Blog
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-blue group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors relative group">
                  Careers
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-blue group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors relative group">
                  Contact
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-blue group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors relative group">
                  Privacy Policy
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-blue group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} SubversePay. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors relative group">
              Terms of Service
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-blue group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors relative group">
              Privacy Policy
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-blue group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors relative group">
              Cookie Policy
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-blue group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}