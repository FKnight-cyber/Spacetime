import { FastifyInstance } from 'fastify'
import sqlite from '../databases/sqlite'
import { z } from 'zod'

export async function memoriesRoutes(app: FastifyInstance) {
  app.get('/memories', async () => {
    const memories = await sqlite.memory.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    })

    return memories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 100).concat('...'),
      }
    })
  })

  app.get('/memories/:id', async (request: any) => {
    const id: number = Number(request.params.id)

    return await sqlite.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })
  })

  app.post('/memories', async (request) => {
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, isPublic, coverUrl } = bodySchema.parse(request.body)

    const memory = await sqlite.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: 1,
      },
    })

    return memory
  })

  app.put('/memories/:id', async (request: any) => {
    const id: number = Number(request.params.id)

    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, isPublic, coverUrl } = bodySchema.parse(request.body)

    const memory = await sqlite.memory.update({
      where: {
        id,
      },
      data: {
        content,
        coverUrl,
        isPublic,
      },
    })

    return memory
  })

  app.delete('/memories/:id', async (request: any) => {
    const id: number = Number(request.params.id)

    return await sqlite.memory.delete({
      where: {
        id,
      },
    })
  })
}
