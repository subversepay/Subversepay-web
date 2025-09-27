import type { ReactNode } from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from '../context/authContext'
import { Toaster } from "@/components/ui/toaster"
 
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SubversePay - Next-Generation Crypto Payment Gateway",
  description:
    "Accept cryptocurrency payments seamlessly with our next-generation payment gateway. Fast, secure, and designed for the modern web.",
  developer: 'SubversePay Team'
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* <AuthProvider> */}
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              {children}
              <Toaster />
            </ThemeProvider>
        {/* </AuthProvider> */}
      </body>
    </html>
  )
}


import './globals.css'