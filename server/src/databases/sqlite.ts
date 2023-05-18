import { PrismaClient } from '@prisma/client'

const sqlite = new PrismaClient({
  log: ['query'],
})

export default sqlite
