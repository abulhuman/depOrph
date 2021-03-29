function coordinators({ id }, _args, { prisma }) {
  return prisma.user.findUnique({ where: { id } }).coordinators();
}

function heads({ id }, _args, { prisma }) {
  return prisma.user.findUnique({ where: { id } }).heads();
}

function socialWorkers({ id }, _args, { prisma }) {
  return prisma.user.findUnique({ where: { id } }).socialWorkers();
}

function donors({ id }, _args, { prisma }) {
  return prisma.user.findUnique({ where: { id } }).donors();
}

module.exports = {
  coordinators,
  heads,
  socialWorkers,
  donors
};
