export type ElementType =
  | "physical"
  | "earth"
  | "fire"
  | "energy"
  | "ice"
  | "death"
  | "holy"

export type Weaknesses = Record<ElementType, number>

export type VocationType = "knight" | "paladin" | "monk" | "druid" | "sorcerer"

export interface Vocation {
  name: string
  hpPerLevel: number
  manaPerLevel: number
}

export const vocations: Record<VocationType, Vocation> = {
  knight:   { name: "Knight",   hpPerLevel: 15, manaPerLevel: 5  },
  paladin:  { name: "Paladin",  hpPerLevel: 10, manaPerLevel: 15 },
  monk:     { name: "Monk",     hpPerLevel: 10, manaPerLevel: 10 },
  druid:    { name: "Druid",    hpPerLevel: 5,  manaPerLevel: 30 },
  sorcerer: { name: "Sorcerer", hpPerLevel: 5,  manaPerLevel: 30 },
}

export const HP_BASE   = 185
export const MANA_BASE = 40

export function playerHp(vocation: VocationType, level: number): number {
  return HP_BASE + (level - 8) * vocations[vocation].hpPerLevel
}

export function playerMana(vocation: VocationType, level: number): number {
  return MANA_BASE + (level - 8) * vocations[vocation].manaPerLevel
}

export interface Monster {
  name: string
  hp: number
  kills: number
  amount: number
  mitigation: number
  img: string
  weaknesses: Weaknesses
}

export interface Hunt {
  name: string
  monsters: Monster[]
}

// Charm unificado — type é "overflux" | "overpower" para os especiais
export type CharmType = ElementType | "overflux" | "overpower"

export interface Charm {
  name: string
  type: CharmType
  active: boolean
  level: number
  isSpecial?: boolean
}

export const elementIcons: Record<ElementType, string> = {
  physical: "https://static.wikia.nocookie.net/tibia/images/c/c1/Bestiary_Physical_Icon_Big.gif/revision/latest/scale-to-width-down/16?cb=20210614055117&path-prefix=en&format=original",
  earth:    "https://static.wikia.nocookie.net/tibia/images/8/82/Poisoned_Icon_Big.gif/revision/latest/scale-to-width-down/16?cb=20210618053010&path-prefix=en&format=original",
  fire:     "https://static.wikia.nocookie.net/tibia/images/7/71/Burning_Icon_Big.gif/revision/latest/scale-to-width-down/16?cb=20210618053011&path-prefix=en&format=original",
  energy:   "https://static.wikia.nocookie.net/tibia/images/9/9b/Electrified_Icon_Big.gif/revision/latest/scale-to-width-down/16?cb=20210618053008&path-prefix=en&format=original",
  ice:      "https://static.wikia.nocookie.net/tibia/images/b/b4/Freezing_Icon_Big.gif/revision/latest/scale-to-width-down/16?cb=20210618052446&path-prefix=en&format=original",
  death:    "https://static.wikia.nocookie.net/tibia/images/c/c1/Cursed_Icon_Big.gif/revision/latest/scale-to-width-down/16?cb=20210618053007&path-prefix=en&format=original",
  holy:     "https://static.wikia.nocookie.net/tibia/images/8/80/Dazzled_Icon_Big.gif/revision/latest/scale-to-width-down/16?cb=20210618053006&path-prefix=en&format=original",
}

export const charmIcons: Record<string, string> = {
  Zap:       "https://tibia.fandom.com/wiki/Special:Redirect/file/Zap.png",
  Freeze:    "https://tibia.fandom.com/wiki/Special:Redirect/file/Freeze.png",
  Enflame:   "https://tibia.fandom.com/wiki/Special:Redirect/file/Enflame.png",
  Poison:    "https://tibia.fandom.com/wiki/Special:Redirect/file/Poison.png",
  Curse:     "https://tibia.fandom.com/wiki/Special:Redirect/file/Curse.png",
  Divine:    "https://tibia.fandom.com/wiki/Special:Redirect/file/Divine_Wrath.png",
  Wound:     "https://tibia.fandom.com/wiki/Special:Redirect/file/Wound.png",
  Overflux:  "https://tibia.fandom.com/wiki/Special:Redirect/file/Overflux.png",
  Overpower: "https://tibia.fandom.com/wiki/Special:Redirect/file/Overpower.png",
}

export const runeIcons: Record<ElementType, string> = {
  fire:     "https://tibia.fandom.com/wiki/Special:Redirect/file/Ultimate_Flame_Strike_Rune.png",
  energy:   "https://tibia.fandom.com/wiki/Special:Redirect/file/Thunderstorm_Rune.png",
  ice:      "https://tibia.fandom.com/wiki/Special:Redirect/file/Avalanche_Rune.png",
  earth:    "https://tibia.fandom.com/wiki/Special:Redirect/file/Stone_Shower_Rune.png",
  death:    "https://tibia.fandom.com/wiki/Special:Redirect/file/Sudden_Death_Rune.png",
  holy:     "https://tibia.fandom.com/wiki/Special:Redirect/file/Holy_Missile_Rune.png",
  physical: "https://tibia.fandom.com/wiki/Special:Redirect/file/Explosion_Rune.png",
}

export const hunts: Hunt[] = [
  {
    name: "Darklight Core",
    monsters: [
      {
        name: "Darklight Striker",
        hp: 29700,
        kills: 660,
        amount: 1,
        mitigation: 0.031,
        img: "https://static.wikia.nocookie.net/tibia/images/2/27/Darklight_Striker.gif/revision/latest?cb=20230613130524&path-prefix=en&format=original",
        weaknesses: { physical: 0.9, earth: 1.15, fire: 1.25, energy: 0.65, ice: 0.7, death: 1.0, holy: 0.9 },
      },
      {
        name: "Darklight Matter",
        hp: 30150,
        kills: 599,
        amount: 1,
        mitigation: 0.0328,
        img: "https://www.tibiawiki.com.br/images/1/19/Darklight_Matter.gif",
        weaknesses: { physical: 1.1, earth: 1.1, fire: 1.25, energy: 0.6, ice: 0.8, death: 1.0, holy: 1.0 },
      },
      {
        name: "Walking Pillar",
        hp: 38000,
        kills: 493,
        amount: 1,
        mitigation: 0.0275,
        img: "https://static.wikia.nocookie.net/tibia/images/2/26/Walking_Pillar.gif/revision/latest?cb=20230613180239&path-prefix=en&format=original",
        weaknesses: { physical: 1.1, earth: 1.15, fire: 1.15, energy: 0.4, ice: 0.55, death: 0.9, holy: 1.0 },
      },
      {
        name: "Darklight Source",
        hp: 31550,
        kills: 352,
        amount: 1,
        mitigation: 0.0319,
        img: "https://static.wikia.nocookie.net/tibia/images/3/3b/Darklight_Source.gif/revision/latest?cb=20230613180254&path-prefix=en&format=original",
        weaknesses: { physical: 1.1, earth: 1.1, fire: 1.15, energy: 0.45, ice: 0.6, death: 1.0, holy: 1.0 },
      },
    ],
  },
  {
    name: "Jaded Roots",
    monsters: [
      {
        name: "Oozing Corpus",
        hp: 28700,
        kills: 660,
        amount: 1,
        mitigation: 0.0325,
        img: "https://www.tibiawiki.com.br/images/2/26/Oozing_Corpus.gif",
        weaknesses: { physical: 0.7, earth: 0.6, fire: 0.75, energy: 1.25, ice: 1.1, death: 1.0, holy: 1.1 },
      },
      {
        name: "Mycobiontic Beetle",
        hp: 30200,
        kills: 599,
        amount: 1,
        mitigation: 0.0292,
        img: "https://www.tibiawiki.com.br/images/7/7c/Mycobiontic_Beetle.gif",
        weaknesses: { physical: 0.75, earth: 0.4, fire: 0.65, energy: 1.15, ice: 1.25, death: 1.0, holy: 1.05 },
      },
      {
        name: "Bloated Man-Maggot",
        hp: 31700,
        kills: 493,
        amount: 1,
        mitigation: 0.0316,
        img: "https://www.tibiawiki.com.br/images/6/6c/Bloated_Man-Maggot.gif",
        weaknesses: { physical: 0.55, earth: 0.6, fire: 0.85, energy: 1.15, ice: 1.15, death: 0.95, holy: 1.05 },
      },
      {
        name: "Sopping Corpus",
        hp: 33400,
        kills: 352,
        amount: 1,
        mitigation: 0.0325,
        img: "https://www.tibiawiki.com.br/images/9/94/Sopping_Corpus.gif",
        weaknesses: { physical: 0.6, earth: 0.5, fire: 0.7, energy: 1.20, ice: 0.6, death: 0.9, holy: 0.95 },
      },
    ],
  },
  {
    name: "Ingol",
    monsters: [
      {
        name: "Rhindeer",
        hp: 8650,
        kills: 505,
        amount: 1,
        mitigation: 0.0208,
        img: "https://www.tibiawiki.com.br/images/3/32/Rhindeer.gif",
        weaknesses: { physical: 1.0, earth: 0.8, fire: 1.1, energy: 0.95, ice: 1.0, death: 1.0, holy: 1.05 },
      },
      {
        name: "Crape Man",
        hp: 9150,
        kills: 459,
        amount: 1,
        mitigation: 0.0213,
        img: "https://www.tibiawiki.com.br/images/7/7a/Crape_Man.gif",
        weaknesses: { physical: 0.85, earth: 0.95, fire: 1.0, energy: 0.9, ice: 1.05, death: 1.15, holy: 1.0 },
      },
      {
        name: "Harpy",
        hp: 7700,
        kills: 330,
        amount: 1,
        mitigation: 0.0185,
        img: "https://www.tibiawiki.com.br/images/7/7e/Harpy.gif",
        weaknesses: { physical: 1.05, earth: 0.9, fire: 1.05, energy: 0.75, ice: 1.10, death: 1.05, holy: 1.00 },
      },
      {
        name: "Liodile",
        hp: 8600,
        kills: 60,
        amount: 1,
        mitigation: 0.0202,
        img: "https://www.tibiawiki.com.br/images/1/12/Liodile.gif",
        weaknesses: { physical: 1.1, earth: 0.7, fire: 1.1, energy: 0.75, ice: 1.05, death: 0.95, holy: 1.15 },
      },
      {
        name: "Carnivostrich",
        hp: 8250,
        kills: 40,
        amount: 1,
        mitigation: 0.0194,
        img: "https://www.tibiawiki.com.br/images/7/73/Carnivostrich.gif",
        weaknesses: { physical: 1.1, earth: 1.0, fire: 1.1, energy: 0.85, ice: 1.1, death: 0.95, holy: 1.2 },
      },
      {
        name: "Boar Man",
        hp: 9200,
        kills: 57,
        amount: 1,
        mitigation: 0.0216,
        img: "https://www.tibiawiki.com.br/images/a/af/Boar_Man.gif",
        weaknesses: { physical: 0.9, earth: 0.95, fire: 0.85, energy: 0.85, ice: 0.95, death: 0.95, holy: 1.1 },
      },
    ],
  },
]

export const allCharms: Omit<Charm, "active" | "level">[] = [
  { name: "Zap",       type: "energy"   },
  { name: "Freeze",    type: "ice"      },
  { name: "Enflame",   type: "fire"     },
  { name: "Poison",    type: "earth"    },
  { name: "Curse",     type: "death"    },
  { name: "Divine",    type: "holy"     },
  { name: "Wound",     type: "physical" },
  { name: "Overflux",  type: "overflux",  isSpecial: true },
  { name: "Overpower", type: "overpower", isSpecial: true },
]

export function proc(level: number): number {
  return level === 1 ? 0.05 : level === 2 ? 0.1 : 0.11
}

export function calcCharmDmg(
  monster: Monster,
  charm: Charm,
  hp: number,
  mana: number
): number {
  if (charm.type === "overflux") {
    const base = Math.min(mana * 0.025, monster.hp * 0.08)
    return base * monster.kills * proc(charm.level) * (1 - monster.mitigation)
  }
  if (charm.type === "overpower") {
    const base = Math.min(hp * 0.05, monster.hp * 0.08)
    return base * monster.kills * proc(charm.level) * (1 - monster.mitigation)
  }
  // charm normal
  return (
    monster.hp *
    0.05 *
    (monster.weaknesses[charm.type as ElementType] ?? 1) *
    monster.kills *
    proc(charm.level) *
    (1 - monster.mitigation)
  )
}