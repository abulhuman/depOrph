/*
  Warnings:

  - The migration will remove the values [diposit] on the enum `transaction_type_enum`. If these variants are still used in the database, the migration will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "transaction_type_enum_new" AS ENUM ('withdrawal', 'deposit', 'assign', 're_assign');
ALTER TABLE "public"."financialrecord" ALTER COLUMN "transactionType" TYPE "transaction_type_enum_new" USING ("transactionType"::text::"transaction_type_enum_new");
ALTER TYPE "transaction_type_enum" RENAME TO "transaction_type_enum_old";
ALTER TYPE "transaction_type_enum_new" RENAME TO "transaction_type_enum";
DROP TYPE "transaction_type_enum_old";
COMMIT;
