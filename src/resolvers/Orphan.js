
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

function coordinator({ id }, _args, { prisma }) {
  return prisma.orphan.findUnique({ where: { id } }).coordinator();
}

function supportPlans({ id }, _args, { prisma }) {
  return prisma.orphan.findUnique({ where: { id } }).supportPlans();
}

function financialRecords({ id }, _args, { prisma }) {
  return prisma.orphan.findUnique({ where: { id } }).financialRecords();
}

function documents({ id }, _args, { prisma }) {
  return prisma.orphan.findUnique({ where: { id } }).documents();
}

function healthStatuses({ id }, _args, { prisma }) {
  return prisma.orphan.findUnique({ where: { id } }).healthStatuses();
}

function photos({ id }, _args, { prisma }) {
  return prisma.orphan.findUnique({ where: { id } }).photos();
}

function sponsorshipStatuses({ id }, _args, { prisma }) {
  return prisma.orphan.findUnique({ where: { id } }).sponsorshipStatuses();
}

function donors({ id }, _args, { prisma }) {
  return prisma.orphan.findUnique({ where: { id } }).donors();
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
  father,
  guardian,
  mother,
  village,
  socialWorker,
  coordinator,
  supportPlans,
  financialRecords,
  documents,
  healthStatuses,
  sponsorshipStatuses,
  donors,
  siblings,
  siblingOf
};
