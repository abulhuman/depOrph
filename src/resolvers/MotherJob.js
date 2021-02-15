function mother({ id }, _args, { prisma }) {
  return prisma.motherJob.findUnique({ where: { id } }).mother();
}

module.exports = {
  mother
};
