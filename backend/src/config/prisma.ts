import { PrismaClient } from "@prisma/client";

import "dotenv/config";

const prisma = new PrismaClient({
  log: ["error", "warn"],
});

//export client for use in other files
export default prisma;
