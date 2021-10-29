
function zone({ id }, _args, { prisma }) {
  return prisma.district.findUnique({ where: { id } }).zone();
}

function villages({ id }, _args, { prisma }) {
  return prisma.district.findUnique({ where: { id } }).villages();
}

function socialWorkers({ id }, _args, { prisma }) {
  return prisma.district.findUnique({ where: { id } }).socialWorkers();
}


module.exports = {
  zone,
  villages,
  socialWorkers
};
