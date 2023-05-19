import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'

const app = fastify()

const port: number = Number(process.env.PORT) || 5000

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: 'firepower',
})

app.register(authRoutes)
app.register(memoriesRoutes)

app
  .listen({
    port,
  })
  .then(() => {
    console.log(`Server running on http://localhost:${port}`)
  })
