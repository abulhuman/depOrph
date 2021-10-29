function orphan({ id }, _args, { prisma }) {
  return prisma.orphanPhoto.findUnique({ where: { id } }).orphan();
}

module.exports = {
  orphan
};
