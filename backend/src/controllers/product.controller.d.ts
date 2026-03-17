import type { Request, Response } from "express";
export declare const trackProduct: (req: Request, res: Response) => Promise<void>;
export declare const getTrackStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getQueueHealth: (_req: Request, res: Response) => Promise<void>;
export declare const clearStuckJobs: (_req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=product.controller.d.ts.map