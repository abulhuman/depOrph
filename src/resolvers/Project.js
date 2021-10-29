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
  return prisma.project.findUnique({ where: { id } }).incomeGeneratingActivities();
}

module.exports = {
  supportPlans,
  coordinators,
  projectDocuments,
  incomeGeneratingActivities
};
