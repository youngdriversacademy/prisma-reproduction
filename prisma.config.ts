import path from "node:path";
import 'dotenv/config';
import type { PrismaConfig } from "prisma";

export default {
  schema: path.join("prisma"),
  experimental: {
    adapter: true,
  },
  migrations: {
    path: path.join("prisma", "migrations"),
    seed: "bun ./prisma/seed/index.ts",
  },
} satisfies PrismaConfig;