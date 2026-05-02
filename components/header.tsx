"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="https://static-cdn.jtvnw.net/jtv_user_pictures/4a939b0a-fdfb-48d5-a35b-dd00c0346efd-profile_image-70x70.png"
            alt="Charm Calculator Logo"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <div className="flex items-baseline gap-1.5">
            <span className="text-[15px] font-semibold text-white">
              Charm Calculator
            </span>
            <span className="text-[11px] font-medium text-neutral-500">
              by kattox
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="https://tibia.fandom.com/wiki/Charms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-400 transition-colors hover:text-white"
          >
            Documentação
          </Link>
          <Button
            asChild
            size="sm"
            className="h-8 rounded-lg bg-[#9147ff] px-3 text-sm font-medium text-black hover:bg-[#bf94ff]"
          >
            <Link
              href="https://www.twitch.tv/kattoxz"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ir para Twitch
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}