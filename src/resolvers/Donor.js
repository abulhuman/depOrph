function coordinators({ id }, _args, { prisma }) {
  return prisma.donor.findUnique({ where: { id } }).coordinators();
}

function user({ id }, _args, { prisma }) {
  return prisma.donor.findUnique({ where: { id } }).user();
}

function orphans({ id }, _args, { prisma }) {
  return prisma.donor.findUnique({ where: { id } }).orphans();
}

function supportPlans({ id }, _args, { prisma }) {
  return prisma.donor.findUnique({ where: { id } }).supportPlans();
}

module.exports = {
  coordinators,
  user,
  orphans,
  supportPlans
};
