import type { NextFunction, Request, Response } from "express";
import type { ZodTypeAny } from "zod";
export declare const validate: <T extends ZodTypeAny>(schema: T) => (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
//# sourceMappingURL=validate.d.ts.map