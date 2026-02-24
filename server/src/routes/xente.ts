import { z } from 'zod'

import prisma from '../db'
import { applyWalletBalance, updateLedgerStatus } from '../services/ledger'

const XENTE_IPS = new Set(['52.48.24.237', '34.252.29.119'])

const WebhookSchema = z.object({
  transactionId: z.string().optional(),
  requestId: z.string().optional(),
  status: z.string().optional(),
  amount: z.string().optional(),
  currency: z.string().optional(),
  message: z.string().optional(),
})

function normalizeStatus(status?: string) {
  if (!status) return 'pending'
  const normalized = status.toLowerCase()
  if (['success', 'successful', 'completed'].includes(normalized)) return 'succeeded'
  if (['failed', 'declined', 'error'].includes(normalized)) return 'failed'
  return 'pending'
}

export async function registerXenteWebhookRoutes(server: import('fastify').FastifyInstance) {
  server.post('/xente', async (request, reply) => {
    const ip = request.ip
    if (!XENTE_IPS.has(ip)) {
      server.log.warn({ ip }, 'Blocked webhook: IP not allowed')
      return reply.code(403).send({ ok: false })
    }

    const parsed = WebhookSchema.parse(request.body)

    server.log.info({ payload: parsed }, 'Xente webhook received')

    await prisma.webhookEvent.create({
      data: {
        provider: 'xente',
        payload: parsed,
      },
    })

    if (parsed.requestId) {
      const status = normalizeStatus(parsed.status)

      const ledger = await prisma.ledgerEntry.findUnique({
        where: { referenceId: parsed.requestId },
      })

      if (ledger && ledger.status === 'pending') {
        await updateLedgerStatus(parsed.requestId, status)

        await prisma.transaction.update({
          where: { referenceId: parsed.requestId },
          data: { status },
        })

        if (status === 'succeeded') {
          const delta = ledger.type === 'collection' ? ledger.amount : -ledger.amount
          await applyWalletBalance(ledger.walletId, Number(delta))
        }
      }
    }

    return reply.code(200).send({ ok: true })
  })
}
