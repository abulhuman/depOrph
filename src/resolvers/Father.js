function orphans({ id }, _args, { prisma }) {
  return prisma.father.findUnique({ where: { id } }).orphans();
}

module.exports = {
  orphans
};
