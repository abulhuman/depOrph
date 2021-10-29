function socialWorker({ id }, _args, { prisma }) {
  return prisma.village.findUnique({ where: { id } }).socialWorker();
}

function district({ id }, _args, { prisma }) {
  return prisma.village.findUnique({ where: { id } }).district();
}


function orphans({ id }, _args, { prisma }) {
  return prisma.village.findUnique({ where: { id } }).orphans();
}

module.exports = {
  socialWorker,
  district,
  orphans
};
