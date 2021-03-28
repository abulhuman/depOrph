function coordinators({ id }, _args, { prisma }) {
  return prisma.education.findUnique({ where: { id } }).coordinators();
}

function heads({ id }, _args, { prisma }) {
  return prisma.education.findUnique({ where: { id } }).heads();
}

function socialWorkers({ id }, _args, { prisma }) {
  return prisma.education.findUnique({ where: { id } }).socialWorkers();
}

function donors({ id }, _args, { prisma }) {
  return prisma.education.findUnique({ where: { id } }).donors();
}

module.exports = {
  coordinators,
  heads,
  socialWorkers,
  donors
};
