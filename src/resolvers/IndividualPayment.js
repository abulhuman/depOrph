function orphan({ id }, _args, { prisma }) {
  return prisma.individualPayment.findUnique({ where: { id } }).orphan();
}

function payment({ id }, _args, { prisma }) {
  return prisma.individualPayment.findUnique({ where: { id } }).payment();
}

module.exports = {
  orphan,
  payment
};
