import type { FastifyInstance } from 'fastify'

export async function registerHealthRoutes(server: FastifyInstance) {
  server.get('/', async () => ({ status: 'ok' }))
}
