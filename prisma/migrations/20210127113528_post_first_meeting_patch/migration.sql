-- CreateEnum
CREATE TYPE "education_enrollmentstatus_enum" AS ENUM ('enrolled', 'unenrolled', 'droppedout');

-- CreateEnum
CREATE TYPE "education_level_enum" AS ENUM ('preSchool', 'gradeSchool', 'underGraduate', 'postGraduate', 'N/A');

-- CreateEnum
CREATE TYPE "education_typeofschool_enum" AS ENUM ('private', 'public');

-- CreateEnum
CREATE TYPE "educationalrecord_quarter_enum" AS ENUM ('first', 'second', 'third', 'fourth');

-- CreateEnum
CREATE TYPE "educationalrecord_semester_enum" AS ENUM ('first', 'second');

-- CreateEnum
CREATE TYPE "educationalrecord_yeardivision_enum" AS ENUM ('semester', 'quarter_term');

-- CreateEnum
CREATE TYPE "financialrecord_reason_enum" AS ENUM ('ASFC', 'RSFC', 'AAB', 'AFB', 'NPB', 'EW', 'HW', 'NW', 'SCW');

-- CreateEnum
CREATE TYPE "guardian_gender_enum" AS ENUM ('M', 'F');

-- CreateEnum
CREATE TYPE "guardian_relationtoorphan_enum" AS ENUM ('mother', 'grandmother', 'grandfather', 'sister', 'brother', 'uncle', 'aunt', 'cousin', 'niece', 'nephew');

-- CreateEnum
CREATE TYPE "mother_maritalStatus" AS ENUM ('married', 'widow', 'N/A');

-- CreateEnum
CREATE TYPE "mother_vitalStatus" AS ENUM ('alive', 'passed');

-- CreateEnum
CREATE TYPE "orphan_gender_enum" AS ENUM ('M', 'F');

-- CreateEnum
CREATE TYPE "orphan_psychologicalstatus_enum" AS ENUM ('isolated', 'stressed', 'unsociable', 'overlysociable', 'normal');

-- CreateEnum
CREATE TYPE "orphan_religion_enum" AS ENUM ('Christianity', 'Islam', 'Buddhism', 'Hinduism', 'Judaism');

-- CreateEnum
CREATE TYPE "socialworker_gender_enum" AS ENUM ('M', 'F');

-- CreateEnum
CREATE TYPE "sponsorshipstatus_enum" AS ENUM ('inProgress', 'active', 'suspended', 'graduated');

-- CreateEnum
CREATE TYPE "transaction_type_enum" AS ENUM ('withdrawal', 'diposit', 'assign', 're_assign');

-- CreateTable
CREATE TABLE "donor" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "companyName" TEXT NOT NULL,
    "nameInitials" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "education" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "enrollmentStatus" "education_enrollmentstatus_enum" NOT NULL,
    "schoolName" TEXT,
    "typeOfSchool" "education_typeofschool_enum",
    "year" TEXT,
    "level" "education_level_enum",
    "reason" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "father" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "dateOfDeath" TIMESTAMP(3) NOT NULL,
    "causeOfDeath" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "deathCertificateUrl" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guardian" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" "guardian_gender_enum" NOT NULL,
    "region" TEXT NOT NULL,
    "zone" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "peasantAssociation" TEXT NOT NULL,
    "relationToOrphan" "guardian_relationtoorphan_enum" NOT NULL,
    "mobile" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "POBox" TEXT,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "guardianIDCardUrl" TEXT NOT NULL,
    "guardianConfirmationLetterUrl" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mother" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "vitalStatus" "mother_vitalStatus" NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "dateOfDeath" TIMESTAMP(3),
    "causeOfDeath" TEXT,
    "phoneNumber" TEXT NOT NULL,
    "maritalStatus" "mother_maritalStatus",
    "monthlyExpense" DECIMAL(65,30) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "motherjob" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "currentJobTitle" TEXT,
    "monthlyIncome" DECIMAL(65,30),
    "initDate" TIMESTAMP(3),
    "termDate" TIMESTAMP(3),
    "motherId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orphan" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "firstName" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "grandfatherName" TEXT NOT NULL,
    "gender" "orphan_gender_enum" NOT NULL,
    "placeOfBirth" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "spokenLanguages" TEXT,
    "gradeAgeMismatchReason" TEXT,
    "hobbies" TEXT,
    "religion" "orphan_religion_enum",
    "idCardUrl" TEXT,
    "passportUrl" TEXT,
    "thankyouLetterUrl" TEXT,
    "birthCertificateUrl" TEXT NOT NULL,
    "psychologicalStatus" "orphan_psychologicalstatus_enum",
    "accountNumber" TEXT,
    "currentBalance" DECIMAL(65,30),
    "siblingId" INTEGER,
    "motherId" INTEGER,
    "fatherId" INTEGER,
    "guardianId" INTEGER,
    "educationId" INTEGER,
    "docsId" INTEGER,
    "donorId" INTEGER,
    "supportplanId" INTEGER,
    "districtId" INTEGER,
    "peasantAssociationId" INTEGER,
    "socialworkerId" INTEGER,
    "house_propertyId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "socialworker" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "fullName" TEXT NOT NULL,
    "gender" "socialworker_gender_enum",
    "dateOfBirth" TIMESTAMP(3),
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "initDate" TIMESTAMP(3),
    "termDate" TIMESTAMP(3),
    "peasantAssociationId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "district" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "districtName" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "zone" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "educationalrecord" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "yearDivision" "educationalrecord_yeardivision_enum",
    "quarter" "educationalrecord_quarter_enum",
    "semester" "educationalrecord_semester_enum",
    "totalMark" DECIMAL(65,30),
    "numberOfSubjects" INTEGER,
    "average" DECIMAL(65,30),
    "rank" INTEGER,
    "reportCardUrl" TEXT,
    "semesterGPA" DECIMAL(65,30),
    "cumulativeGPA" DECIMAL(65,30),
    "educationId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financialrecord" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "transactionDate" TIMESTAMP(3),
    "transactionType" "transaction_type_enum",
    "amount" DECIMAL(65,30),
    "reason" "financialrecord_reason_enum",
    "specialCaseReason" TEXT,
    "orphanId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "health" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "healthDescription" TEXT NOT NULL,
    "orphanId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "healthrecord" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "medicalCenterName" TEXT,
    "dateOfExamination" TIMESTAMP(3),
    "diagnosis" TEXT,
    "doctorsRecommendation" TEXT,
    "restRecommended" TEXT,
    "totalMedicalExpense" DECIMAL(65,30),
    "medicalCerificateUrl" TEXT,
    "healthId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "house_property" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "housingSituation" TEXT NOT NULL,
    "otherProperty" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orphanphotos" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "photoPortraitUrl" TEXT NOT NULL,
    "photoLongUrl" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "peasantassociation" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "registrationDate" TIMESTAMP(3) NOT NULL,
    "paName" TEXT,
    "districtId" INTEGER,
    "donorId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sponsorshipstatus" (
    "id" SERIAL NOT NULL,
    "status" "sponsorshipstatus_enum",
    "orphanId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supportplan" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "totalFund_fc" DECIMAL(65,30),
    "currency" TEXT,
    "totalFund_brr" DECIMAL(65,30),
    "adminFee_brr" DECIMAL(65,30),
    "netPayment_brr" DECIMAL(65,30),
    "initDate" TIMESTAMP(3),
    "termDate" TIMESTAMP(3),
    "donorId" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "motherjob" ADD FOREIGN KEY ("motherId") REFERENCES "mother"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orphan" ADD FOREIGN KEY ("districtId") REFERENCES "district"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orphan" ADD FOREIGN KEY ("docsId") REFERENCES "orphanphotos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orphan" ADD FOREIGN KEY ("donorId") REFERENCES "donor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orphan" ADD FOREIGN KEY ("educationId") REFERENCES "education"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orphan" ADD FOREIGN KEY ("fatherId") REFERENCES "father"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orphan" ADD FOREIGN KEY ("guardianId") REFERENCES "guardian"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orphan" ADD FOREIGN KEY ("house_propertyId") REFERENCES "house_property"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orphan" ADD FOREIGN KEY ("motherId") REFERENCES "mother"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orphan" ADD FOREIGN KEY ("peasantAssociationId") REFERENCES "peasantassociation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orphan" ADD FOREIGN KEY ("siblingId") REFERENCES "orphan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orphan" ADD FOREIGN KEY ("socialworkerId") REFERENCES "socialworker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orphan" ADD FOREIGN KEY ("supportplanId") REFERENCES "supportplan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orphan" ADD FOREIGN KEY ("guardianId") REFERENCES "guardian"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "socialworker" ADD FOREIGN KEY ("peasantAssociationId") REFERENCES "peasantassociation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "educationalrecord" ADD FOREIGN KEY ("educationId") REFERENCES "education"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financialrecord" ADD FOREIGN KEY ("orphanId") REFERENCES "orphan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "health" ADD FOREIGN KEY ("orphanId") REFERENCES "orphan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "healthrecord" ADD FOREIGN KEY ("healthId") REFERENCES "health"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peasantassociation" ADD FOREIGN KEY ("districtId") REFERENCES "district"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peasantassociation" ADD FOREIGN KEY ("donorId") REFERENCES "donor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sponsorshipstatus" ADD FOREIGN KEY ("orphanId") REFERENCES "orphan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supportplan" ADD FOREIGN KEY ("donorId") REFERENCES "donor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
