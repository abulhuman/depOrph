async function orphan(parent, args, context, info) {
  const orphan = await context.prisma.orphan.findUnique({
    where: {
      id: Number(args.id)
    }
  });

  return orphan;
}

async function iga_property(parent, args, context, info) {
  const iga_property = await context.prisma.iga_property.findUnique({
    where: {
      id: Number(args.id)
    }
  });

  return iga_property;
}

async function education(parent, args, context, info) {
  const education = await context.prisma.education.findUnique({
    where: {
      id: Number(args.id)
    }
  });

  return education;
}

async function father(parent, args, context, info) {
  const father = await context.prisma.father.findUnique({
    where: {
      id: Number(args.id)
    }
  });

  return father;
}

async function sibling(parent, args, context, info) {
  const sibling = await context.prisma.sibling.findUnique({
    where: {
      id: Number(args.id)
    }
  });

  return sibling;
}

async function motherJob(parent, args, context, info) {
  const motherJob = await context.prisma.motherJob.findUnique({
    where: {
      id: Number(args.id)
    }
  });

  return motherJob;
}

async function mother(parent, args, context, info) {
  const mother = await context.prisma.mother.findUnique({
    where: {
      id: Number(args.id)
    }
  });

  return mother;
}

async function donor(parent, args, context, info) {
  const donor = await context.prisma.donor.findUnique({
    where: {
      id: Number(args.id)
    }
  });

  return donor;
}

async function socialWorker(parent, args, context, info) {
  const socialWorker = await context.prisma.socialWorker.findUnique({
    where: {
      id: Number(args.id)
    }
  });

  return socialWorker;
}

async function site(parent, args, context, info) {
  const site = await context.prisma.site.findUnique({
    where: {
      id: Number(args.id)
    }
  });

  return site;
}

async function sponsoredGroup(parent, args, context, info) {
  const sponsoredGroup = await context.prisma.sponsoredGroup.findUnique({
    where: {
      id: Number(args.id)
    }
  });

  return sponsoredGroup;
}

async function officialDocuments(parent, args, context, info) {
  const docs = await context.prisma.groupOfOrphans.findUnique({
    where: {
      id: Number(args.id)
    }
  });

  return docs;
}

async function support(parent, args, context, info) {
  const support = await context.prisma.groupOfOrphans.findUnique({
    where: {
      id: Number(args.id)
    }
  });

  return support;
}

async function otherSupport(parent, args, context, info) {
  const otherSupport = await context.prisma.groupOfOrphans.findUnique({
    where: {
      id: Number(args.id)
    }
  });

  return otherSupport;
}

async function educationalSupport(parent, args, context, info) {
  const educationalSupport = await context.prisma.groupOfOrphans.findUnique({
    where: {
      id: Number(args.id)
    }
  });

  return educationalSupport;
}

async function financialSupport(parent, args, context, info) {
  const financialSupport = await context.prisma.groupOfOrphans.findUnique({
    where: {
      id: Number(args.id)
    }
  });

  return financialSupport;
}

async function allOrphans(parent, { skip, take }, context, info) {
  return await context.prisma.orphan.findMany({ skip, take });
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
  socialWorker,
  site,
  sponsoredGroup,
  officialDocuments,
  support,
  otherSupport,
  educationalSupport,
  financialSupport,
  allOrphans
};
