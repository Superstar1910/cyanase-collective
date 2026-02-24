import Fastify from 'fastify'

import { clerkPlugin } from '@clerk/fastify'

import { registerHealthRoutes } from './routes/health'
import { registerAccountRoutes } from './routes/accounts'
import { registerPaymentRoutes } from './routes/payments'
import { registerXenteWebhookRoutes } from './routes/xente'

export default function buildServer() {
  const server = Fastify({ logger: true })

  server.register(clerkPlugin)

  server.register(registerHealthRoutes, { prefix: '/health' })
  server.register(registerAccountRoutes, { prefix: '/accounts' })
  server.register(registerPaymentRoutes, { prefix: '/payments' })
  server.register(registerXenteWebhookRoutes, { prefix: '/webhooks' })

  return server
}
