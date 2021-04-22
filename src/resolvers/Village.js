function coordinator({ id }, _args, { prisma }) {
  return prisma.village.findUnique({ where: { id } }).coordinator();
}

function socialWorker({ id }, _args, { prisma }) {
  return prisma.village.findUnique({ where: { id } }).socialWorker();
}

function district({ id }, _args, { prisma }) {
  return prisma.village.findUnique({ where: { id } }).district();
}

function donor({ id }, _args, { prisma }) {
  return prisma.village.findUnique({ where: { id } }).donor();
}

function orphans({ id }, _args, { prisma }) {
  return prisma.village.findUnique({ where: { id } }).orphans();
}

module.exports = {
  coordinator,
  socialWorker,
  district,
  donor,
  orphans
};
