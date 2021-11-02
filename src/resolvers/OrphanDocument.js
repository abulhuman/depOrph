function orphan({ id }, _args, { prisma }) {
  return prisma.orphanDocument.findUnique({ where: { id } }).orphan();
}

module.exports = {
  orphan
};
