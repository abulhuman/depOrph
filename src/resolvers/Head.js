function user({ id }, _args, { prisma }) {
  return prisma.head.findUnique({ where: { id } }).user();
}

module.exports = {
  user
};
