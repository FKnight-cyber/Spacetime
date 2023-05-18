import fastify from 'fastify'
import cors from '@fastify/cors'
import dotenv from 'dotenv'
import { memoriesRoutes } from './routes/memories'

dotenv.config()

const app = fastify()

const port: number = Number(process.env.PORT) || 5000

app.register(cors, {
  origin: true,
})
app.register(memoriesRoutes)

app
  .listen({
    port,
  })
  .then(() => {
    console.log(`Server running on http://localhost:${port}`)
  })
