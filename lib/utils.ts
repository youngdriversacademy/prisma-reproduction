
import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
    errorFormat: "pretty",
  });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;

