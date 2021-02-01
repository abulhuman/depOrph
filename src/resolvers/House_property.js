function orphans({ id }, _args, { prisma }) {
  return prisma.house_property.findUnique({ where: { id } }).orphans();
}

module.exports = {
  orphans
};
