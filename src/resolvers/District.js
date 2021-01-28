function orphans({ id }, _args, { prisma }) {
  return prisma.district.findUnique({ where: { id } }).orphans();
}

function peasantAssociations({ id }, _args, { prisma }) {
  return prisma.district.findUnique({ where: { id } }).peasantAssociations();
}

module.exports = {
  orphans,
  peasantAssociations
};
