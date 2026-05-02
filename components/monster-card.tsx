"use client"
import {
  type Monster,
  type Charm,
  elementIcons,
  charmIcons,
  type ElementType,
} from "@/lib/tibia-data"
import { cn } from "@/lib/utils"

interface MonsterCardProps {
  data: {
    monster: Monster
    charm: Charm | null
    dps: number
    runnerUp: Charm | null
    runnerUpDps: number
  }
}

export function MonsterCard({ data }: MonsterCardProps) {
  const { monster, charm, dps, runnerUp, runnerUpDps } = data
  const isSpecial = charm?.isSpecial ?? false
  const diff = dps - runnerUpDps

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-white/[0.08] bg-neutral-900/50 p-4 transition-colors hover:border-white/[0.12] hover:bg-neutral-900 sm:flex-row sm:items-center sm:justify-between">
      {/* Lado esquerdo — info do monstro */}
      <div className="flex items-center gap-3">
        <img
          src={monster.img}
          alt={monster.name}
          width={56}
          height={56}
          className="h-14 w-14 shrink-0 rounded-md bg-black/50 object-contain p-1"
        />
        <div>
          <div className="text-sm font-medium text-white">{monster.name}</div>
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <span>❤️ {new Intl.NumberFormat("en-US").format(monster.hp)}</span>
            <span>☠️ {new Intl.NumberFormat("en-US").format(monster.kills)} mortes/h</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {Object.entries(monster.weaknesses).map(([element, value]) => (
              <WeaknessTag
                key={element}
                element={element as ElementType}
                value={value}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lado direito — charm vencedor */}
      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
        {charm ? (
          <>
            {/* Badge do charm */}
            <div
              className={cn(
                "flex items-center gap-1.5 rounded-md px-2 py-1",
                isSpecial
                  ? "border border-amber-500/20 bg-amber-500/10"
                  : "bg-white/[0.06]"
              )}
            >
              <img
                src={charmIcons[charm.name]}
                alt={charm.name}
                width={16}
                height={16}
              />
              <span
                className={cn(
                  "text-xs font-medium",
                  isSpecial ? "text-amber-400" : "text-neutral-300"
                )}
              >
                {charm.name}
              </span>
            </div>

            {/* DMG principal */}
            <div className="text-right">
              <span
                className={cn(
                  "text-lg font-semibold",
                  isSpecial ? "text-amber-400" : "text-white"
                )}
              >
                {dps.toFixed(0)}
              </span>
              <span className="ml-1 text-xs text-neutral-500">DMG</span>
            </div>

            {/* Runner-up (só para especiais) */}
            {isSpecial && runnerUp && (
              <div className="text-right text-xs text-neutral-500">
                <span className="text-emerald-400">
                  +{new Intl.NumberFormat("en-US").format(Math.round(diff))}
                </span>
                {" "}a mais que{" "}
                <span className="text-neutral-400">{runnerUp.name}</span>
              </div>
            )}
          </>
        ) : (
          <div className="text-xs text-neutral-600">sem charm disponível</div>
        )}
      </div>
    </div>
  )
}

function WeaknessTag({
  element,
  value,
}: {
  element: ElementType
  value: number
}) {
  const percentage = Math.round(value * 100)
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded border border-white/[0.08] bg-black/60 px-2 py-1 text-xs font-medium tabular-nums",
        value > 1 && "text-emerald-400",
        value < 1 && "text-red-400",
        value === 1 && "text-neutral-500"
      )}
    >
      <img
        src={elementIcons[element]}
        alt={element}
        width={12}
        height={12}
        className="shrink-0"
      />
      <span>{percentage}%</span>
    </div>
  )
}
