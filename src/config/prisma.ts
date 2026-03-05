import { PrismaClient } from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "./env.js"

const adapter = new PrismaPg({
  connectionString: env.database_url,
});


export const prisma = new PrismaClient({ adapter });