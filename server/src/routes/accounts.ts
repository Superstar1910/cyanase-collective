import { z } from 'zod'

import prisma from '../db'

const WalletQuerySchema = z.object({
  currency: z.string().default('UGX'),
})

export async function registerAccountRoutes(server: import('fastify').FastifyInstance) {
  server.get('/wallet', async (request, reply) => {
    const userId = request.headers['x-user-id']
    if (typeof userId !== 'string') {
      return reply.code(401).send({ error: 'Missing x-user-id' })
    }

    const query = WalletQuerySchema.parse(request.query)

    const wallet = await prisma.wallet.findFirst({
      where: { userId, currency: query.currency },
    })

    if (!wallet) {
      return reply.code(404).send({ error: 'Wallet not found' })
    }

    return {
      walletId: wallet.id,
      currency: wallet.currency,
      balance: wallet.balance,
    }
  })

  server.get('/transactions', async (request, reply) => {
    const userId = request.headers['x-user-id']
    if (typeof userId !== 'string') {
      return reply.code(401).send({ error: 'Missing x-user-id' })
    }

    const query = WalletQuerySchema.parse(request.query)

    const wallet = await prisma.wallet.findFirst({
      where: { userId, currency: query.currency },
    })

    if (!wallet) {
      return reply.code(404).send({ error: 'Wallet not found' })
    }

    const entries = await prisma.ledgerEntry.findMany({
      where: { walletId: wallet.id },
      orderBy: { createdAt: 'desc' },
      take: 50,
    })

    return {
      walletId: wallet.id,
      currency: wallet.currency,
      entries,
    }
  })
}
