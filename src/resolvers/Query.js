const { userRoles_enum } = require("@prisma/client");
const moment = require("moment");
const {
  getUser,
  AuthenticationError,
  AuthorizationError
} = require("../utils");

async function donor(_parent, { id }, { prisma }, _info) {
  return await prisma.donor.findUnique({ where: { id: parseInt(id) } });
}

async function education(_parent, { id }, { prisma }, _info) {
  return await prisma.education.findUnique({ where: { id: parseInt(id) } });
}

async function father(_parent, { id }, { prisma }, _info) {
  return await prisma.father.findUnique({ where: { id: parseInt(id) } });
}

async function orphan(_parent, { id }, { prisma }, _info) {
  return await prisma.orphan.findUnique({ where: { id: parseInt(id) } });
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

async function socialWorker(_parent, { id }, { prisma }, _info) {
  return await prisma.socialWorker.findUnique({ where: { id: parseInt(id) } });
}

async function region(_parent, { id }, { prisma }, _info) {
  return await prisma.region.findUnique({ where: { id: parseInt(id) } });
}

async function zone(_parent, { id }, { prisma }, _info) {
  return await prisma.zone.findUnique({ where: { id: parseInt(id) } });
}

async function district(_parent, { id }, { prisma }, _info) {
  return await prisma.district.findUnique({ where: { id: parseInt(id) } });
}

async function village(_parent, { id }, { prisma }, _info) {
  return await prisma.village.findUnique({ where: { id: parseInt(id) } });
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

async function sponsorshipStatus(_parent, { id }, { prisma }, _info) {
  return await prisma.sponsorshipStatus.findUnique({
    where: { id: parseInt(id) }
  });
}

async function supportPlan(_parent, { id }, { prisma }, _info) {
  return await prisma.supportPlan.findUnique({ where: { id: parseInt(id) } });
}

async function head(_parent, { id }, { prisma }, _info) {
  return await prisma.head.findUnique({ where: { id: parseInt(id) } });
}

async function coordinator(_parent, { id }, { prisma }, _info) {
  return await prisma.coordinator.findUnique({ where: { id: parseInt(id) } });
}

async function user(_parent, { id }, { prisma }, _info) {
  return await prisma.user.findUnique({ where: { id: parseInt(id) } });
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
  const where = filter ? { firstName: { contains: filter } } : {};
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
          { firstName: { contains: filter } },
          { middleName: { contains: filter } },
          { lastName: { contains: filter } },
          { gender: { contains: filter } },
          { mobileNumber: { contains: filter } },
          { email: { contains: filter } }
        ]
      }
    : {};

  return await prisma.socialWorker.findMany({ take, where, orderBy });
}

async function allRegions(
  _parent,
  { take, filter, orderBy },
  { prisma },
  _info
) {
  const where = filter
    ? {
        name: { contains: filter }
      }
    : {};
  return await prisma.region.findMany({ take, where, orderBy });
}

async function allZones(_parent, { take, filter, orderBy }, { prisma }, _info) {
  const where = filter
    ? {
        name: { contains: filter }
      }
    : {};
  return await prisma.zone.findMany({ take, where, orderBy });
}

async function allDistricts(
  _parent,
  { take, filter, orderBy },
  { prisma },
  _info
) {
  const where = filter
    ? {
        name: { contains: filter }
      }
    : {};
  return await prisma.district.findMany({ take, where, orderBy });
}

async function allVillages(
  _parent,
  { take, filter, orderBy },
  { prisma },
  _info
) {
  const where = filter
    ? {
        name: { contains: filter }
      }
    : {};

  return await prisma.village.findMany({ take, where, orderBy });
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
          { foreignCurrency: { contains: filter } },
          { collectiveFund_fc: { contains: filter } },
          { individualFund_fc: { contains: filter } }
        ]
      }
    : {};
  return await prisma.supportPlan.findMany({ take, where, orderBy });
}

async function allHeads(_parent, { take, filter, orderBy }, { prisma }, _info) {
  const where = filter
    ? {
        OR: [
          { firstName: { contains: filter } },
          { middleName: { contains: filter } },
          { lastName: { contains: filter } }
        ]
      }
    : {};
  return await prisma.head.findMany({ take, where, orderBy });
}

async function allCoordinators(
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
  return await prisma.coordinator.findMany({ take, where, orderBy });
}

async function allUsers(
  _parent,
  { take, filter, orderBy },
  { prisma, req },
  _info
) {
  const roleFilter =
    filter == "Admin"
      ? userRoles_enum.Admin
      : filter == "SocialWorker"
      ? userRoles_enum.SocailWorker
      : filter == "Head"
      ? userRoles_enum.Head
      : filter == "Donor"
      ? userRoles_enum.Donor
      : userRoles_enum.Guest;

  const where = filter
    ? {
        OR: [{ role: { equals: roleFilter } }, { email: { contains: filter } }]
      }
    : {};
    
  if (getUser(req).userId) {
    console.log("Authenticated as SocailWorker? ", getUser(req).userRole == userRoles_enum.SocailWorker ? "yes": "no");
    if (getUser(req).userRole == userRoles_enum.Head) {
      console.log("Authorized");
      return await prisma.user.findMany({ take, where, orderBy });
    } 
    throw new AuthorizationError();
  }
  throw new AuthenticationError();

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
  region,
  zone,
  district,
  village,
  healthRecord,
  house_property,
  orphanPhotos,
  educationalRecord,
  financialRecord,
  healthRecord,
  sponsorshipStatus,
  supportPlan,
  head,
  coordinator,
  user,

  allDonors,
  allOrphans,
  allSocialWorkers,
  allGuardians,
  allMothers,
  allRegions,
  allZones,
  allDistricts,
  allVillages,
  allSupportPlans,
  allHeads,
  allCoordinators,
  allUsers
};
