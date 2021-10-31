function user({ id }, _args, { prisma }) {
  return prisma.coordinator.findUnique({ where: { id } }).user();
}

function donors({ id }, _args, { prisma }) {
  return prisma.coordinator.findUnique({ where: { id } }).donors();
}

module.exports = {
  user,
  donors
};
