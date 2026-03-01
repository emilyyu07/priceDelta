"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_js_1 = require("../controllers/user.controller.js"); // Import updateUser
const auth_middleware_js_1 = require("../middleware/auth.middleware.js");
const router = (0, express_1.Router)();
router.get("/me", auth_middleware_js_1.protect, user_controller_js_1.getMe);
router.patch("/me", auth_middleware_js_1.protect, user_controller_js_1.updateUser); // Add new PATCH route
exports.default = router;
//# sourceMappingURL=user.routes.js.map