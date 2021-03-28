function educationalRecords({ id }, _args, { prisma }) {
  return prisma.education.findUnique({ where: { id } }).educationalRecords();
}

function orphan({ id }, _args, { prisma }) {
  return prisma.education.findUnique({ where: { id } }).orphan();
}

module.exports = {
  educationalRecords,
  orphan
};
