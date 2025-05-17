import type { ReactNode } from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ContractProvider } from '../context/contractContext'
 
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SubversePay - Next-Generation Crypto Payment Gateway",
  description:
    "Accept cryptocurrency payments seamlessly with our next-generation payment gateway. Fast, secure, and designed for the modern web.",
  developer: 'Mubarakumn'
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ContractProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
        </ContractProvider>
      </body>
    </html>
  )
}


import './globals.css'