const {
  userRoles_enum,
  orphan_gender_enum,
  sponsorshipstatus_enum
} = require("@prisma/client");
const {
  getUser,
  AuthenticationError,
  AuthorizationError
} = require("../utils");

async function donor(_parent, { id }, { prisma, req }, _info) {
  if (getUser(req).userId) {
    return await prisma.donor.findUnique({ where: { id: parseInt(id) } });
  }
  throw new AuthenticationError();
}

async function father(_parent, { id }, { prisma, req }, _info) {
  if (getUser(req).userId) {
    return await prisma.father.findUnique({ where: { id: parseInt(id) } });
  }
  throw new AuthenticationError();
}

async function orphan(_parent, { id }, { prisma, req }, _info) {
  if (getUser(req).userId) {
    return await prisma.orphan.findUnique({ where: { id: parseInt(id) } });
  }
  throw new AuthenticationError();
}

async function guardian(_parent, { id }, { prisma, req }, _info) {
  if (getUser(req).userId) {
    return await prisma.guardian.findUnique({ where: { id: parseInt(id) } });
  }
  throw new AuthenticationError();
}

async function motherJob(_parent, { id }, { prisma, req }, _info) {
  if (getUser(req).userId) {
    return await prisma.motherJob.findUnique({ where: { id: parseInt(id) } });
  }
  throw new AuthenticationError();
}

async function mother(_parent, { id }, { prisma, req }, _info) {
  if (getUser(req).userId) {
    return await prisma.mother.findUnique({ where: { id: parseInt(id) } });
  }
  throw new AuthenticationError();
}

async function socialWorker(_parent, { id }, { prisma, req }, _info) {
  if (getUser(req).userId) {
    return await prisma.socialWorker.findUnique({
      where: { id: parseInt(id) }
    });
  }
  throw new AuthenticationError();
}

async function region(_parent, { id }, { prisma, req }, _info) {
  if (getUser(req).userId) {
    return await prisma.region.findUnique({ where: { id: parseInt(id) } });
  }
  throw new AuthenticationError();
}

async function zone(_parent, { id }, { prisma, req }, _info) {
  if (getUser(req).userId) {
    return await prisma.zone.findUnique({ where: { id: parseInt(id) } });
  }
  throw new AuthenticationError();
}

async function district(_parent, { id }, { prisma, req }, _info) {
  if (getUser(req).userId) {
    return await prisma.district.findUnique({ where: { id: parseInt(id) } });
  }
  throw new AuthenticationError();
}

async function village(_parent, { id }, { prisma, req }, _info) {
  if (getUser(req).userId) {
    return await prisma.village.findUnique({ where: { id: parseInt(id) } });
  }
  throw new AuthenticationError();
}

async function educationalRecord(_parent, { id }, { prisma, req }, _info) {
  if (getUser(req).userId) {
    return await prisma.educationalRecord.findUnique({
      where: { id: parseInt(id) }
    });
  }
  throw new AuthenticationError();
}

async function financialRecord(_parent, { id }, { prisma, req }, _info) {
  if (getUser(req).userId) {
    return await prisma.financialRecord.findUnique({
      where: { id: parseInt(id) }
    });
  }
  throw new AuthenticationError();
}

async function orphanDocument(_parent, { id }, { prisma, req }, _info) {
  if (getUser(req).userId) {
    return await prisma.orphanDocument.findUnique({
      where: { id: parseInt(id) }
    });
  }
  throw new AuthenticationError();
}

async function house_property(_parent, { id }, { prisma, req }, _info) {
  if (getUser(req).userId) {
    return await prisma.house_property.findUnique({
      where: { id: parseInt(id) }
    });
  }
  throw new AuthenticationError();
}

async function orphanPhoto(_parent, { id }, { prisma, req }, _info) {
  if (getUser(req).userId) {
    return await prisma.orphanPhoto.findUnique({
      where: { id: parseInt(id) }
    });
  }
}

async function sponsorshipStatus(_parent, { id }, { prisma, req }, _info) {
  if (getUser(req).userId) {
    return await prisma.sponsorshipStatus.findUnique({
      where: { id: parseInt(id) }
    });
  }
  throw new AuthenticationError();
}

async function supportPlan(_parent, { id }, { prisma, req }, _info) {
  if (getUser(req).userId) {
    return await prisma.supportPlan.findUnique({ where: { id: parseInt(id) } });
  }
  throw new AuthenticationError();
}

async function head(_parent, { id }, { prisma, req }, _info) {
  if (getUser(req).userId) {
    return await prisma.head.findUnique({ where: { id: parseInt(id) } });
  }
  throw new AuthenticationError();
}

async function coordinator(_parent, { id }, { prisma, req }, _info) {
  if (getUser(req).userId) {
    return await prisma.coordinator.findUnique({ where: { id: parseInt(id) } });
  }
  throw new AuthenticationError();
}

async function user(_parent, { id }, { prisma, req }, _info) {
  if (getUser(req).userId) {
    return await prisma.user.findUnique({ where: { id: parseInt(id) } });
  }
  throw new AuthenticationError();
}

async function allDonors(
  _parent,
  { take, filter, orderBy },
  { prisma, req },
  _info
) {
  const where = filter
    ? {
        companyName: { contains: filter, mode: "insensitive" },
        nameInitials: { contains: filter, mode: "insensitive" }
      }
    : {};
  if (getUser(req).userId) {
    return await prisma.donor.findMany({ take, where, orderBy });
  }
  throw new AuthenticationError();
}

async function allGuardians(
  _parent,
  { take, filter, orderBy },
  { prisma, req },
  _info
) {
  const where = filter
    ? {
        OR: [
          { firstName: { contains: filter, mode: "insensitive" } },
          { middleName: { contains: filter, mode: "insensitive" } },
          { lastName: { contains: filter, mode: "insensitive" } }
        ]
      }
    : {};
  if (getUser(req).userId) {
    return await prisma.guardian.findMany({ take, where, orderBy });
  }
  throw new AuthenticationError();
}

async function allMothers(
  _parent,
  { take, filter, orderBy },
  { prisma, req },
  _info
) {
  const where = filter
    ? {
        OR: [
          { firstName: { contains: filter, mode: "insensitive" } },
          { middleName: { contains: filter, mode: "insensitive" } },
          { lastName: { contains: filter, mode: "insensitive" } }
        ]
      }
    : {};
  if (getUser(req).userId) {
    return await prisma.mother.findMany({ take, where, orderBy });
  }
  throw new AuthenticationError();
}

async function allOrphans(
  _parent,
  { take, filter, orderBy },
  { prisma, req },
  _info
) {
  const genderFilter =
    String(filter).toUpperCase() === "M"
      ? orphan_gender_enum.M
      : orphan_gender_enum.F;

  const sponsorshipstatusFilter =
    String(filter).toLowerCase() === "new"
      ? sponsorshipstatus_enum.new
      : String(filter).toLowerCase() === "processing"
      ? sponsorshipstatus_enum.processing
      : String(filter).toLowerCase() === "active"
      ? sponsorshipstatus_enum.active
      : String(filter).toLowerCase() === "pending"
      ? sponsorshipstatus_enum.pending
      : sponsorshipstatus_enum.graduated;

  const where = filter
    ? {
        OR: [
          { firstName: { equals: filter, mode: "insensitive" } },
          {
            father: {
              OR: [
                { firstName: { equals: filter, mode: "insensitive" } },
                { lastName: { equals: filter, mode: "insensitive" } }
              ]
            }
          },
          // { age: { equals: parseInt(filter) } },
          { gender: { equals: genderFilter } },
          {
            sponsorshipStatuses: {
              some: {
                status: { equals: sponsorshipstatusFilter }
              }
            }
          }
        ]
      }
    : {};
  if (getUser(req).userId) {
    return await prisma.orphan.findMany({ take, where, orderBy });
  }
  throw new AuthenticationError();
}

async function someOrphansByIds(
  _parent,
  { orphansIds },
  { prisma, req },
  _info
) {
  const orphans = new Array();

  if (getUser(req).userId) {
    orphansIds.forEach(async (id) => {
      const orphan = await prisma.orphan.findUnique({
        where: { id: parseInt(id) }
      });
      orphans.push(orphan);
    });
    return orphans;
  }
  throw new AuthenticationError();
}

async function someOrphansByDonorId(
  _parent,
  { take, donorId, orderBy },
  { prisma, req },
  _info
) {
  if (getUser(req).userId) {
    return prisma.orphan.findMany({
      take,
      where: {
        donorId: parseInt(donorId)
      },
      orderBy
    });
  }
  throw new AuthenticationError();
}

async function allSocialWorkers(
  _parent,
  { take, filter, orderBy },
  { prisma, req },
  _info
) {
  const where = filter
    ? {
        OR: [
          { firstName: { contains: filter, mode: "insensitive" } },
          { middleName: { contains: filter, mode: "insensitive" } },
          { lastName: { contains: filter, mode: "insensitive" } },
          { gender: { contains: filter, mode: "insensitive" } },
          { mobileNumber: { contains: filter, mode: "insensitive" } },
          { email: { contains: filter, mode: "insensitive" } }
        ]
      }
    : {};
  if (getUser(req).userId) {
    return await prisma.socialWorker.findMany({ take, where, orderBy });
  }
  throw new AuthenticationError();
}

async function allRegions(
  _parent,
  { take, filter, orderBy },
  { prisma, req },
  _info
) {
  const where = filter
    ? {
        name: { contains: filter, mode: "insensitive" }
      }
    : {};
  if (getUser(req).userId) {
    return await prisma.region.findMany({ take, where, orderBy });
  }
  throw new AuthenticationError();
}

async function allZones(
  _parent,
  { take, filter, orderBy },
  { prisma, req },
  _info
) {
  const where = filter
    ? {
        name: { contains: filter, mode: "insensitive" }
      }
    : {};
  if (getUser(req).userId) {
    return await prisma.zone.findMany({ take, where, orderBy });
  }
  throw new AuthenticationError();
}

async function allDistricts(
  _parent,
  { take, filter, orderBy },
  { prisma, req },
  _info
) {
  const where = filter
    ? {
        name: { contains: filter, mode: "insensitive" }
      }
    : {};
  if (getUser(req).userId) {
    return await prisma.district.findMany({ take, where, orderBy });
  }
  throw new AuthenticationError();
}

async function allVillages(
  _parent,
  { take, filter, orderBy },
  { prisma, req },
  _info
) {
  const where = filter
    ? {
        name: { contains: filter, mode: "insensitive" }
      }
    : {};
  if (getUser(req).userId) {
    return await prisma.village.findMany({ take, where, orderBy });
  }
  throw new AuthenticationError();
}

async function allSupportPlans(
  _parent,
  { take, filter, orderBy },
  { prisma, req },
  _info
) {
  const where = filter
    ? {
        OR: [
          { foreignCurrency: { contains: filter, mode: "insensitive" } },
          { collectiveFund_fc: { equals: filter, mode: "insensitive" } },
          { individualFund_fc: { equals: filter, mode: "insensitive" } }
        ]
      }
    : {};
  if (getUser(req).userId) {
    return await prisma.supportPlan.findMany({ take, where, orderBy });
  }
  throw new AuthenticationError();
}

async function allHeads(
  _parent,
  { take, filter, orderBy },
  { prisma, req },
  _info
) {
  const where = filter
    ? {
        OR: [
          { firstName: { contains: filter, mode: "insensitive" } },
          { middleName: { contains: filter, mode: "insensitive" } },
          { lastName: { contains: filter, mode: "insensitive" } }
        ]
      }
    : {};
  if (getUser(req).userId) {
    return await prisma.head.findMany({ take, where, orderBy });
  }
  throw new AuthenticationError();
}

async function allCoordinators(
  _parent,
  { take, filter, orderBy },
  { prisma, req },
  _info
) {
  const where = filter
    ? {
        OR: [
          { firstName: { contains: filter, mode: "insensitive" } },
          { middleName: { contains: filter, mode: "insensitive" } },
          { lastName: { contains: filter, mode: "insensitive" } }
        ]
      }
    : {};
  if (getUser(req).userId) {
    return await prisma.coordinator.findMany({ take, where, orderBy });
  }
  throw new AuthenticationError();
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
      ? userRoles_enum.SocialWorker
      : filter == "Head"
      ? userRoles_enum.Head
      : filter == "Donor"
      ? userRoles_enum.Donor
      : userRoles_enum.Guest;

  const where = filter
    ? {
        OR: [
          { role: { equals: roleFilter } },
          { email: { contains: filter, mode: "insensitive" } }
        ]
      }
    : {};

  if (getUser(req).userId) {
    // if (getUser(req).userRole == userRoles_enum.Head) {
    // }
    // throw new AuthorizationError();
    return await prisma.user.findMany({ take, where, orderBy });
  }
  throw new AuthenticationError();
}

async function allAccountMaintainences(_parent, _args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    if (getUser(req).userRole === userRoles_enum.Head) {
      return await prisma.accountMaintainence.findMany();
    }
    throw new AuthorizationError();
  }
  throw new AuthenticationError();
}

async function getDonorsByCoordinatorId(
  _parent,
  { coordinatorId },
  { prisma, req },
  _info
) {
  if (getUser(req).userId) {
    return await prisma.donor.findMany({
      where: {
        coordinators: {
          some: {
            id: {
              equals: parseInt(coordinatorId)
            }
          }
        }
      }
    });
  }
  throw new AuthenticationError();
}

async function getOrphansByDonorId(
  _parent,
  { donorId },
  { prisma, req },
  _info
) {
  if (getUser(req).userId) {
    return await prisma.orphan.findMany({
      where: {
        donors: {
          some: {
            id: {
              equals: parseInt(donorId)
            }
          }
        }
      }
    });
  }
  throw new AuthenticationError();
}

async function getActiveProjects(_parent, _args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    return await prisma.project.findMany({
      where: {
        status: { equals: "active" }
      }
    });
  }
  throw new AuthenticationError();
}

async function getProjectDocumentsByProjectId(
  _parent,
  { projectId },
  { prisma, req },
  _info
) {
  if (getUser(req).userId) {
    return await prisma.projectDocument.findMany({
      where: {
        projectId: {
          equals: parseInt(projectId)
        }
      }
    });
  }
  throw new AuthenticationError();
}

async function getSupportPlansByProjectId(
  _parent,
  { projectId },
  { prisma, req },
  _info
) {
  if (getUser(req).userId) {
    return await prisma.supportPlan.findMany({
      where: {
        projectId: { equals: parseInt(projectId) }
      }
    });
  }
  throw new AuthenticationError();
}

async function getOrphansByProjectId(
  _parent,
  { projectId },
  { prisma, req },
  _info
) {
  if (getUser(req).userId) {
    return await prisma.orphan.findMany({
      where: {
        supportPlans: {
          some: {
            projectId: {
                equals: parseInt(projectId)
            }
          }
        }
      }
    });
  }
  throw new AuthenticationError();
}

module.exports = {
  orphan,
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
  house_property,
  orphanPhoto,
  educationalRecord,
  financialRecord,
  orphanDocument,
  sponsorshipStatus,
  supportPlan,
  head,
  coordinator,
  user,

  allDonors,
  allOrphans,
  someOrphansByIds,
  someOrphansByIds,
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
  allUsers,
  allAccountMaintainences,

  getDonorsByCoordinatorId,
  getOrphansByDonorId,

  getActiveProjects,

  getProjectDocumentsByProjectId,

  getSupportPlansByProjectId,

  getOrphansByProjectId
};
