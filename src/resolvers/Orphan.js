function donor({ id }, _args, { prisma }) {
  return prisma.orphan.findUnique({ where: { id } }).donor();
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

function house_property({ id }, _args, { prisma }) {
  return prisma.orphan.findUnique({ where: { id } }).house_property();
}

function mother({ id }, _args, { prisma }) {
  return prisma.orphan.findUnique({ where: { id } }).mother();
}

function village({ id }, _args, { prisma }) {
  return prisma.orphan.findUnique({ where: { id } }).village();
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

function healthRecords({ id }, _args, { prisma }) {
  return prisma.orphan.findUnique({ where: { id } }).healthRecords();
}

function photos({ id }, _args, { prisma }) {
  return prisma.orphan.findUnique({ where: { id } }).photos();
}

function sponsorshipStatuses({ id }, _args, { prisma }) {
  return prisma.orphan.findUnique({ where: { id } }).sponsorshipStatuses();
}

function siblings({ id }, _args, { prisma }) {
  return prisma.orphan.findUnique({ where: { id } }).siblings();
}

function siblingOf({ id }, _args, { prisma }) {
  return prisma.orphan.findUnique({ where: { id } }).siblingOf();
}

module.exports = {
  house_property,
  photos,
  education,
  father,
  guardian,
  mother,
  village,
  donor,
  socialWorker,
  supportPlan,
  financialRecords,
  healthRecords,
  sponsorshipStatuses,
  siblings,
  siblingOf
};
