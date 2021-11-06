function user({ id }, _args, { prisma }) {
  return prisma.coordinator.findUnique({ where: { id } }).user();
}

function donors({ id }, _args, { prisma }) {
  return prisma.coordinator.findUnique({ where: { id } }).donors();
}

function orphans({ id }, _args, { prisma }) {
  return prisma.coordinator.findUnique({ where: { id } }).orphans();
}

module.exports = {
  user,
  donors,
  orphans
};
