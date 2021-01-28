function orphan({ id }, _args, { prisma }) {
  return prisma.health.findUnique({ where: { id } }).orphan();
}

function healthRecords({ id }, _args, { prisma }) {
  return prisma.health.findUnique({ where: { id } }).healthRecords();
}

module.exports = {
  orphan,
  healthRecords
};
