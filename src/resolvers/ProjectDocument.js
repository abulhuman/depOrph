function project({ id }, _args, { prisma }) {
  return prisma.projectDocument.findUnique({ where: { id } }).project();
}

module.exports = {
  project
};
