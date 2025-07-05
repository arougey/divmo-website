"use client"

import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { OfflineSplit } from "@/types/split"
import { decodeSplitData } from '@/utils/decoding'

export const dynamic = 'force-dynamic'

export default function OfflineSplitPage() {
  const params = useSearchParams()
  const dataRaw = useMemo<OfflineSplit | null>(() => {
    const encoded = params.get('data')
    return encoded ? decodeSplitData(encoded) : null
  }, [params])

  if (!dataRaw) return <p className="p-4">Invalid split data</p>

  // Cast participants to include optional email
  const { paymentMethods = {} } = dataRaw
  const {
    venmoHandle,
    cashappHandle, 
    zelleHandle, 
    paypalHandle 
  } = paymentMethods

  // Format values
  const formattedTotal = dataRaw.total.toFixed(2)
  const formattedTip = dataRaw.tip.toFixed(2)
  const formattedTax = dataRaw.tax.toFixed(2)

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">DivyIt Split (Offline)</h1>

      <p className="text-sm text-gray-500 mb-4">
        Total: ${formattedTotal}
        {dataRaw.tip > 0 && ` | Tip: ${formattedTip}%`}
        {dataRaw.tax > 0 && ` | Tax: $${formattedTax}`}
      </p>

      {dataRaw.participants.map((p, i) => {
        const amount = p.amount.toFixed(2)
        const note = encodeURIComponent('DivyIt Payment')
        
        const venmoHref = `venmo://paycharge?txn=pay&recipients=${encodeURIComponent(
          p.phoneNumber || ''
        )}&amount=${amount}&note=${note}`

        const paypalHref = paypalHandle
          ? `paypal://send?recipient=${encodeURIComponent(paypalHandle)}&amount=${amount}&currency=USD`
          : ''

        const cashappHref = cashappHandle
          ? `cashapp://$${encodeURIComponent(cashappHandle)}?amount=${amount}&note=${note}`
          : ''

          const zelleHref = zelleHandle
          ? `zelle://pay?recipient=${encodeURIComponent(zelleHandle)}&amount=${amount}` 
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
                {/* VENMO */}
                {venmoHref ? (
                  <a
                    href={venmoHref}
                    className='text-blue-500 text-sm'
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Pay With Venmo
                  </a>
                ) : null}

                {/* PAYPAL */}
                {paypalHref ? (
                  <a
                    href={paypalHref}
                    className='text-blue-500 text-sm'
                    target='_blank'
                    rel="noopener noreferrer"
                  >
                    Pay with PayPal
                  </a>
                ) : null}

                {cashappHref ? (
                  <a
                    href={cashappHref}
                    className='text-green-500 text-sm'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Pay with Zelle
                  </a>
                ) : null}

                {/* Fallback instruction if none */}
                {!(venmoHandle || paypalHref || cashappHref || zelleHref) && (
                  <p className='text-sm text-gray-500 italic'>
                    Host hasn`t set up any native payment links.
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
