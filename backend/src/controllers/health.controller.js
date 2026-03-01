"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHealth = void 0;
const getHealth = (_req, res) => {
    res.status(200).json({
        status: "UP",
        timestamp: new Date().toISOString(),
        //how long server has been running
        uptime: process.uptime(),
    });
};
exports.getHealth = getHealth;
//# sourceMappingURL=health.controller.js.map