/*
  Warnings:

  - You are about to drop the column `coordinatorId` on the `district` table. All the data in the column will be lost.
  - You are about to drop the column `donorId` on the `district` table. All the data in the column will be lost.
  - You are about to drop the column `initDate` on the `motherjob` table. All the data in the column will be lost.
  - You are about to drop the column `termDate` on the `motherjob` table. All the data in the column will be lost.
  - You are about to drop the column `coordinatorId` on the `village` table. All the data in the column will be lost.
  - You are about to drop the column `donorId` on the `village` table. All the data in the column will be lost.
  - You are about to drop the column `registrationDate` on the `village` table. All the data in the column will be lost.
  - You are about to drop the `orphanphotos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "district" DROP CONSTRAINT "district_coordinatorId_fkey";

-- DropForeignKey
ALTER TABLE "district" DROP CONSTRAINT "district_donorId_fkey";

-- DropForeignKey
ALTER TABLE "orphanphotos" DROP CONSTRAINT "orphanphotos_orphanId_fkey";

-- DropForeignKey
ALTER TABLE "village" DROP CONSTRAINT "village_coordinatorId_fkey";

-- DropForeignKey
ALTER TABLE "village" DROP CONSTRAINT "village_donorId_fkey";

-- AlterTable
ALTER TABLE "district" DROP COLUMN "coordinatorId",
DROP COLUMN "donorId";

-- AlterTable
ALTER TABLE "father" ALTER COLUMN "dateOfDeath" SET DEFAULT '1970-01-01 00:00:00 +00:00',
ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "guardian" ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "mother" ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "motherjob" DROP COLUMN "initDate",
DROP COLUMN "termDate",
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "startDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "orphan" ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "sponsorshipstatus" ALTER COLUMN "date" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "village" DROP COLUMN "coordinatorId",
DROP COLUMN "donorId",
DROP COLUMN "registrationDate";

-- DropTable
DROP TABLE "orphanphotos";

-- CreateTable
CREATE TABLE "orphanphoto" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "photoPortraitUrl" TEXT NOT NULL DEFAULT E'',
    "photoLongUrl" TEXT,
    "orphanId" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orphanphoto" ADD FOREIGN KEY ("orphanId") REFERENCES "orphan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
