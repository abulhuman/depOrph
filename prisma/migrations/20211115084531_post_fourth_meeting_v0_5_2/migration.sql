-- AlterTable
ALTER TABLE "father" ALTER COLUMN "dateOfDeath" SET DEFAULT '1970-01-01 00:00:00 +00:00',
ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "guardian" ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "individualPayment" ALTER COLUMN "depositInPrimaryForeignCurrency" DROP NOT NULL,
ALTER COLUMN "depositInSecondaryForeignCurrency" DROP NOT NULL;

-- AlterTable
ALTER TABLE "mother" ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "orphan" ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "payment" ALTER COLUMN "paymentInPrimaryForeignCurrency" DROP NOT NULL,
ALTER COLUMN "primaryForeignCurrency" DROP NOT NULL,
ALTER COLUMN "primaryExchangeRate" DROP NOT NULL,
ALTER COLUMN "paymentInSecondaryForeignCurrency" DROP NOT NULL,
ALTER COLUMN "secondaryForeignCurrency" DROP NOT NULL,
ALTER COLUMN "secondaryExchangeRate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "sponsorshipstatus" ALTER COLUMN "date" SET DEFAULT '1970-01-01 00:00:00 +00:00';
