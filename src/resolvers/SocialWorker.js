function user({ id }, _args, { prisma }) {
  return prisma.socialWorker.findUnique({ where: { id } }).user();
}

function district({ id }, _args, { prisma }) {
  return prisma.socialWorker.findUnique({ where: { id } }).district();
}

function orphans({ id }, _args, { prisma }) {
  return prisma.socialWorker.findUnique({ where: { id } }).orphans();
}

module.exports = {
  user,
  district,
  orphans
};
