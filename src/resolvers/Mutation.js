async function createOrphan(parent, args, context, info) {
  const newOrphan = await context.prisma.orphan.create({
    data: {
      firstName, fatherName, grandFatherName, greatGrandFatherName,
      gender, placeOfBirth, dateOfBirth, numberOfSponserdSiblings,
      physicalHealthStatus, psychologicalHealthStatus,
      otherHealthIssues, photoPortraitUrl, photoLongUrl,
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

async function createDonor(parent, args, context, info) {
  const newDonor = await context.prisma.donor.create({
    data: {
      companyName,
      typeOfsupport,
      initialDonationAmount,
      initialReportPreparationDate,
      finalReportPreparationDate,
      initialDataCollectionDate,
      finalDataCollectionDate,
      reportDueDate,
    } = args,
  })
  return newDonor;
}

async function createAddress(parent, args, context, info) {
  const newAddress = await context.prisma.address.create({
    data: {
      state,
      zone,
      district,
      kebele,
    } = args,
  });
  return newAddress
}

async function createSite(parent, args, context, info) {
  const newSite = await context.prisma.site.create({
    data: { siteName, donationAmount } = args,
  })
  return newSite;
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

async function createGroupOfOrphans(parent, args, context, info) {
  const newGroupOfOrphans = await context.prisma.groupOfOrphans.create({
    data: { registrationDate } = args,
  })
  return newGroupOfOrphans;
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
  createAddress,
  createSite,
  createSocialWorker,
  createGroupOfOrphans,
};

