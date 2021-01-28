function orphan({ id }, _args, { prisma }) {
  return prisma.financialRecord.findUnique({ where: { id } }).orphan();
}

module.exports = {
  orphan
};
