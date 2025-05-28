//website/src/app/s/offline
/*
This is the entry point which is used to wrap the offline split page in a suspense
*/


export const dynamic = 'force-dynamic'
import { Suspense } from 'react'
import OfflineSplitPage from './OfflineSplitPage'

export default function Page() {
  return (
    <Suspense fallback={<p className="p-4">Loading...</p>}>
      <OfflineSplitPage />
    </Suspense>
  )
}