"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
require("dotenv/config");
const prisma = new client_1.PrismaClient({
    log: ["error", "warn"],
});
//export client for use in other files
exports.default = prisma;
//# sourceMappingURL=prisma.js.map