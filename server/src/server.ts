import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import { memoriesRoutes } from './routes/memories'
import { uploadRoutes } from './routes/upload'
import { authRoutes } from './routes/auth'
import { resolve } from 'path'

const app = fastify()

const port: number = Number(process.env.PORT) || 5000

app.register(multipart)
app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads/'),
  prefix: '/uploads',
})

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: 'firepower',
})

app.register(authRoutes)
app.register(memoriesRoutes)
app.register(uploadRoutes)

app
  .listen({
    port,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`Server running on http://localhost:${port}`)
  })
