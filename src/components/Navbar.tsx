'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <header className="bg-black shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center space-x-2">
          {/* Logo */}
          <Image
            src="/logo.png"
            alt="DivyIt Logo"
            width={64}
            height={64}
            priority
            unoptimized
          />
          {/* App Name */}
          <span className="text-2xl font-bold text-white">
            DivyIt
          </span>
        </Link>
        <nav className="flex items-center space-x-6">
          <Link href="/download" className="text-white hover:text-fuchsia-950 transition">
            Download App
          </Link>
          <Link href="/profile" className="text-white hover:text-fuchsia-950 transition">
            Manage Profile
          </Link>
          <Link
            href="/premium"
            className="rounded-full bg-fuchsia-900 px-6 py-3 text-black hover:bg-fuchsia-950 transition shadow-md"
          >
            Premium
          </Link>
        </nav>
      </div>
    </header>
  )
}