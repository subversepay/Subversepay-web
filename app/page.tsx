import Navbar from "@/components/layout/navbar"
import HeroSection from "@/components/home/hero-section"
import FeaturesSection from "@/components/home/features-section"
import TestimonialsSection from "@/components/home/testimonials-section"
import PricingSection from "@/components/home/pricing-section"
import Footer from "@/components/layout/footer"
import CompanyMarquee from "@/components/home/company-marquee"
import OttPlatformsSection from "@/components/home/ott-platforms-section"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-brand-blue/0 via-brand-blue/30 to-brand-blue/0 text-white">
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none"></div>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <OttPlatformsSection />
        <div className="py-12">
          <div className="container mx-auto px-4">
            <CompanyMarquee />
          </div>
        </div>
        <TestimonialsSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  )
}
