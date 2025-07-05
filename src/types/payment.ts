// website/src/types/payment.ts
import { z } from 'zod'

export const PaymentMethodsSchema = z.object({
  preferredPayment: z.string().optional(),
  venmoHandle:      z.string().optional(),
  cashappHandle:    z.string().optional(),
  zelleHandle:      z.string().optional(),
  paypalHandle:     z.string().optional(),
  bankHandle:       z.string().optional(),
})
export type PaymentMethods = z.infer<typeof PaymentMethodsSchema>