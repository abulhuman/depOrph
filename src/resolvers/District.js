function coordinator({ id }, _args, { prisma }) {
  return prisma.district.findUnique({ where: { id } }).coordinator();
}

function zone({ id }, _args, { prisma }) {
  return prisma.district.findUnique({ where: { id } }).zone();
}

function villages({ id }, _args, { prisma }) {
  return prisma.district.findUnique({ where: { id } }).villages();
}

function socialWorkers({ id }, _args, { prisma }) {
  return prisma.district.findUnique({ where: { id } }).socialWorkers();
}

function donors({ id }, _args, { prisma }) {
  return prisma.district.findUnique({ where: { id } }).donors();
}

module.exports = {
  coordinator,
  zone,
  villages,
  socialWorkers,
  donors
};
