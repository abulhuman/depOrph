function orphan({ id }, _args, { prisma }) {
  return prisma.healthRecord.findUnique({ where: { id } }).orphan();
}

module.exports = {
  orphan
};
