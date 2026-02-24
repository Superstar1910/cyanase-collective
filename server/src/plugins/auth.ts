import fp from 'fastify-plugin'
import fastifyJwt from '@fastify/jwt'

export default fp(async (server) => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    server.log.warn('JWT_SECRET not set; auth will fail')
  }

  server.register(fastifyJwt, {
    secret: secret ?? 'dev-secret',
    verify: {
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE,
    },
  })

  server.decorate('authenticate', async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch (error) {
      reply.code(401).send({ error: 'Unauthorized' })
    }
  })
})
