function orphans({ id }, _args, { prisma }) {
  return prisma.mother.findUnique({ where: { id } }).orphans();
}

function jobs({ id }, _args, { prisma }) {
  return prisma.mother.findUnique({ where: { id } }).jobs();
}

module.exports = {
  orphans,
  jobs
};
