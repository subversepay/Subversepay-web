import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import "./auth-utils.css"
import Image from "next/image"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-white flex flex-col">
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none"></div>

      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-blue/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute left-0 top-1/4 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent"></div>
        <div className="absolute left-0 top-3/4 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent"></div>
        <div className="absolute left-1/4 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-brand-blue/20 to-transparent"></div>
        <div className="absolute left-3/4 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-brand-blue/20 to-transparent"></div>
      </div>

      <header className="py-6 px-8">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
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

          <Link href="/" className="text-brand-grey hover:text-white transition-colors flex items-center gap-2 group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to home</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">{children}</main>

      <footer className="py-6 px-8 text-center text-brand-grey text-sm">
        <p>© {new Date().getFullYear()} SubversePay. All rights reserved.</p>
      </footer>
    </div>
  )
}
