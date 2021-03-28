function jobs({ id }, _args, { prisma }) {
  return prisma.mother.findUnique({ where: { id } }).jobs();
}

function orphans({ id }, _args, { prisma }) {
  return prisma.mother.findUnique({ where: { id } }).orphans();
}

module.exports = {
  jobs,
  orphans
};
