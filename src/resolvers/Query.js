async function orphan(_parent, args, context, _info) {
  const orphan = await context.prisma.orphan.findUnique({
    where: {
      id: Number(args.id)
    }
  });

  return orphan;
}

async function iga_property(_parent, args, context, _info) {
  const iga_property = await context.prisma.iga_property.findUnique({
    where: {
      id: Number(args.id)
    }
  });

  return iga_property;
}

async function education(_parent, args, context, _info) {
  const education = await context.prisma.education.findUnique({
    where: {
      id: Number(args.id)
    }
  });

  return education;
}

async function father(_parent, args, context, _info) {
  const father = await context.prisma.father.findUnique({
    where: {
      id: Number(args.id)
    }
  });

  return father;
}

async function sibling(_parent, args, context, _info) {
  const sibling = await context.prisma.sibling.findUnique({
    where: {
      id: Number(args.id)
    }
  });

  return sibling;
}

async function guardian(_parent, { id }, { prisma }, _info) {
  return await prisma.guardian.findUnique({ where: { id: parseInt(id) } });
}

async function motherJob(_parent, args, context, _info) {
  const motherJob = await context.prisma.motherJob.findUnique({
    where: {
      id: Number(args.id)
    }
  });

  return motherJob;
}

async function mother(_parent, args, context, _info) {
  const mother = await context.prisma.mother.findUnique({
    where: {
      id: Number(args.id)
    }
  });

  return mother;
}

async function donor(_parent, args, context, _info) {
  const donor = await context.prisma.donor.findUnique({
    where: {
      id: Number(args.id)
    }
  });

  return donor;
}

async function socialWorker(_parent, args, context, _info) {
  const socialWorker = await context.prisma.socialWorker.findUnique({
    where: {
      id: Number(args.id)
    }
  });

  return socialWorker;
}

async function site(_parent, args, context, _info) {
  const site = await context.prisma.site.findUnique({
    where: {
      id: Number(args.id)
    }
  });

  return site;
}

async function sponsoredGroup(_parent, args, context, _info) {
  const sponsoredGroup = await context.prisma.sponsoredGroup.findUnique({
    where: {
      id: Number(args.id)
    }
  });

  return sponsoredGroup;
}

async function officialDocuments(_parent, args, context, _info) {
  const docs = await context.prisma.groupOfOrphans.findUnique({
    where: {
      id: Number(args.id)
    }
  });

  return docs;
}

async function support(_parent, args, context, _info) {
  const support = await context.prisma.groupOfOrphans.findUnique({
    where: {
      id: Number(args.id)
    }
  });

  return support;
}

async function otherSupport(_parent, args, context, _info) {
  const otherSupport = await context.prisma.groupOfOrphans.findUnique({
    where: {
      id: Number(args.id)
    }
  });

  return otherSupport;
}

async function educationalSupport(_parent, args, context, _info) {
  const educationalSupport = await context.prisma.groupOfOrphans.findUnique({
    where: {
      id: Number(args.id)
    }
  });

  return educationalSupport;
}

async function financialSupport(_parent, args, context, _info) {
  const financialSupport = await context.prisma.groupOfOrphans.findUnique({
    where: {
      id: Number(args.id)
    }
  });

  return financialSupport;
}

async function allOrphans(_parent, { take, filter, orderBy }, context, _info) {
  const where = filter
    ? {
        OR: [
          { firstName: { contains: filter } },
          { fatherName: { contains: filter } },
          { grandFatherName: { contains: filter } },
          { greatGrandFatherName: { contains: filter } }
        ]
      }
    : {};
  return await context.prisma.orphan.findMany({ take, where, orderBy });
}

async function allSocialWorkers(_parent, { take }, context, _info) {
  return await context.prisma.socialWorker.findMany({ take });
}

async function allSites(_parent, { take }, context, _info) {
  return await context.prisma.site.findMany({ take });
}

module.exports = {
  orphan,
  iga_property,
  education,
  father,
  sibling,
  guardian,
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
  allOrphans,
  allSocialWorkers,
  allSites
};
