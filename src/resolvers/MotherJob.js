function mother({ id }, { prisma }) {
  return prisma.motherJob.findUnique({ where: { id } }).mother();
}

module.exports = {
  mother
};
