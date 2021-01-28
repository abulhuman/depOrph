function education({ id }, _args, { prisma }) {
  return prisma.educationalRecord.findUnique({ where: { id } }).education();
}

module.exports = {
  education
};
