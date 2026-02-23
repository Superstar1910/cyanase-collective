import type { FastifyInstance } from 'fastify'

const XENTE_IPS = new Set(['52.48.24.237', '34.252.29.119'])

type XenteWebhookPayload = {
  transactionId?: string
  requestId?: string
  status?: string
  amount?: string
  currency?: string
  message?: string
}

export async function registerXenteWebhookRoutes(server: FastifyInstance) {
  server.post('/xente', async (request, reply) => {
    const ip = request.ip
    if (!XENTE_IPS.has(ip)) {
      server.log.warn({ ip }, 'Blocked webhook: IP not allowed')
      return reply.code(403).send({ ok: false })
    }

    const payload = request.body as XenteWebhookPayload

    server.log.info({ payload }, 'Xente webhook received')

    // TODO: persist webhook, update ledger, reconcile transaction

    return reply.code(200).send({ ok: true })
  })
}
