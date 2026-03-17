import type { Request, Response, NextFunction } from "express";
import "dotenv/config";
export interface UserPayload {
    id: string;
    email: string;
    name: string | null;
    createdAt: Date;
}
export interface AuthRequest extends Request {
    user: UserPayload;
}
export declare const protect: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=auth.middleware.d.ts.map