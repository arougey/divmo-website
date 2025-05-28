import { OfflineSplit, OfflineSplitSchema } from '@/types/split'

/**
 * Decodes and validates an OfflineSplit string from a URL.
 * Returns null if parsing or validation fails.
 */
export function decodeSplitData(encoded: string): OfflineSplit | null {
  try {
    const parsed = JSON.parse(atob(decodeURIComponent(encoded)))
    const result = OfflineSplitSchema.safeParse(parsed)
    return result.success ? result.data : null
  } catch {
    return null
  }
}