function supportPlan({ id }, _args, { prisma }) {
  return prisma.payment.findUnique({ where: { id } }).supportPlan();
}

function individualPayments({ id }, _args, { prisma }) {
  return prisma.payment.findUnique({ where: { id } }).individualPayments();
}

module.exports = {
  supportPlan,
  individualPayments
};
