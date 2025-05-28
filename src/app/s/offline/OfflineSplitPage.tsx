//src/app/s/offline
/*
This page shows the split and gives each user different deep linked options to pay the host
*/

'use client'

export const dynamic = 'force-dynamic'

import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { BillParticipant, OfflineSplitData } from "@/types/split"

export default function OfflineSplitPage() {
  const params = useSearchParams()
  const data: OfflineSplitData = useMemo(() => {
    try {
      const raw = atob(decodeURIComponent(params.get('data') || ''))
      return JSON.parse(raw)
    } catch {
      return null
    }
  }, [params])

  if (!data) return <p className="p-4">Invalid split data</p>

  const { participants = [], total, tip, tax } = data

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">DivyIt Split (Offline)</h1>
      <p className="text-sm text-gray-500 mb-4">
        Total: ${total} | Tip: {tip}% | Tax: ${tax}
      </p>
      {participants.map((p: BillParticipant, i: number) => (
        <div key={i} className="border-b py-2 flex justify-between">
          <div>
            <p>{p.name}</p>
            <p className="text-sm text-gray-500">{p.phoneNumber || '—'}</p>
          </div>
          <div className="text-right">
            <p className="text-lg">${p.amount.toFixed(2)}</p>
            <button
              className="text-blue-500 text-sm"
              onClick={() =>
                navigator.clipboard.writeText(
                  `venmo://pay?txn=pay&amount=${p.amount}&note=DivyIt`
                )
              }
            >
              Copy Venmo Link
            </button>
          </div>
        </div>
      ))}
    </main>
  )
}