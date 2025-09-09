import bcrypt from "bcrypt";
import { adminAndParentUsers, driverUsers } from "./data";
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

async function main() {
  const parentMap: Record<string, string> = {};

  // Seed admins and parents
  for (const user of adminAndParentUsers) {
    const created = await prisma.user.create({
      data: {
        ...user,
        password: await bcrypt.hash(user.password, 12),
      },
    });
    parentMap[user.email] = created.id;
  }

  // Seed drivers with linked parentId
  for (const { parentEmail, ...user } of driverUsers) {
    const parentId = parentMap[parentEmail];
    if (!parentId) {
      console.warn(`Parent not found for ${user.email}: ${parentEmail}`);
      continue;
    }

    await prisma.user.create({
      data: {
        ...user,
        driverGroup: user.driverGroup,
        password: await bcrypt.hash(user.password, 12),
        parentId,
      },
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
