function orphan({ id }, _args, { prisma }) {
  return prisma.sponsorshipStatus.findUnique({ where: { id } }).orphan();
}

module.exports = {
  orphan
};
