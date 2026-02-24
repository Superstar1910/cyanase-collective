import { z } from 'zod'

import { createLedgerEntry, ensureTransaction } from '../services/ledger'
import prisma from '../db'
import {
  getAccount,
  postBankTransfer,
  postMobileMoneyCollection,
  postMobileMoneyPayout,
  validateProduct,
} from '../services/xenteClient'
import {
  BankTransferSchema,
  CollectionSchema,
  PayoutSchema,
} from '../schemas/payments'

const MobileMoneyValidationSchema = z.object({
  productItemId: z.string(),
  customerId: z.string(),
  customerName: z.string(),
  customerEmail: z.string().email(),
})

const DEFAULT_WALLET_CURRENCY = 'UGX'

async function getDefaultWalletId() {
  const wallet = await prisma.wallet.findFirst({
    where: { currency: DEFAULT_WALLET_CURRENCY },
    orderBy: { createdAt: 'asc' },
  })

  if (!wallet) {
    throw new Error('No wallet found. Create a wallet before processing payments.')
  }

  return wallet.id
}

async function ensureIdempotent(requestId: string, payload: { provider: string; type: string; amount: number }) {
  const result = await ensureTransaction(requestId, {
    provider: payload.provider,
    type: payload.type,
    status: 'pending',
    amount: payload.amount,
    currency: DEFAULT_WALLET_CURRENCY,
  })

  if (!result.created) {
    throw new Error(`Duplicate requestId: ${requestId}`)
  }
}

export async function registerPaymentRoutes(server: import('fastify').FastifyInstance) {
  server.get('/accounts', async () => getAccount())

  server.post('/validate/mobile-money', async (request) => {
    const payload = MobileMoneyValidationSchema.parse(request.body)
    return validateProduct(payload)
  })

  server.post('/collections/mobile-money', async (request) => {
    const payload = CollectionSchema.parse(request.body)
    const walletId = await getDefaultWalletId()

    await ensureIdempotent(payload.requestId, {
      provider: 'xente',
      type: 'collection',
      amount: payload.amount,
    })

    await createLedgerEntry({
      walletId,
      amount: payload.amount,
      currency: DEFAULT_WALLET_CURRENCY,
      type: 'collection',
      status: 'pending',
      referenceId: payload.requestId,
      provider: 'xente',
      metadata: payload,
    })

    return postMobileMoneyCollection(payload)
  })

  server.post('/payouts/mobile-money', async (request) => {
    const payload = PayoutSchema.parse(request.body)
    const walletId = await getDefaultWalletId()

    await ensureIdempotent(payload.requestId, {
      provider: 'xente',
      type: 'payout',
      amount: payload.amount,
    })

    await createLedgerEntry({
      walletId,
      amount: payload.amount,
      currency: DEFAULT_WALLET_CURRENCY,
      type: 'payout',
      status: 'pending',
      referenceId: payload.requestId,
      provider: 'xente',
      metadata: payload,
    })

    return postMobileMoneyPayout(payload)
  })

  server.post('/payouts/bank', async (request) => {
    const payload = BankTransferSchema.parse(request.body)
    const walletId = await getDefaultWalletId()

    await ensureIdempotent(payload.requestId, {
      provider: 'xente',
      type: 'payout',
      amount: payload.amount,
    })

    await createLedgerEntry({
      walletId,
      amount: payload.amount,
      currency: DEFAULT_WALLET_CURRENCY,
      type: 'payout',
      status: 'pending',
      referenceId: payload.requestId,
      provider: 'xente',
      metadata: payload,
    })

    return postBankTransfer(payload)
  })
}
