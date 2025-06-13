import type { ReactNode } from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from '../context/authContext'
import { WalletProvider } from '../context/walletContext'
import { Toaster } from "@/components/ui/toaster"
 
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SubversePay - Next-Generation Crypto Payment Gateway",
  description:
    "Accept cryptocurrency payments seamlessly with our next-generation payment gateway. Fast, secure, and designed for the modern web.",
  developer: 'mubarakumn'
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <WalletProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              {children}
              <Toaster />
            </ThemeProvider>
          </WalletProvider>
        </AuthProvider>
      </body>
    </html>
  )
}


import './globals.css'