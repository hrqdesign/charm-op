"use client"

import { elementIcons, type ElementType } from "@/lib/tibia-data"

const elementNames: Record<ElementType, string> = {
  physical: "Physical",
  earth:    "Earth",
  fire:     "Fire",
  energy:   "Energy",
  ice:      "Ice",
  death:    "Death",
  holy:     "Holy",
}

const medals = ["🥇", "🥈", "🥉"]
const efficiencyColors = ["text-yellow-400", "text-neutral-400", "text-amber-600"]

interface BestElementEntry {
  type: ElementType
  efficiency: number
}

interface BestElementCardProps {
  top: BestElementEntry[]
}

export function BestElementCard({ top }: BestElementCardProps) {
  if (!top || top.length === 0) return null

  return (
    <div className="flex h-[46px] items-center gap-3 rounded-lg border border-white/[0.08] bg-neutral-900/50 px-4 transition-colors hover:border-white/[0.12] hover:bg-neutral-900">
      {top.map((entry, i) => (
        <div key={entry.type} className="flex items-center gap-1.5">
          <span className="text-sm">{medals[i]}</span>
          <img
            src={elementIcons[entry.type]}
            alt={entry.type}
            width={14}
            height={14}
            className="shrink-0"
          />
          <span className="text-xs font-medium text-white">{elementNames[entry.type]}</span>
          <span className={`text-xs font-semibold ${efficiencyColors[i]}`}>
            +{(entry.efficiency * 100).toFixed(1)}%
          </span>
          {i < top.length - 1 && (
            <span className="ml-1 text-white/20">|</span>
          )}
        </div>
      ))}
    </div>
  )
}