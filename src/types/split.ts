//website/src/types/split.ts
import { z } from 'zod'
import { PaymentMethodsSchema } from './payment'

/**
 * 💳 Represents the simplified version of a participant
 * Used for saving bills and debts — includes how much they owe.
 */
export const BillParticipantSchema = z.object({
  name: z.string(),
  phoneNumber: z.string().optional(),
  amount: z.number(),
})

/**
 * 📄 Represents the full structure of a decoded offline split.
 * This data is embedded in a shareable link and decoded client-side.
 */
export const OfflineSplitSchema = z.object({
  participants: z.array(BillParticipantSchema),
  total: z.number(),
  tip: z.number(),
  tax: z.number(),
  paymentMethods: PaymentMethodsSchema.optional()
})

export type BillParticipant = z.infer<typeof BillParticipantSchema>
export type OfflineSplit = z.infer<typeof OfflineSplitSchema>
export type OfflineSplitData = OfflineSplit | null