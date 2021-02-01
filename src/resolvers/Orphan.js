function house_property({ id }, _args, { prisma }) {
  return prisma.orphan.findUnique({ where: { id } }).house_property();
}

function photos({ id }, _args, { prisma }) {
  return prisma.orphan.findUnique({ where: { id } }).photos();
}

function education({ id }, _args, { prisma }) {
  return prisma.orphan.findUnique({ where: { id } }).education();
}

function father({ id }, _args, { prisma }) {
  return prisma.orphan.findUnique({ where: { id } }).father();
}

function guardian({ id }, _args, { prisma }) {
  return prisma.orphan.findUnique({ where: { id } }).guardian();
}

function mother({ id }, _args, { prisma }) {
  return prisma.orphan.findUnique({ where: { id } }).mother();
}

function district({ id }, _args, { prisma }) {
  return prisma.orphan.findUnique({ where: { id } }).district();
}

function peasantAssociation({ id }, _args, { prisma }) {
  return prisma.orphan.findUnique({ where: { id } }).peasantAssociation();
}

function sibling({ id }, _args, { prisma }) {
  return prisma.orphan.findUnique({ where: { id } }).sibling();
}

function siblings({ id }, _args, { prisma }) {
  return prisma.orphan.findUnique({ where: { id } }).siblings();
}

function donor({ id }, _args, { prisma }) {
  return prisma.orphan.findUnique({ where: { id } }).donor();
}

function socialWorker({ id }, _args, { prisma }) {
  return prisma.orphan.findUnique({ where: { id } }).socialWorker();
}

function supportPlan({ id }, _args, { prisma }) {
  return prisma.orphan.findUnique({ where: { id } }).supportPlan();
}

function financialRecords({ id }, _args, { prisma }) {
  return prisma.orphan.findUnique({ where: { id } }).financialRecords();
}

function health({ id }, _args, { prisma }) {
  return prisma.orphan.findUnique({ where: { id } }).health();
}

function sponsorshipStatuses({ id }, _args, { prisma }) {
  return prisma.orphan.findUnique({ where: { id } }).sponsorshipStatuses();
}

module.exports = {
  house_property,
  photos,
  education,
  father,
  guardian,
  mother,
  district,
  peasantAssociation,
  sibling,
  donor,
  socialWorker,
  supportPlan,
  financialRecords,
  health,
  sponsorshipStatuses,
  siblings
};
