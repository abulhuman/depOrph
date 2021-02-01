async function orphan(_parent, { id }, { prisma }, _info) {
  return await prisma.orphan.findUnique({ where: { id: parseInt(id) } });
}

async function education(_parent, { id }, { prisma }, _info) {
  return await prisma.education.findUnique({ where: { id: parseInt(id) } });
}

async function father(_parent, { id }, { prisma }, _info) {
  return await prisma.father.findUnique({ where: { id: parseInt(id) } });
}

async function guardian(_parent, { id }, { prisma }, _info) {
  return await prisma.guardian.findUnique({ where: { id: parseInt(id) } });
}

async function motherJob(_parent, { id }, { prisma }, _info) {
  return await prisma.motherJob.findUnique({ where: { id: parseInt(id) } });
}

async function mother(_parent, { id }, { prisma }, _info) {
  return await prisma.mother.findUnique({ where: { id: parseInt(id) } });
}

async function donor(_parent, { id }, { prisma }, _info) {
  return await prisma.donor.findUnique({ where: { id: parseInt(id) } });
}

async function socialWorker(_parent, { id }, { prisma }, _info) {
  return await prisma.socialWorker.findUnique({ where: { id: parseInt(id) } });
}

async function district(_parent, { id }, { prisma }, _info) {
  return await prisma.district.findUnique({ where: { id: parseInt(id) } });
}

async function educationalRecord(_parent, { id }, { prisma }, _info) {
  return await prisma.educationalRecord.findUnique({
    where: { id: parseInt(id) }
  });
}

async function financialRecord(_parent, { id }, { prisma }, _info) {
  return await prisma.financialRecord.findUnique({
    where: { id: parseInt(id) }
  });
}

async function health(_parent, { id }, { prisma }, _info) {
  return await prisma.health.findUnique({
    where: { id: parseInt(id) }
  });
}

async function healthRecord(_parent, { id }, { prisma }, _info) {
  return await prisma.healthRecord.findUnique({
    where: { id: parseInt(id) }
  });
}

async function house_property(_parent, { id }, { prisma }, _info) {
  return await prisma.house_property.findUnique({
    where: { id: parseInt(id) }
  });
}

async function orphanPhotos(_parent, { id }, { prisma }, _info) {
  return await prisma.orphanPhotos.findUnique({
    where: { id: parseInt(id) }
  });
}

async function peasantAssociation(_parent, { id }, { prisma }, _info) {
  return await prisma.peasantAssociation.findUnique({
    where: { id: parseInt(id) }
  });
}

async function sponsorshipStatus(_parent, { id }, { prisma }, _info) {
  return await prisma.sponsorshipStatus.findUnique({
    where: { id: parseInt(id) }
  });
}

async function supportPlan(_parent, { id }, { prisma }, _info) {
  return await prisma.supportPlan.findUnique({
    where: { id: parseInt(id) }
  });
}

async function allDonors(
  _parent,
  { take, filter, orderBy },
  { prisma },
  _info
) {
  const where = filter
    ? {
        companyName: { contains: filter }
      }
    : {};
  return await prisma.donor.findMany({ take, where, orderBy });
}

async function allGuardians(
  _parent,
  { take, filter, orderBy },
  { prisma },
  _info
) {
  const where = filter
    ? {
        OR: [
          { firstName: { contains: filter } },
          { middleName: { contains: filter } },
          { lastName: { contains: filter } }
        ]
      }
    : {};
  return await prisma.guardian.findMany({ take, where, orderBy });
}

async function allMothers(
  _parent,
  { take, filter, orderBy },
  { prisma },
  _info
) {
  const where = filter
    ? {
        OR: [
          { firstName: { contains: filter } },
          { middleName: { contains: filter } },
          { lastName: { contains: filter } }
        ]
      }
    : {};
  return await prisma.mother.findMany({ take, where, orderBy });
}

async function allOrphans(
  _parent,
  { take, filter, orderBy },
  { prisma },
  _info
) {
  const where = filter
    ? {
        OR: [
          { firstName: { contains: filter } },
          { fatherName: { contains: filter } },
          { grandfatherName: { contains: filter } }
        ]
      }
    : {};
  return await prisma.orphan.findMany({ take, where, orderBy });
}

async function allSocialWorkers(
  _parent,
  { take, filter, orderBy },
  { prisma },
  _info
) {
  const where = filter
    ? {
        OR: [
          { fullName: { contains: filter } },
          { gender: { contains: filter } },
          { phoneNumber: { contains: filter } },
          { email: { contains: filter } }
        ]
      }
    : {};

  return await prisma.socialWorker.findMany({ take, where, orderBy });
}

async function allDistricts(
  _parent,
  { take, filter, orderBy },
  { prisma },
  _info
) {
  const where = filter
    ? {
        OR: [
          { districtName: { contains: filter } },
          { region: { contains: filter } },
          { zone: { contains: filter } }
        ]
      }
    : {};
  return await prisma.district.findMany({ take, where, orderBy });
}

async function allPeasantAssociations(
  _parent,
  { take, filter, orderBy },
  { prisma },
  _info
) {
  const where = filter
    ? {
        paName: { contains: filter }
      }
    : {};

  return await prisma.peasantAssociation.findMany({ take, where, orderBy });
}

async function allSupportPlans(
  _parent,
  { take, filter, orderBy },
  { prisma },
  _info
) {
  const where = filter
    ? {
        OR: [
          { currency: { contains: filter } },
          { totalFund_fc: { contains: filter } }
        ]
      }
    : {};
  return await prisma.supportPlan.findMany({ take, where, orderBy });
}

module.exports = {
  orphan,
  education,
  father,
  guardian,
  motherJob,
  mother,
  donor,
  socialWorker,
  district,
  health,
  healthRecord,
  house_property,
  orphanPhotos,
  educationalRecord,
  financialRecord,
  health,
  healthRecord,
  peasantAssociation,
  sponsorshipStatus,
  supportPlan,

  allDonors,
  allOrphans,
  allSocialWorkers,
  allGuardians,
  allMothers,
  allDistricts,
  allPeasantAssociations,
  allSupportPlans
};
