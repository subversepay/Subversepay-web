import { Button } from "@/components/ui/button"
import type { PlatformProps } from "@/lib/PLATFORMS"

export type { PlatformProps }

export function PlatformCard({ platform }: { platform: PlatformProps }) {
  return (
    <div className="relative group h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute inset-0 border border-brand-blue/30 rounded-xl"></div>
      <div className="absolute inset-0 backdrop-blur-sm rounded-xl"></div>

      {/* Glowing corners */}
      <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-brand-blue/50 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-brand-blue/50 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-brand-blue/50 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-brand-blue/50 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

      <div className="relative bg-black/50 backdrop-blur-sm rounded-xl p-6 z-10 border border-brand-blue/10 hover:border-brand-blue/30 transition-colors h-full flex flex-col">
        <div className="mb-4 relative">
          <div
            className="w-16 h-16 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${platform.color}20` }}
          >
            <div className="text-brand-blue">{platform.icon}</div>
          </div>
          <div className="absolute -inset-1 bg-brand-blue/20 rounded-lg blur-md opacity-0 group-hover:opacity-70 transition-opacity"></div>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-white">{platform.name}</h3>

        {platform.description && <p className="text-brand-grey text-sm mb-4">{platform.description}</p>}

        <div className="space-y-3 mb-4 flex-grow">
          <div>
            <div className="text-sm text-brand-grey mb-1">Available Plans</div>
            <div className="flex flex-wrap gap-2">
              {platform.plans.map((plan, i) => (
                <span key={i} className="px-2 py-1 rounded-full text-xs bg-brand-blue/10 text-brand-blue">
                  {plan}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm text-brand-grey mb-1">Discount with SubversePay</div>
            <div className="text-green-400 font-medium">{platform.discount}</div>
          </div>
        </div>

        <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white relative overflow-hidden group">
          <span className="relative z-10">Subscribe Now</span>
          <span className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></span>
        </Button>
      </div>
    </div>
  )
}
