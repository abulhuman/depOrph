/*
  Warnings:

  - Added the required column `date` to the `sponsorshipstatus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sponsorshipstatus" ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
