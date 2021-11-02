function supportPlan({ id }, _args, { prisma }) {
  return prisma.payment.findUnique({ where: { id } }).supportPlan();
}

module.exports = {
  supportPlan
};
