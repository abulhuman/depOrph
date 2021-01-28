function health({ id }, _args, { prisma }) {
  return prisma.healthRecord.findUnique({ where: { id } }).health();
}

module.exports = {
  health
};
