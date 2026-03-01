import { PrismaClient } from "@prisma/client";
import "dotenv/config";
declare const prisma: PrismaClient<{
    log: ("warn" | "error")[];
}, never, import("@prisma/client/runtime/library").DefaultArgs>;
export default prisma;
//# sourceMappingURL=prisma.d.ts.map