import { FastifyInstance } from 'fastify'
import sqlite from '../databases/sqlite'
import { z } from 'zod'

export async function memoriesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.get('/memories', async (request) => {
    const memories = await sqlite.memory.findMany({
      where: {
        userId: Number(request.user.sub),
      },
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

  app.get('/memories/:id', async (request: any, reply) => {
    const id: number = Number(request.params.id)

    const memory = await sqlite.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (!memory.isPublic && memory.userId !== Number(request.user.sub))
      return reply.status(401).send()

    return memory
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

  app.put('/memories/:id', async (request: any, reply) => {
    const id: number = Number(request.params.id)

    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, isPublic, coverUrl } = bodySchema.parse(request.body)

    let memory = await sqlite.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (memory.userId !== Number(request.user.sub))
      return reply.status(401).send()

    memory = await sqlite.memory.update({
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

  app.delete('/memories/:id', async (request: any, reply) => {
    const id: number = Number(request.params.id)

    const memory = await sqlite.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (memory.userId !== Number(request.user.sub))
      return reply.status(401).send()

    await sqlite.memory.delete({
      where: {
        id,
      },
    })
  })
}
