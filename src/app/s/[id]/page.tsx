//website/src/app/s/[id]/page.tsx
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'

export default async function SplitPage({ 
  params 
}: { params: { id: string } }) {
  const { data: split } = await supabase
    .from('splits')
    .select('*')
    .eq('id', params.id)
    .single()

  const { data: participants } = await supabase
    .from('participants')
    .select('*')
    .eq('split_id', params.id)

  if (!split || !participants) return notFound()

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">DivyIt Split</h1>
      {participants.map((p) => (
        <div key={p.id} className="border-b py-2 flex justify-between">
          <div>
            <p>{p.name}</p>
            <p className="text-sm text-gray-500">@{p.handle}</p>
          </div>
          <div className="text-right">
            <p className="text-lg">${p.amount.toFixed(2)}</p>
            <button
              onClick={() =>
                navigator.clipboard.writeText(
                  `venmo://pay?txn=pay&amount=${p.amount}&note=DivyIt&recipients=${p.handle}`
                )
              }
              className="text-blue-500 text-sm"
            >
              Copy Link
            </button>
          </div>
        </div>
      ))}
    </main>
  )
}