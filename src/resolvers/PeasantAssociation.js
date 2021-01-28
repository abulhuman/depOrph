function district({ id }, _args, { prisma }) {
  return prisma.peasantAssociation.findUnique({ where: { id } }).district();
}

function donor({ id }, _args, { prisma }) {
  return prisma.peasantAssociation.findUnique({ where: { id } }).donor();
}

function orphans({ id }, _args, { prisma }) {
  return prisma.peasantAssociation.findUnique({ where: { id } }).orphans();
}

function socialWorkers({ id }, _args, { prisma }) {
  return prisma.peasantAssociation.findUnique({ where: { id } }).socialWorkers();
}

module.exports = {
  district,
  donor,
  orphans,
  socialWorkers
};
