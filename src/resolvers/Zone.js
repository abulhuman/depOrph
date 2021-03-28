function region({ id }, _args, { prisma }) {
  return prisma.zone.findUnique({ where: { id } }).region();
}

function districts({ id }, _args, { prisma }) {
  return prisma.zone.findUnique({ where: { id } }).districts();
}

module.exports = {
  region,
  districts
};
