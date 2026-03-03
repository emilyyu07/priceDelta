-- AlterTable
ALTER TABLE "products" ADD COLUMN     "url" TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "password" DROP DEFAULT;
