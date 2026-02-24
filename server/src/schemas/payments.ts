import { z } from 'zod'

export const MoneyAmountSchema = z.number().positive()

export const BeneficiarySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  accountNumber: z.string().optional(),
})

export const CollectionSchema = z.object({
  requestId: z.string(),
  batchId: z.string(),
  amount: MoneyAmountSchema,
  message: z.string().optional(),
  providerItemId: z.string(),
  beneficiary: BeneficiarySchema,
})

export const PayoutSchema = z.object({
  requestId: z.string(),
  batchId: z.string(),
  amount: MoneyAmountSchema,
  message: z.string().optional(),
  productItemId: z.string(),
  beneficiary: BeneficiarySchema,
})

export const BankTransferSchema = z.object({
  requestId: z.string(),
  batchId: z.string(),
  amount: MoneyAmountSchema,
  message: z.string().optional(),
  productItemId: z.string(),
  bankId: z.string(),
  beneficiary: BeneficiarySchema,
})
