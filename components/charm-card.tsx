"use client"

import { type Charm, charmIcons, proc } from "@/lib/tibia-data"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CharmCardProps {
  charm: Charm
  onToggle: () => void
  onLevelChange: (level: number) => void
}

export function CharmCard({ charm, onToggle, onLevelChange }: CharmCardProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/[0.08] bg-neutral-900/50 p-3 transition-colors hover:border-white/[0.12] hover:bg-neutral-900">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={charm.active}
          onCheckedChange={onToggle}
          className="border-neutral-600 data-[state=checked]:border-white data-[state=checked]:bg-white data-[state=checked]:text-black"
        />
        <img
          src={charmIcons[charm.name]}
          alt={charm.name}
          width={24}
          height={24}
          className="drop-shadow-md"
        />
        <div>
          <div className="text-sm font-medium text-white">{charm.name}</div>
          <div className="text-xs text-neutral-500">
            Proc: {Math.round(proc(charm.level) * 100)}%
          </div>
        </div>
      </div>

      <Select
        value={String(charm.level)}
        onValueChange={(value) => onLevelChange(Number(value))}
      >
        <SelectTrigger className="h-8 w-[70px] border-white/[0.08] bg-black text-xs text-white hover:border-white/20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="border-white/[0.08] bg-neutral-900">
          <SelectItem value="1">Lv1</SelectItem>
          <SelectItem value="2">Lv2</SelectItem>
          <SelectItem value="3">Lv3</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
