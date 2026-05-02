"use client"

import { elementIcons, type ElementType } from "@/lib/tibia-data"

const elementNames: Record<ElementType, string> = {
  physical: "Physical",
  earth: "Earth",
  fire: "Fire",
  energy: "Energy",
  ice: "Ice",
  death: "Death",
  holy: "Holy",
}

interface BestElementCardProps {
  type: ElementType
  efficiency: number
}

export function BestElementCard({ type, efficiency }: BestElementCardProps) {
  if (!type) return null

  return (
    <div className="flex h-[46px] items-center gap-3 rounded-lg border border-white/[0.08] bg-neutral-900/50 px-4 transition-colors hover:border-white/[0.12] hover:bg-neutral-900">
      <img
        src={elementIcons[type]}
        alt={type}
        width={20}
        height={20}
        className="shrink-0"
      />
      <span className="text-sm font-medium text-white">
        {elementNames[type]}
      </span>
      <span className="text-sm text-emerald-400">
        {(efficiency * 100).toFixed(2)}%
      </span>
    </div>
  )
}