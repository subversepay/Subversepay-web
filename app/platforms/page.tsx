import type { Metadata } from "next"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { PlatformGrid } from "@/components/platforms/platform-grid"

export const metadata: Metadata = {
  title: "Supported OTT Platforms | SubversePay",
  description:
    "Browse all supported OTT platforms and subscribe with stablecoin payments to save on subscription fees.",
}

export default function PlatformsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none"></div>
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Supported OTT Platforms
            </h1>
            <p className="text-brand-grey text-lg">
              Subscribe to your favorite streaming services with stablecoin payments and save up to 15% on subscription
              fees. Manage all your subscriptions in one place with SubversePay.
            </p>
          </div>

          <PlatformGrid />
        </div>
      </main>

      <Footer />
    </div>
  )
}
