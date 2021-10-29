function orphan({ id }, _args, { prisma }) {
  return prisma.educationalRecord.findUnique({ where: { id } }).orphan();
}

module.exports = {
  orphan
};
