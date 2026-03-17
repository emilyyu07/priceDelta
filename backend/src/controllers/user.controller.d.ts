import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
export declare const getMe: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateUser: (req: AuthRequest, res: Response, next: Function) => Promise<void>;
//# sourceMappingURL=user.controller.d.ts.map