/*
  Warnings:

  - The values [gradeSchool] on the enum `education_level_enum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "education_level_enum_new" AS ENUM ('religiousEducation', 'preSchool', 'primary/elementary', 'junior', 'highschool', 'underGraduate', 'postGraduate', 'N/A');
ALTER TABLE "education" ALTER COLUMN "level" TYPE "education_level_enum_new" USING ("level"::text::"education_level_enum_new");
ALTER TABLE "educationalrecord" ALTER COLUMN "level" TYPE "education_level_enum_new" USING ("level"::text::"education_level_enum_new");
ALTER TYPE "education_level_enum" RENAME TO "education_level_enum_old";
ALTER TYPE "education_level_enum_new" RENAME TO "education_level_enum";
DROP TYPE "education_level_enum_old";
COMMIT;

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

-- AlterTable
ALTER TABLE "village" ALTER COLUMN "registrationDate" SET DEFAULT '1970-01-01 00:00:00 +00:00';
