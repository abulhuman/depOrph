function orphan({ id }, _args, { prisma }) {
  return prisma.orphanPhotos.findUnique({ where: { id } }).orphan();
}

module.exports = {
  orphan
};
