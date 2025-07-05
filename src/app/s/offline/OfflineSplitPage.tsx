"use client"

import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { BillParticipant } from "@/types/split"
import { decodeSplitData } from '@/utils/decoding'

export const dynamic = 'force-dynamic'

export default function OfflineSplitPage() {
  const params = useSearchParams()
  const dataRaw = useMemo(() => {
    const encoded = params.get('data')
    if (!encoded) return null
    return decodeSplitData(encoded)
  }, [params])

  if (!dataRaw) return <p className="p-4">Invalid split data</p>

  // Cast participants to include optional email
  const { participants: rawParticipants = [], total, tip, tax } = dataRaw
  const participants = rawParticipants as Array<BillParticipant & { email?: string }>

  // Format values
  const formattedTotal = total.toFixed(2)
  const formattedTip = tip.toFixed(2)
  const formattedTax = tax.toFixed(2)

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">DivyIt Split (Offline)</h1>

      <p className="text-sm text-gray-500 mb-4">
        Total: ${formattedTotal}
        {tip > 0 && ` | Tip: ${formattedTip}%`}
        {tax > 0 && ` | Tax: $${formattedTax}`}
      </p>

      {participants.map((p, i) => {
        const amount = p.amount.toFixed(2)
        const paypalUsername = p.email?.split('@')[0] || ''

        // Build deep links
        const venmoLink = `venmo://paycharge?txn=pay&recipients=${encodeURIComponent(
          p.phoneNumber || ''
        )}&amount=${amount}&note=${encodeURIComponent('DivyIt')}`
        const paypalLink = paypalUsername
          ? `https://paypal.me/${encodeURIComponent(paypalUsername)}/${amount}`
          : ''

        return (
          <div key={i} className="border-b py-2 flex justify-between items-center">
            <div>
              <p className="font-semibold">{p.name}</p>
              <p className="text-sm text-gray-500">{p.phoneNumber || '—'}</p>
            </div>
            <div className="text-right space-y-2">
              <p className="text-lg font-bold">${amount}</p>
              <div className="flex flex-col space-y-1">
                <button
                  className="text-blue-500 text-sm"
                  onClick={() => navigator.clipboard.writeText(venmoLink)}
                >
                  Copy Venmo Link
                </button>
                {paypalLink ? (
                  <button
                    className="text-blue-500 text-sm"
                    onClick={() => navigator.clipboard.writeText(paypalLink)}
                  >
                    Copy PayPal Link
                  </button>
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    Add email to add PayPal link
                  </p>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </main>
  )
}
