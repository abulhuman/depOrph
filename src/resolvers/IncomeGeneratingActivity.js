function project({ id }, _args, { prisma }) {
  return prisma.incomeGeneratingActivity
    .findUnique({ where: { id } })
    .project();
}

function photos({ id }, _args, { prisma }) {
  return prisma.incomeGeneratingActivity
    .findUnique({ where: { id } })
    .photos();
}

module.exports = {
  project,
  photos
};
