function donor({ id }, _args, { prisma }) {
  return prisma.supportPlan.findUnique({ where: { id } }).donor();
}

function project({ id }, _args, { prisma }) {
  return prisma.supportPlan.findUnique({ where: { id } }).project();
}

function orphans({ id }, _args, { prisma }) {
  return prisma.supportPlan.findUnique({ where: { id } }).orphans();
}

module.exports = {
  donor,
  project,
  orphans
};
