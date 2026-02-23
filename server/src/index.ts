import 'dotenv/config'

import buildServer from './server'

const server = buildServer()

const port = Number(process.env.PORT ?? 4000)
const host = process.env.HOST ?? '0.0.0.0'

const start = async () => {
  try {
    await server.listen({ port, host })
    server.log.info(`API listening on ${host}:${port}`)
  } catch (error) {
    server.log.error(error)
    process.exit(1)
  }
}

start()
