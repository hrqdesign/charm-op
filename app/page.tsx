"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { CharmCard } from "@/components/charm-card"
import { MonsterCard } from "@/components/monster-card"
import { BestElementCard } from "@/components/best-element-card"
import {
  hunts,
  allCharms,
  type Charm,
  type VocationType,
  vocations,
  runeIcons,
  playerHp,
  playerMana,
  calcCharmDmg,
} from "@/lib/tibia-data"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function TibiaCharmCalculator() {
  const [huntIndex, setHuntIndex]     = useState(0)
  const [vocation, setVocation]       = useState<VocationType>("knight")
  const [playerLevel, setPlayerLevel] = useState(100)
  const [charms, setCharms]           = useState<Charm[]>(
    allCharms.map((c) => ({ ...c, active: true, level: 2 }))
  )

  const hunt = hunts[huntIndex]

  const hasSpecialActive = charms.some((c) => c.isSpecial && c.active)

  const result = useMemo(() => {
    const hp   = playerHp(vocation, playerLevel)
    const mana = playerMana(vocation, playerLevel)

    const available = charms.filter((c) => c.active)
    const used      = new Set<string>()

    const res: Array<{
      monster: (typeof hunt.monsters)[0]
      charm: Charm | null
      dps: number
      runnerUp: Charm | null
      runnerUpDps: number
    }> = []

    const remaining = [...hunt.monsters]

    while (
      remaining.length > 0 &&
      available.filter((c) => !used.has(c.name)).length > 0
    ) {
      let bestMonsterIdx = -1
      let bestCharm: Charm | null = null
      let bestVal = -1

      remaining.forEach((m, mi) => {
        available.forEach((c) => {
          if (used.has(c.name)) return
          const val = calcCharmDmg(m, c, hp, mana)
          if (val > bestVal) {
            bestVal        = val
            bestCharm      = c
            bestMonsterIdx = mi
          }
        })
      })

      if (bestMonsterIdx === -1 || !bestCharm) break

      const monster = remaining[bestMonsterIdx]

      let runnerUp: Charm | null = null
      let runnerUpVal = -1
      if ((bestCharm as Charm).isSpecial) {
        available.forEach((c) => {
          if (used.has(c.name)) return
          if (c.name === (bestCharm as Charm).name) return
          const val = calcCharmDmg(monster, c, hp, mana)
          if (val > runnerUpVal) {
            runnerUpVal = val
            runnerUp    = c
          }
        })
      }

      used.add((bestCharm as Charm).name)
      remaining.splice(bestMonsterIdx, 1)
      res.push({ monster, charm: bestCharm, dps: bestVal, runnerUp, runnerUpDps: runnerUpVal })
    }

    remaining.forEach((m) => {
      res.push({ monster: m, charm: null, dps: 0, runnerUp: null, runnerUpDps: 0 })
    })

    res.sort((a, b) => b.monster.kills - a.monster.kills)

    return res
  }, [hunt, charms, vocation, playerLevel])

  const bestElementData = useMemo(() => {
    const score: Record<string, number> = {}
    hunt.monsters.forEach((m) => {
      Object.entries(m.weaknesses).forEach(([k, v]) => {
        if (!score[k]) score[k] = 0
        score[k] += (v - 1) * m.amount * m.kills
      })
    })
    const entries = Object.entries(score).sort((a, b) => b[1] - a[1])
    return entries.slice(0, 3).map(([type, val]) => ({
      type: type as keyof typeof runeIcons,
      efficiency: val / 1000,
    }))
  }, [hunt])

  const toggleCharm = (index: number) => {
    const copy = [...charms]
    copy[index].active = !copy[index].active
    setCharms(copy)
  }

  const updateCharmLevel = (index: number, level: number) => {
    const copy = [...charms]
    copy[index].level = level
    setCharms(copy)
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Calculadora de Charms
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Encontre os melhores charms para maximizar seu DPS na hunt
          </p>
        </div>

        {/* Charms */}
        <section className="mb-6">
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-neutral-500">
            Seus Charms
          </h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {charms.map((charm, i) => (
              <CharmCard
                key={charm.name}
                charm={{ ...charm, type: charm.isSpecial ? "physical" : charm.type } as any}
                onToggle={() => toggleCharm(i)}
                onLevelChange={(level) => updateCharmLevel(i, level)}
              />
            ))}
          </div>
        </section>

        <div className="h-px bg-white/[0.08]" />

        {/* Vocação & Level — só aparece se Overflux ou Overpower estiverem ativos */}
        {hasSpecialActive && (
          <>
            <section className="my-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <h2 className="text-sm font-medium uppercase tracking-wider text-neutral-500">
                  Vocação
                </h2>
                <Select
                  value={vocation}
                  onValueChange={(v) => setVocation(v as VocationType)}
                >
                  <SelectTrigger className="!h-[46px] w-full rounded-lg border-white/[0.08] bg-neutral-900/50 px-4 text-white hover:border-white/[0.12] hover:bg-neutral-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-white/[0.08] bg-neutral-900">
                    {Object.entries(vocations).map(([key, voc]) => (
                      <SelectItem key={key} value={key}>
                        {voc.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <h2 className="text-sm font-medium uppercase tracking-wider text-neutral-500">
                  Level do Personagem
                </h2>
                <input
                  type="number"
                  min={8}
                  max={5000}
                  value={playerLevel}
                  onChange={(e) => setPlayerLevel(Math.max(8, Number(e.target.value)))}
                  className="h-[46px] w-full rounded-lg border border-white/[0.08] bg-neutral-900/50 px-4 text-white outline-none transition-colors hover:border-white/[0.12] hover:bg-neutral-900 focus:border-white/20"
                />
              </div>
            </section>

            <div className="h-px bg-white/[0.08]" />
          </>
        )}

        {/* Hunt & Melhor Elemento */}
        <section className="my-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <h2 className="text-sm font-medium uppercase tracking-wider text-neutral-500">
              Selecionar Hunt
            </h2>
            <Select
              value={String(huntIndex)}
              onValueChange={(v) => setHuntIndex(Number(v))}
            >
              <SelectTrigger className="!h-[46px] w-full rounded-lg border-white/[0.08] bg-neutral-900/50 px-4 text-white hover:border-white/[0.12] hover:bg-neutral-900">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-white/[0.08] bg-neutral-900">
                {hunts.map((h, i) => (
                  <SelectItem key={i} value={String(i)}>
                    <div className="flex items-center gap-2">
                      <img
                        src={h.monsters[0].img}
                        alt={h.monsters[0].name}
                        width={20}
                        height={20}
                        className="rounded-sm object-contain"
                      />
                      <span>{h.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-medium uppercase tracking-wider text-neutral-500">
              Melhor Elemento
            </h2>
            <BestElementCard top={bestElementData} />
          </div>
        </section>

        <div className="h-px bg-white/[0.08]" />

        {/* Criaturas */}
        <section className="my-6">
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-neutral-500">
            Criaturas
          </h2>
          <div className="space-y-2">
            {result.map((r, i) => (
              <MonsterCard key={i} data={r} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}