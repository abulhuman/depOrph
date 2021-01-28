function donor({ id }, _args, { prisma }) {
  return prisma.supportPlan.findUnique({ where: { id } }).donor();
}

function orphans({ id }, _args, { prisma }) {
  return prisma.supportPlan.findUnique({ where: { id } }).orphans();
}

module.exports = {
  donor,
  orphans
};
