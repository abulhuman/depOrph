/*
  Warnings:

  - You are about to drop the column `siblingId` on the `orphan` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "orphan" DROP CONSTRAINT "orphan_siblingId_fkey";

-- AlterTable
ALTER TABLE "orphan" DROP COLUMN "siblingId";

-- CreateTable
CREATE TABLE "_orphan_sibling" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_orphan_sibling_AB_unique" ON "_orphan_sibling"("A", "B");

-- CreateIndex
CREATE INDEX "_orphan_sibling_B_index" ON "_orphan_sibling"("B");

-- AddForeignKey
ALTER TABLE "_orphan_sibling" ADD FOREIGN KEY ("A") REFERENCES "orphan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_orphan_sibling" ADD FOREIGN KEY ("B") REFERENCES "orphan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
