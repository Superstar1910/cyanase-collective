import Fastify from 'fastify'

import { registerHealthRoutes } from './routes/health'
import { registerXenteWebhookRoutes } from './routes/xente'

export default function buildServer() {
  const server = Fastify({ logger: true })

  server.register(registerHealthRoutes, { prefix: '/health' })
  server.register(registerXenteWebhookRoutes, { prefix: '/webhooks' })

  return server
}
