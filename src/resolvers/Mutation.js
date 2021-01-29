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

async function createDistrict(_parent, args, { prisma }, _info) {
  const ids = [...args.orphans].map((val) => ({ id: parseInt(val) }));
  const peasantAssociationsIds = [...args.peasantAssociations].map((val) => ({
    id: parseInt(val)
  }));
  return await prisma.district.create({
    data: {
      ...args,
      orphans: {
        connect: ids
      },
      peasantAssociations: {
        connect: peasantAssociationsIds
      }
    }
  });
}

async function updateDistrict(_parent, args, { prisma }, _info) {
  const ids = [...args.orphans].map((val) => ({ id: parseInt(val) }));
  const peasantAssociationsIds = [...args.peasantAssociations].map((val) => ({
    id: parseInt(val)
  }));
  return await prisma.district.update({
    where: { id: parseInt(args.id) },
    data: {
      ...args,
      updated_at: new Date(),
      orphans: {
        connect: ids
      },
      peasantAssociations: {
        connect: peasantAssociationsIds
      }
    }
  });
}

async function createEducationalRecord(_parent, args, { prisma }, _info) {
  return await prisma.educationalRecord.create({
    data: {
      ...args,
      education: { connect: { id: parseInt(args.education) } }
    }
  });
}

async function updateEducationalRecord(_parent, args, { prisma }, _info) {
  return await prisma.educationalRecord.update({
    where: { id: parseInt(id) },
    data: {
      ...args,
      updated_at: new Date(),
      education: { connect: { id: parseInt(args.education) } }
    }
  });
}

async function createFinancialRecord(_parent, args, { prisma }, _info) {
  return await prisma.financialRecord.create({
    data: {
      ...args,
      orphan: { connect: { id: parseInt(args.orphan) } }
    }
  });
}

async function updateFinancialRecord(_parent, args, { prisma }, _info) {
  return await prisma.financialRecord.update({
    data: {
      ...args,
      updated_at: new Date(),
      orphan: { connect: { id: parseInt(args.orphan) } }
    }
  });
}

async function createHealth(_parent, args, { prisma }, _info) {
  const healthRecordsIds = [...args.healthRecords].map((val) => ({
    id: parseInt(val)
  }));
  return await prisma.health.create({
    data: {
      ...args,
      orphan: { connect: { id: parseInt(args.orphan) } },
      healthRecords: { connect: healthRecordsIds }
    }
  });
}

async function updateHealth(_parent, args, { prisma }, _info) {
  const healthRecordsIds = [...args.healthRecords].map((val) => ({
    id: parseInt(val)
  }));
  return await prisma.health.update({
    data: {
      ...args,
      updated_at: new Date(),
      orphan: { connect: { id: parseInt(args.orphan) } },
      healthRecords: { connect: healthRecordsIds }
    }
  });
}

async function createHealthRecord(_parent, args, { prisma }, _info) {
  return await prisma.healthRecord.create({
    data: {
      ...args,
      health: { connect: { id: parseInt(args.health) } }
    }
  });
}

async function updateHealthRecord(_parent, args, { prisma }, _info) {
  return await prisma.healthRecord.update({
    data: {
      ...args,
      updated_at: new Date(),
      health: { connect: { id: parseInt(args.health) } }
    }
  });
}

async function createHouse_property(_parent, args, { prisma }, _info) {
  const orphansIds = [...args.orphans].map((val) => ({
    id: parseInt(val)
  }));
  return await prisma.house_property.create({
    data: {
      ...args,
      orphans: { connect: orphansIds }
    }
  });
}

async function updateHouse_property(_parent, args, { prisma }, _info) {
  const orphansIds = [...args.orphans].map((val) => ({
    id: parseInt(val)
  }));
  return await prisma.house_property.update({
    data: {
      ...args,
      updated_at: new Date(),
      orphans: { connect: orphansIds }
    }
  });
}

async function createOrphanPhotos(_parent, args, { prisma }, _info) {
  return await prisma.orphanPhotos.create({
    data: {
      ...args,
      orphan: { connect: { id: parseInt(args.orphan) } }
    }
  });
}

async function updateOrphanPhotos(_parent, args, { prisma }, _info) {
  return await prisma.orphanPhotos.update({
    data: {
      ...args,
      updated_at: new Date(),
      orphan: { connect: { id: parseInt(args.orphan) } }
    }
  });
}

async function createPeasantAssociation(_parent, args, { prisma }, _info) {
  const orphansIds = [...args.orphans].map((val) => ({
    id: parseInt(val)
  }));
  const socialWorkersIds = [...args.socialWorkers].map((val) => ({
    id: parseInt(val)
  }));
  return await prisma.peasantAssociation.create({
    data: {
      ...args,
      district: { connect: { id: parseInt(args.district) } },
      donor: { connect: { id: parseInt(args.donor) } },
      orphans: { connect: orphansIds },
      socialWorkers: { connect: socialWorkersIds }
    }
  });
}

async function updatePeasantAssociation(_parent, args, { prisma }, _info) {
  const orphansIds = [...args.orphans].map((val) => ({
    id: parseInt(val)
  }));
  const socialWorkersIds = [...args.socialWorkers].map((val) => ({
    id: parseInt(val)
  }));
  return await prisma.peasantAssociation.update({
    data: {
      ...args,
      updated_at: new Date(),
      district: { connect: { id: parseInt(args.district) } },
      donor: { connect: { id: parseInt(args.donor) } },
      orphans: { connect: orphansIds },
      socialWorkers: { connect: socialWorkersIds }
    }
  });
}

async function createSponsorshipStatus(_parent, args, { prisma }, _info) {
  return await prisma.sponsorshipStatus.create({
    data: {
      ...args,
      orphan: { connect: { id: parseInt(args.orphan) } }
    }
  });
}

async function updateSponsorshipStatus(_parent, args, { prisma }, _info) {
  return await prisma.sponsorshipStatus.update({
    data: {
      ...args,
      updated_at: new Date(),
      orphan: { connect: { id: parseInt(args.orphan) } }
    }
  });
}

async function createSupportPlan(_parent, args, { prisma }, _info) {
  const orphansIds = [...args.orphans].map((val) => ({
    id: parseInt(val)
  }));
  return await prisma.health.create({
    data: {
      ...args,
      donor: { connect: { id: parseInt(args.donor) } },
      orphans: { connect: orphansIds }
    }
  });
}

async function updateSupportPlan(_parent, args, { prisma }, _info) {
  const orphansIds = [...args.orphans].map((val) => ({
    id: parseInt(val)
  }));
  return await prisma.health.update({
    data: {
      ...args,
      updated_at: new Date(),
      donor: { connect: { id: parseInt(args.donor) } },
      orphans: { connect: orphansIds }
    }
  });
}
module.exports = {
  createDonor,
  updateDonor,
  createEducation,
  updateEducation,
  createFather,
  updateFather,
  createGuardian,
  updateGuardian,
  createMother,
  updateMother,
  createMotherJob,
  updateMotherJob,
  createOrphan,
  updateOrphan,
  createSocialWorker,
  updateSocialWorker,
  createDistrict,
  updateDistrict,
  createEducationalRecord,
  updateEducationalRecord,
  createFinancialRecord,
  updateFinancialRecord,
  createHealth,
  updateHealth,
  createHealthRecord,
  updateHealthRecord,
  createHouse_property,
  updateHouse_property,
  createOrphanPhotos,
  updateOrphanPhotos,
  createPeasantAssociation,
  updatePeasantAssociation,
  createSponsorshipStatus,
  updateSponsorshipStatus,
  createSupportPlan,
  updateSupportPlan
};
