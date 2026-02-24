import { z } from 'zod'

import {
  getAccount,
  postBankTransfer,
  postMobileMoneyCollection,
  postMobileMoneyPayout,
  validateProduct,
} from '../services/xenteClient'

const MobileMoneyValidationSchema = z.object({
  productItemId: z.string(),
  customerId: z.string(),
  customerName: z.string(),
  customerEmail: z.string().email(),
})

const MobileMoneyCollectionSchema = z.object({
  requestId: z.string(),
  batchId: z.string(),
  amount: z.number().positive(),
  message: z.string().optional(),
  providerItemId: z.string(),
  beneficiary: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
  }),
})

const MobileMoneyPayoutSchema = z.object({
  requestId: z.string(),
  batchId: z.string(),
  amount: z.number().positive(),
  message: z.string().optional(),
  productItemId: z.string(),
  beneficiary: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
  }),
})

const BankTransferSchema = z.object({
  requestId: z.string(),
  batchId: z.string(),
  amount: z.number().positive(),
  message: z.string().optional(),
  productItemId: z.string(),
  bankId: z.string(),
  beneficiary: z.object({
    name: z.string(),
    email: z.string().email(),
    accountNumber: z.string(),
  }),
})

export async function registerPaymentRoutes(server: import('fastify').FastifyInstance) {
  server.get('/accounts', async () => getAccount())

  server.post('/validate/mobile-money', async (request) => {
    const payload = MobileMoneyValidationSchema.parse(request.body)
    return validateProduct(payload)
  })

  server.post('/collections/mobile-money', async (request) => {
    const payload = MobileMoneyCollectionSchema.parse(request.body)
    return postMobileMoneyCollection(payload)
  })

  server.post('/payouts/mobile-money', async (request) => {
    const payload = MobileMoneyPayoutSchema.parse(request.body)
    return postMobileMoneyPayout(payload)
  })

  server.post('/payouts/bank', async (request) => {
    const payload = BankTransferSchema.parse(request.body)
    return postBankTransfer(payload)
  })
}
