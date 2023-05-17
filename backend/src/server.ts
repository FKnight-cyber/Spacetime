import fastify from 'fastify'
import sqlite from './databases/sqlite'
import dotenv from 'dotenv'

dotenv.config()

const app = fastify()

const port: number = Number(process.env.PORT) || 5000

app.get('/users', async () => {
  return await sqlite.user.findMany()
})

app
  .listen({
    port,
  })
  .then(() => {
    console.log(`Server running on http://localhost:${port}`)
  })
