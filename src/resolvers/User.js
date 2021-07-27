function coordinator({ id }, _args, { prisma }) {
  return prisma.user.findUnique({ where: { id } }).coordinator();
}

function head({ id }, _args, { prisma }) {
  return prisma.user.findUnique({ where: { id } }).head();
}

function socialWorker({ id }, _args, { prisma }) {
  return prisma.user.findUnique({ where: { id } }).socialWorker();
}

function donor({ id }, _args, { prisma }) {
  return prisma.user.findUnique({ where: { id } }).donor();
}

module.exports = {
  coordinator,
  head,
  socialWorker,
  donor
};
