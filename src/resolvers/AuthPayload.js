function user({ id }, _args, { prisma }) {
  return prisma.user.findUnique({ where: { id } });
}

