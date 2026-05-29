'use client'

import { ConnectKitButton } from 'connectkit'

export function Header() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 border-b border-base-border">
      <div className="flex items-center gap-2">
        <span className="text-base-blue text-xl">◈</span>
        <span className="font-bold text-base-text tracking-tight">OnchainTip</span>
        <span className="hidden sm:inline text-[10px] text-base-sub bg-base-card border border-base-border px-2 py-0.5 rounded-full ml-1">
          Base
        </span>
      </div>
      <ConnectKitButton />
    </header>
  )
}
