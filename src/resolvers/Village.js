function socialWorker({ id }, _args, { prisma }) {
  return prisma.village.findUnique({ where: { id } }).socialWorker();
}

function district({ id }, _args, { prisma }) {
  return prisma.village.findUnique({ where: { id } }).district();
}


function orphans({ id }, _args, { prisma }) {
  return prisma.village.findUnique({ where: { id } }).orphans();
}


function projects({ id }, _args, { prisma }) {
  return prisma.village.findUnique({ where: { id } }).projects();
}

module.exports = {
  socialWorker,
  district,
  orphans,
  projects
};
