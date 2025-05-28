import { OfflineSplit, OfflineSplitSchema } from '@/types/split'

/**
 * Encodes a valid OfflineSplit object into a URL-safe string.
 */
export function encodeSplitData(data: OfflineSplit): string {
  return encodeURIComponent(btoa(JSON.stringify(data)))
}

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