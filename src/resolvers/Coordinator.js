function user({ id }, _args, { prisma }) {
  return prisma.coordinator.findUnique({ where: { id } }).user();
}

function villages({ id }, _args, { prisma }) {
  return prisma.coordinator.findUnique({ where: { id } }).villages();
}

function districts({ id }, _args, { prisma }) {
  return prisma.coordinator.findUnique({ where: { id } }).districts();
}

function donors({ id }, _args, { prisma }) {
  return prisma.coordinator.findUnique({ where: { id } }).donors();
}

module.exports = {
  user,
  villages,
  districts,
  donors
};
