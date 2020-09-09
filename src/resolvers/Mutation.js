async function createOrphan(parent, args, context, info) {
  const newOrphan = await context.prisma.orphan.create({
    data: {
      firstName, fatherName, grandFatherName, greatGrandFatherName,
      gender, placeOfBirth, dateOfBirth, numberOfSponserdSiblings,
      physicalHealthStatus, psychologicalHealthStatus, otherHealthIssues,

    } = args,
  });

  return newOrphan;
}

async function createIga_property(parent, args, context, info) {
  const newIga_property = await context.prisma.iga_property.create({
    data: { ownershipStatus, otherProperty, } = args,
  });
  return newIga_property;
}

async function createEducation(parent, args, context, info) {
  const newEducation = await context.prisma.education.create({
    data: {
      enrollmentStatus, schoolName, typeOfSchool,
      grade, reason, hobbies,
    } = args,
  });
  return newEducation;
}

async function createFather(parent, args, context, info) {

  const newFather = await context.prisma.father.create({
    data: { dateOfDeath, causeOfDeath, job, monthlyIncome, dateOfBirth, } = args,
  })
  return newFather;

}

async function createSibling(parent, args, context, info) {
  const newSibling = await context.prisma.sibling.create({
    data: { fullName, gender, age, schoolGrade, job, maritalStatus, } = args,
  })
  return newSibling;
}

async function createGuardian(parent, args, context, info) {
  const newGuardian = await context.prisma.guardian.create({
    data: {
      firstName, middleName, lastName, gender, nationality,
      state, zone, district, kebele, relationToOrphan,
      email, job, age
    } = args,
  })
  return newGuardian;
}

async function createMotherJob(parent, args, context, info) {
  const newMotherJob = await context.prisma.motherJob.create({
    data: { currentJobTitle, monthlyIncome, } = args,
  });
  return newMotherJob
}

async function createMother(parent, args, context, info) {
  const newMother = await context.prisma.mother.create({
    data: {
      firstName, middleName, lastName, dateOfBirth,
      phoneNumber, job, maritalStatus, vitalStatus,
      monthlyExpense,
    } = args,
  });
  return newMother;
}

async function createOfficialDocuments(parent, args, context, info) {
  return await context.prisma.officialDocuments.create({
    data: {
      photoPortraitUrl,
      photoLongUrl,
      fatherDeathCertificateUrl,
      birthCertificateUrl,
      guardianIDCardUrl,
      guardianConfirmationLetterUrl,
    } = args,
  })
}

async function createDonor(parent, args, context, info) {
  const newDonor = await context.prisma.donor.create({
    data: {
      companyName,
      initialReportPreparationDate,
      finalReportPreparationDate,
      initialDataCollectionDate,
      finalDataCollectionDate,
      reportDueDate,
    } = args,
  })
  return newDonor;
}

async function createSocialWorker(parent, args, context, info) {
  const newSocialWorker = await context.prisma.socialWorker.create({
    data: {
      fullName,
      phoneNumber,
      email,
    } = args,
  })
  return newSocialWorker;
}

async function createRegisteredGroup(parent, args, context, info) {
  const newRegisteredGroup = await context.prisma.registeredGroup.create({
    data: { registrationDate } = args,
  })
  return newRegisteredGroup;
}

async function createSponsoredGroup(parent, args, context, info) {
  const newSponsoredGroup = await context.prisma.sponsoredGroup.create({
    data: { sponsorshipDate } = args,
  })
  return newSponsoredGroup;
}

async function createSupport(parent, args, context, info) {
  const newSupport = await context.prisma.support.create({
    data: { registrationDate } = args,
  })
  return newSupport;
}


async function createFinalcialSupport(parent, args, context, info) {
  return await context.prisma.financialSupport.create({
    data: args,
  })
}

async function createEducationalSupport(parent, args, context, info) {
  return await context.prisma.educationalSupport.create({
    data: args,
  })
}

async function createOtherSupport(parent, args, context, info) {
  return await context.prisma.otherSupport.create({
    data: args,
  })
}

module.exports = {
  createOrphan,
  createIga_property,
  createEducation,
  createFather,
  createSibling,
  createGuardian,
  createMotherJob,
  createMother,
  createDonor,
  createSocialWorker,
  createRegisteredGroup,
  createOfficialDocuments,
  createSponsoredGroup,
  createSupport,
  createFinalcialSupport,
  createEducationalSupport,
  createOtherSupport,
};

