import prisma from '../db'

type LedgerType = 'collection' | 'payout'

type CreateEntryInput = {
  walletId: string
  amount: number
  currency: string
  type: LedgerType
  status: 'pending' | 'succeeded' | 'failed'
  referenceId: string
  provider: string
  metadata?: Record<string, unknown>
}

export async function createLedgerEntry(input: CreateEntryInput) {
  return prisma.ledgerEntry.create({
    data: {
      walletId: input.walletId,
      amount: input.amount,
      currency: input.currency,
      type: input.type,
      status: input.status,
      referenceId: input.referenceId,
      provider: input.provider,
      metadata: input.metadata,
    },
  })
}

export async function updateLedgerStatus(referenceId: string, status: 'pending' | 'succeeded' | 'failed') {
  return prisma.ledgerEntry.update({
    where: { referenceId },
    data: { status },
  })
}

export async function applyWalletBalance(walletId: string, delta: number) {
  return prisma.wallet.update({
    where: { id: walletId },
    data: {
      balance: {
        increment: delta,
      },
    },
  })
}

export async function ensureTransaction(referenceId: string, data: {
  provider: string
  type: string
  status: string
  amount: number
  currency: string
}) {
  const existing = await prisma.transaction.findUnique({
    where: { referenceId },
  })

  if (existing) {
    return { transaction: existing, created: false }
  }

  const transaction = await prisma.transaction.create({
    data: {
      referenceId,
      provider: data.provider,
      type: data.type,
      status: data.status,
      amount: data.amount,
      currency: data.currency,
    },
  })

  return { transaction, created: true }
}
