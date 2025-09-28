"use client"

import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Star } from "lucide-react"

export default function TestimonialsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const testimonials = [
    {
      name: "James Carter",
      role: "CTO, FinServe Ltd.",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "Integrating SubversePay’s API took less than a day. Our transaction success rate improved instantly, and settlements are now seamless.",
    },
    {
      name: "Maria Gomez",
      role: "Founder, QuickPay Africa",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "We cut our payment processing costs by 20% after switching to SubversePay. The flat-rate pricing makes forecasting much easier.",
    },
    {
      name: "David Kim",
      role: "Head of Product, NovaCommerce",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "The analytics dashboard gives us real-time visibility into transactions. Our finance team finally has accurate daily reporting without extra tools.",
    },
  ]

  return (
    <section id="testimonials" className="py-20 relative" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute left-0 top-2/3 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent"></div>
        <div className="absolute left-2/3 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-brand-blue/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4">
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            inView ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Testimonials
        </h2>
          <p className="text-muted-foreground text-lg">
            See how businesses use SubversePay to simplify payments and scale faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`relative group transition-all duration-700 delay-${index * 200} ${
                inView ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 border border-brand-blue/30 rounded-xl"></div>
              <div className="absolute inset-0 backdrop-blur-sm rounded-xl"></div>

              {/* Glow on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-blue/0 via-brand-blue/30 to-brand-blue/0 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity"></div>

              <div className="relative bg-background/50 backdrop-blur-sm rounded-xl p-6 z-10 border border-brand-blue/10 hover:border-brand-blue/30 transition-colors">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-brand-blue fill-brand-blue" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-brand-blue/50 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="rounded-full relative z-10 border border-brand-blue/30"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
