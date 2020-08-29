async function orphan(parent, args, context, info) {
  const orphan = await context.prisma.orphan.findOne({
    where: {
      id: parseInt(args.id),
    },
  });

  return orphan;
}

async function iga_property(parent, args, context, info) {
  const iga_property = await context.prisma.iga_property.findOne({
    where: {
      id: parseInt(args.id),
    },
  });

  return iga_property;
}

async function education(parent, args, context, info) {
  const education = await context.prisma.education.findOne({
    where: {
      id: parseInt(args.id),
    },
  });

  return education;
}

async function father(parent, args, context, info) {
  const father = await context.prisma.father.findOne({
    where: {
      id: parseInt(args.id),
    },
  });

  return father;
}

async function sibling(parent, args, context, info) {
  const sibling = await context.prisma.sibling.findOne({
    where: {
      id: parseInt(args.id),
    },
  });

  return sibling;
}

async function motherJob(parent, args, context, info) {
  const motherJob = await context.prisma.motherJob.findOne({
    where: {
      id: parseInt(args.id),
    },
  });

  return motherJob;
}

async function mother(parent, args, context, info) {
  const mother = await context.prisma.mother.findOne({
    where: {
      id: parseInt(args.id),
    },
  });

  return mother;
}

async function donor(parent, args, context, info) {
  const donor = await context.prisma.donor.findOne({
    where: {
      id: parseInt(args.id),
    },
  });

  return donor;
}

async function address(parent, args, context, info) {
  const address = await context.prisma.address.findOne({
    where: {
      state: args.state,
    },
  });

  return address;
}

async function site(parent, args, context, info) {
  const site = await context.prisma.site.findOne({
    where: {
      id: parseInt(args.id),
    },
  });

  return site;
}

async function socialWorker(parent, args, context, info) {
  const socialWorker = await context.prisma.socialWorker.findOne({
    where: {
      id: parseInt(args.id),
    },
  });

  return socialWorker;
}
async function groupOfOrphans(parent, args, context, info) {
  const groupOfOrphans = await context.prisma.groupOfOrphans.findOne({
    where: {
      id: parseInt(args.id),
    },
  });

  return groupOfOrphans;
}


module.exports = {
  orphan,
  iga_property,
  education,
  father,
  sibling,
  motherJob,
  mother,
  donor,
  address,
  site,
  socialWorker,
  groupOfOrphans,
};
