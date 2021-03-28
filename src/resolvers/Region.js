function zones({ id }, _args, { prisma }) {
  return prisma.region.findUnique({ where: { id } }).zones();
}

module.exports = {
  zones
};
