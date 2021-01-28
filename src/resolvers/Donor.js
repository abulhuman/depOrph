function orphans({ id }, _args, { prisma }) {
  return prisma.donor.findUnique({ where: { id } }).orphans();
}

function peasantAssociations({ id }, _args, { prisma }) {
  return prisma.donor.findUnique({ where: { id } }).peasantAssociations();
}

function supportPlans({ id }, _args, { prisma }) {
  return prisma.donor.findUnique({ where: { id } }).supportPlans();
}

module.exports = {
  orphans,
  peasantAssociations,
  supportPlans
};
