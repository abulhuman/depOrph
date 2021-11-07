function supportPlans({ id }, _args, { prisma }) {
  return prisma.project.findUnique({ where: { id } }).supportPlans();
}

function coordinators({ id }, _args, { prisma }) {
  return prisma.project.findUnique({ where: { id } }).coordinators();
}

function projectDocuments({ id }, _args, { prisma }) {
  return prisma.project.findUnique({ where: { id } }).projectDocuments();
}

function incomeGeneratingActivities({ id }, _args, { prisma }) {
  return prisma.project
    .findUnique({ where: { id } })
    .incomeGeneratingActivities();
}

function villages({ id }, _args, { prisma }) {
  return prisma.project
    .findUnique({ where: { id } })
    .villages();
}

module.exports = {
  supportPlans,
  coordinators,
  projectDocuments,
  incomeGeneratingActivities,
  villages
};
