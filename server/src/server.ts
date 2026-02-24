import cors from '@fastify/cors'
import { clerkPlugin } from '@clerk/fastify'
import Fastify from 'fastify'

import { registerHealthRoutes } from './routes/health'
import { registerAccountRoutes } from './routes/accounts'
import { registerPaymentRoutes } from './routes/payments'
import { registerXenteWebhookRoutes } from './routes/xente'

export default function buildServer() {
  const server = Fastify({ logger: true })

  server.register(clerkPlugin)

  server.register(cors, {
    origin: (origin, cb) => {
      const allowed = (process.env.CORS_ORIGIN ?? '').split(',').map((v) => v.trim()).filter(Boolean)
      if (!origin || allowed.length === 0 || allowed.includes(origin)) {
        cb(null, true)
        return
      }
      cb(new Error('Not allowed by CORS'), false)
    },
    credentials: true,
  })

  server.register(registerHealthRoutes, { prefix: '/health' })
  server.register(registerAccountRoutes, { prefix: '/accounts' })
  server.register(registerPaymentRoutes, { prefix: '/payments' })
  server.register(registerXenteWebhookRoutes, { prefix: '/webhooks' })

  return server
}
