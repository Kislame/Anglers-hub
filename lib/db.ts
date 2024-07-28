import { PrismaClient } from '@prisma/client';
//this solves hot reloades of next js
//global is not affected by hot reload
declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;
