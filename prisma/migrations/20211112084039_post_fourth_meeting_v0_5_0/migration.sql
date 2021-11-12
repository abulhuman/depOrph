-- AlterTable
ALTER TABLE "father" ALTER COLUMN "dateOfDeath" SET DEFAULT '1970-01-01 00:00:00 +00:00',
ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "guardian" ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "mother" ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "orphan" ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "sponsorshipstatus" ALTER COLUMN "date" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- CreateTable
CREATE TABLE "individualPayment" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "depositInPrimaryForeignCurrency" DOUBLE PRECISION NOT NULL,
    "depositInSecondaryForeignCurrency" DOUBLE PRECISION NOT NULL,
    "grossDepositInDomesticCurrency" DOUBLE PRECISION NOT NULL,
    "adminFeeInDomesticCurrency" DOUBLE PRECISION NOT NULL,
    "netDepositInDomesticCurrency" DOUBLE PRECISION NOT NULL,
    "orphanId" INTEGER,
    "paymentId" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "individualPayment" ADD FOREIGN KEY ("orphanId") REFERENCES "orphan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "individualPayment" ADD FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
