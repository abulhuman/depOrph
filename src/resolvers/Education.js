function orphan({ id }, _args, { prisma }) {
  return prisma.education.findUnique({ where: { id } }).orphan();
}

function educationalRecords({ id }, _args, { prisma }) {
  return prisma.education.findUnique({ where: { id } }).educationalRecords();
}

module.exports = {
  orphan,
  educationalRecords
};
