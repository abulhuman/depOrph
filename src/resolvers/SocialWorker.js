function peasantAssociation({ id }, _args, { prisma }) {
  return prisma.socialWorker.findUnique({ where: { id } }).peasantAssociation();
}

function orphans({ id }, _args, { prisma }) {
  return prisma.socialWorker.findUnique({ where: { id } }).orphans();
}

module.exports = {
  peasantAssociation,
  orphans
};
