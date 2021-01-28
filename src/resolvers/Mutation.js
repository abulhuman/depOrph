async function createDonor(_parent, args, { prisma }, _info) {
  const orphansIds = [...args.orphans].map((val) => ({
    id: parseInt(val)
  }));

  const pasIds = [...args.peasantAssociations].map((val) => ({
    id: parseInt(val)
  }));

  const supPlanIds = [...args.supportPlans].map((val) => ({
    id: parseInt(val)
  }));
  return await prisma.donor.create({
    data: {
      ...args,
      orphans: {
        connect: orphansIds
      },
      peasantAssociations: {
        connect: pasIds
      },
      supportPlans: {
        connect: supPlanIds
      }
    }
  });
}
async function updateDonor(_parent, args, { prisma }, _info) {
  const orphansIds = [...args.orphans].map((val) => ({
    id: parseInt(val)
  }));

  const pasIds = [...args.peasantAssociations].map((val) => ({
    id: parseInt(val)
  }));

  const supPlanIds = [...args.supportPlans].map((val) => ({
    id: parseInt(val)
  }));
  return await prisma.donor.update({
    where: {
      id: parseInt(args.id)
    },
    data: {
      ...args,
      updated_at: new Date(),
      orphans: {
        connect: orphansIds
      },
      peasantAssociations: {
        connect: pasIds
      },
      supportPlans: {
        connect: supPlanIds
      }
    }
  });
}

async function createEducation(_parent, args, { prisma }, _info) {
  const eddRecs = [...args.educationalRecords].map((val) => ({
    id: parseInt(val)
  }));
  return await prisma.education.create({
    data: {
      ...args,
      orphan: {
        connect: {
          id: parseInt(args.orphan)
        }
      },
      educationalRecords: {
        connect: eddRecs
      }
    }
  });
}

async function updateEducation(_parent, args, { prisma }, _info) {
  const eddRecs = [...args.educationalRecords].map((val) => ({
    id: parseInt(val)
  }));
  return await prisma.education.update({
    where: { id: parseInt(args.id) },
    data: {
      ...args,
      updated_at: new Date(),
      orphan: {
        connect: {
          id: parseInt(args.orphan)
        }
      },
      educationalRecords: {
        connect: eddRecs
      }
    }
  });
}

async function createFather(_parent, args, { prisma }, _info) {
  const ids = [...args.orphans].map((val) => ({ id: parseInt(val) }));
  return await prisma.father.create({
    data: {
      ...args,
      orphans: {
        connect: ids
      }
    }
  });
}

async function updateFather(_parent, args, { prisma }, _info) {
  const ids = [...args.orphans].map((val) => ({ id: parseInt(val) }));
  return await prisma.father.update({
    where: { id: parseInt(args.id) },
    data: {
      ...args,
      updated_at: new Date(),
      orphans: {
        connect: ids
      }
    }
  });
}

async function createGuardian(_parent, args, { prisma }, _info) {
  const ids = [...args.orphans].map((val) => ({ id: parseInt(val) }));
  return await prisma.guardian.create({
    data: {
      ...args,
      orphans: {
        connect: ids
      }
    }
  });
}

async function updateGuardian(_parent, { args }, { prisma }, _info) {
  const ids = [...args.orphans].map((val) => ({ id: parseInt(val) }));
  return await prisma.guardian.update({
    where: { id: parseInt(args.id) },
    data: {
      ...args,
      updated_at: new Date(),
      orphans: {
        connect: ids
      }
    }
  });
}

async function createMother(_parent, args, { prisma }, _info) {
  const ids = [...args.orphans].map((val) => ({ id: parseInt(val) }));
  const jobIds = [...args.motherjob].map((val) => ({ id: parseInt(val) }));
  return await prisma.mother.create({
    data: {
      ...args,
      jobs: {
        connect: jobIds
      },
      orphans: {
        connect: ids
      }
    }
  });
}

async function updateMother(_parent, args, { prisma }, _info) {
  const ids = [...args.orphans].map((val) => ({ id: parseInt(val) }));
  const jobIds = [...args.jobs].map((val) => ({ id: parseInt(val) }));
  return await prisma.mother.update({
    where: { id: parseInt(args.id) },
    data: {
      ...args,
      updated_at: new Date(),
      jobs: {
        connect: jobIds
      },
      orphans: {
        connect: ids
      }
    }
  });
}

async function createMotherJob(_parent, args, { prisma }, _info) {
  return await prisma.motherJob.create({
    data: {
      ...args,
      mother: {
        connect: {
          id: parseInt(args.mother)
        }
      }
    }
  });
}

async function updateMotherJob(_parent, args, { prisma }, _info) {
  return await prisma.motherJob.create({
    data: {
      ...args,
      updated_at: new Date(),
      mother: {
        connect: {
          id: parseInt(args.mother)
        }
      }
    }
  });
}

async function createOrphan(_parent, args, { prisma }, _info) {
  const siblingIds = args.siblings
    ? [...args.siblings].map((val) => ({ id: parseInt(val) }))
    : undefined;
  const finRecIds = args.financialRecords
    ? [...args.financialRecords].map((val) => ({ id: parseInt(val) }))
    : undefined;
  const spnsrStsIds = args.sponsorshipStatuses
    ? [...args.sponsorshipStatuses].map((val) => ({ id: parseInt(val) }))
    : undefined;
  return await prisma.orphan.create({
    data: {
      ...args,
      district: { connect: { id: parseInt(args.district) } },
      photos: { connect: { id: parseInt(args.photos) } },
      donor: { connect: { id: parseInt(args.donor) } },
      education: { connect: { id: parseInt(args.education) } },
      father: { connect: { id: parseInt(args.father) } },
      guardian: { connect: { id: parseInt(args.guardian) } },
      house_property: { connect: { id: parseInt(args.house_property) } },
      mother: { connect: { id: parseInt(args.mother) } },
      peasantAssociation: {
        connect: { id: parseInt(args.peasantAssociation) }
      },
      sibling: { connect: { id: parseInt(args.sibling) } },
      socialWorker: { connect: { id: parseInt(args.socialWorker) } },
      supportPlan: { connect: { id: parseInt(args.supportPlan) } },
      financialRecords: { connect: finRecIds },
      health: { connect: { id: parseInt(args.health) } },
      siblings: { connect: siblingIds },
      sponsorshipStatuses: { connect: spnsrStsIds }
    }
  });
}

async function updateOrphan(_parent, args, { prisma }, _info) {
  const siblingIds = args.siblings
    ? [...args.siblings].map((val) => ({ id: parseInt(val) }))
    : undefined;
  const finRecIds = args.financialRecords
    ? [...args.financialRecords].map((val) => ({ id: parseInt(val) }))
    : undefined;
  const spnsrStsIds = args.sponsorshipStatuses
    ? [...args.sponsorshipStatuses].map((val) => ({ id: parseInt(val) }))
    : undefined;
  return await prisma.orphan.update({
    where: { id: parseInt(args.id) },
    data: {
      ...args,
      updated_at: new Date(),
      district: { connect: { id: parseInt(args.district) } },
      photos: { connect: { id: parseInt(args.photos) } },
      donor: { connect: { id: parseInt(args.donor) } },
      education: { connect: { id: parseInt(args.education) } },
      father: { connect: { id: parseInt(args.father) } },
      guardian: { connect: { id: parseInt(args.guardian) } },
      house_property: { connect: { id: parseInt(args.house_property) } },
      mother: { connect: { id: parseInt(args.mother) } },
      peasantAssociation: {
        connect: { id: parseInt(args.peasantAssociation) }
      },
      sibling: { connect: { id: parseInt(args.sibling) } },
      socialWorker: { connect: { id: parseInt(args.socialWorker) } },
      supportPlan: { connect: { id: parseInt(args.supportPlan) } },
      financialRecords: { connect: finRecIds },
      health: { connect: { id: parseInt(args.health) } },
      siblings: { connect: siblingIds },
      sponsorshipStatuses: { connect: spnsrStsIds }
    }
  });
}

async function createSocialWorker(_parent, args, { prisma }, _info) {
  const ids = [...args.orphans].map((val) => ({ id: parseInt(val) }));
  return await prisma.socialWorker.create({
    data: {
      ...args,
      peasantAssociation: {
        connect: { id: parseInt(args.peasantAssociation) }
      },
      orphans: { connect: ids }
    }
  });
}

async function updateSocialWorker(_parent, args, { prisma }, _info) {
  const ids = [...args.orphans].map((val) => ({ id: parseInt(val) }));
  return await prisma.socialWorker.update({
    where: { id: parseInt(args.id) },
    data: {
      ...args,
      updated_at: new Date(),
      peasantAssociation: {
        connect: { id: parseInt(args.peasantAssociation) }
      },
      orphans: { connect: ids }
    }
  });
}
// 🔛⏯▶
async function createDistrict(_parent, args, { prisma }, _info) {
  const ids = [...args.orphans].map((val) => ({ id: parseInt(val) }));
  const sponsoredgroupsIds = [...args.sponsoredgroups].map((val) => ({
    id: parseInt(val)
  }));
  return await prisma.site.create({
    data: {
      registrationDate: args.registrationDate,
      siteName: args.siteName,
      state: args.state,
      zone: args.zone,
      district: args.district,
      kebele: args.kebele,
      orphans: {
        connect: ids
      },
      sponsoredgroups: {
        connect: sponsoredgroupsIds
      }
    }
  });
}

async function updateDistrict(_parent, args, { prisma }, _info) {
  const ids = [...args.orphans].map((val) => ({ id: parseInt(val) }));
  const sponsoredgroupsIds = [...args.sponsoredgroups].map((val) => ({
    id: parseInt(val)
  }));
  return await prisma.site.create({
    data: {
      registrationDate: args.registrationDate,
      siteName: args.siteName,
      state: args.state,
      zone: args.zone,
      district: args.district,
      kebele: args.kebele,
      orphans: {
        connect: ids
      },
      sponsoredgroups: {
        connect: sponsoredgroupsIds
      }
    }
  });
}

async function createIga_property(_parent, args, { prisma }, _info) {
  return await prisma.iga_property.create({
    data: {
      ownershipStatus: args.ownershipStatus,
      otherProperty: args.otherProperty,
      orphan: {
        connect: {
          id: parseInt(args.orphan)
        }
      }
    }
  });
}
async function createSibling(_parent, args, { prisma }, _info) {
  return await prisma.sibling.create({
    data: {
      fullName: args.fullName,
      gender: args.gender,
      age: args.age,
      schoolGrade: args.schoolGrade,
      job: args.job,
      maritalStatus: args.maritalStatus,
      orphan: args.orphan
        ? {
            connect: {
              id: parseInt(args.orphan)
            }
          }
        : undefined
    }
  });
}

async function createOfficialDocuments(_parent, args, { prisma }, _info) {
  return await prisma.officialDocuments.create({
    data: {
      photoPortraitUrl: args.photoPortraitUrl,
      photoLongUrl: args.photoLongUrl,
      birthCertificateUrl: args.birthCertificateUrl,
      orphan: {
        connect: {
          id: parseInt(args.orphan)
        }
      }
    }
  });
}

async function updateOfficialDocuments(
  _parent,
  { id, photoPortraitUrl, photoLongUrl, birthCertificateUrl },
  { prisma },
  _info
) {
  return await prisma.officialDocuments.update({
    where: { id: parseInt(id) },
    data: {
      photoPortraitUrl,
      photoLongUrl,
      birthCertificateUrl,
      updated_at: new Date()
    }
  });
}

async function createSponsoredGroup(_parent, args, { prisma }, _info) {
  const orphansIds = args.orphans
    ? [...args.orphans].map((val) => ({ id: parseInt(val) }))
    : undefined;
  const socialworkersIds = args.socialworkers
    ? [...args.socialworkers].map((val) => ({ id: parseInt(val) }))
    : undefined;
  return await prisma.sponsoredGroup.create({
    data: {
      sponsorshipDate: args.sponsorshipDate,
      donor: args.donor
        ? {
            connect: {
              id: parseInt(args.donor)
            }
          }
        : undefined,
      support: args.support
        ? {
            connect: {
              id: parseInt(args.support)
            }
          }
        : undefined,
      socialworkers: {
        connect: [...socialworkersIds]
      },
      orphans: {
        connect: orphansIds
      }
    }
  });
}

async function createSupport(_parent, args, { prisma }, _info) {
  return await prisma.support.create({
    data: {
      status: args.status,
      sponsoredgroup: {
        connect: {
          id: parseInt(args.sponsoredgroup)
        }
      }
    }
  });
}

module.exports = {
  createOrphan,
  updateOrphan,
  createIga_property,
  createEducation,
  updateEducation,
  createFather,
  updateFather,
  createSibling,
  createGuardian,
  updateGuardian,
  createMotherJob,
  createMother,
  updateMother,
  createDonor,
  createSocialWorker,
  createSite,
  createOfficialDocuments,
  createSponsoredGroup,
  createSupport
};
