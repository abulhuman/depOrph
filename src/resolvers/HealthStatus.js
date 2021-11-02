function orphan({ id }, _args, { prisma }) {
  return prisma.healthStatus.findUnique({ where: { id } }).orphan();
}

module.exports = {
  orphan
};
