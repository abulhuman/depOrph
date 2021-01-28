function orphan({ id }, _args, { prisma }) {
  return prisma.house_property.findUnique({ where: { id } }).orphan();
}

module.exports = {
  orphan
};
