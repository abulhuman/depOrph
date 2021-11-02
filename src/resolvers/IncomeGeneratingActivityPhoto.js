function incomeGeneratingActivity({ id }, _args, { prisma }) {
  return prisma.incomeGeneratingActivityPhoto
    .findUnique({ where: { id } })
    .incomeGeneratingActivity();
}

module.exports = {
  incomeGeneratingActivity
};
