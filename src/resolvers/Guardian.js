function orphans({ id }, _args, { prisma }) {
  return prisma.guardian.findUnique({ where: { id } }).orphans();
}

module.exports = {
  orphans
};
