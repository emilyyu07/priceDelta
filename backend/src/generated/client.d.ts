import * as runtime from "@prisma/client/runtime/client";
import * as $Class from "./internal/class.js";
import * as Prisma from "./internal/prismaNamespace.js";
export * as $Enums from './enums.js';
export * from "./enums.js";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Retailers
 * const retailers = await prisma.retailer.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model Retailer
 *
 */
export type Retailer = Prisma.RetailerModel;
/**
 * Model Product
 *
 */
export type Product = Prisma.ProductModel;
/**
 * Model ProductListing
 *
 */
export type ProductListing = Prisma.ProductListingModel;
/**
 * Model PriceHistory
 *
 */
export type PriceHistory = Prisma.PriceHistoryModel;
/**
 * Model User
 *
 */
export type User = Prisma.UserModel;
/**
 * Model PriceAlert
 *
 */
export type PriceAlert = Prisma.PriceAlertModel;
/**
 * Model Notification
 *
 */
export type Notification = Prisma.NotificationModel;
/**
 * Model SavedSearch
 *
 */
export type SavedSearch = Prisma.SavedSearchModel;
/**
 * Model IngestionLog
 *
 */
export type IngestionLog = Prisma.IngestionLogModel;
//# sourceMappingURL=client.d.ts.map