/*✅*/ async function createDonor(_parent, args, { prisma }, _info) {
  const orphansIds = args.orphans
    ? [...args.orphans].map((val) => ({
        id: parseInt(val)
      }))
    : [];

  const pasIds = args.peasantAssociations
    ? [...args.peasantAssociations].map((val) => ({
        id: parseInt(val)
      }))
    : [];

  const supPlanIds = args.supportPlans
    ? [...args.supportPlans].map((val) => ({
        id: parseInt(val)
      }))
    : [];

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

/*✅*/ async function updateDonor(_parent, args, { prisma }, _info) {
  const orphansIds = args.orphans
    ? [...args.orphans].map((val) => ({
        id: parseInt(val)
      }))
    : [];

  const pasIds = args.peasantAssociations
    ? [...args.peasantAssociations].map((val) => ({
        id: parseInt(val)
      }))
    : [];

  const supPlanIds = args.supportPlans
    ? [...args.supportPlans].map((val) => ({
        id: parseInt(val)
      }))
    : [];

  const id = parseInt(args.id);
  delete args.id;
  return await prisma.donor.update({
    where: { id },
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

/*✅*/ async function createEducation(_parent, args, { prisma }, _info) {
  const eddRecs = args.educationalRecords
    ? [...args.educationalRecords].map((val) => ({
        id: parseInt(val)
      }))
    : [];
  const orphansIds = args.orphan
    ? [...args.orphan].map((val) => ({
        id: parseInt(val)
      }))
    : [];
  return await prisma.education.create({
    data: {
      ...args,
      orphan: { connect: orphansIds[0] },
      educationalRecords: {
        connect: eddRecs
      }
    }
  });
}

/*✅*/ async function updateEducation(_parent, args, { prisma }, _info) {
  const eddRecs = args.educationalRecords
    ? [...args.educationalRecords].map((val) => ({
        id: parseInt(val)
      }))
    : [];
  const orphansIds = args.orphan
    ? [...args.orphan].map((val) => ({
        id: parseInt(val)
      }))
    : [];
  const id = parseInt(args.id);
  delete args.id;
  return await prisma.education.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      orphan: { connect: orphansIds[0] },
      educationalRecords: {
        connect: eddRecs
      }
    }
  });
}

/*✅*/ async function createFather(_parent, args, { prisma }, _info) {
  const orphansIds = args.orphans
    ? [...args.orphans].map((val) => ({ id: parseInt(val) }))
    : [];
  return await prisma.father.create({
    data: {
      ...args,
      orphans: {
        connect: orphansIds
      }
    }
  });
}

/*✅*/ async function updateFather(_parent, args, { prisma }, _info) {
  const orphansIds = args.orphans
    ? [...args.orphans].map((val) => ({ id: parseInt(val) }))
    : [];
  const id = parseInt(args.id);
  delete args.id;
  return await prisma.father.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      orphans: {
        connect: orphansIds
      }
    }
  });
}

/*✅*/ async function createGuardian(_parent, args, { prisma }, _info) {
  const orphansIds = args.orphans
    ? [...args.orphans].map((val) => ({ id: parseInt(val) }))
    : [];
  return await prisma.guardian.create({
    data: {
      ...args,
      orphans: {
        connect: orphansIds
      }
    }
  });
}

/*✅*/ async function updateGuardian(_parent, args, { prisma }, _info) {
  const orphansIds = args.orphans
    ? [...args.orphans].map((val) => ({ id: parseInt(val) }))
    : [];
  const id = parseInt(args.id);
  delete args.id;
  return await prisma.guardian.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      orphans: {
        connect: orphansIds
      }
    }
  });
}

/*✅*/ async function createMother(_parent, args, { prisma }, _info) {
  const orphansIds = args.orphans
    ? [...args.orphans].map((val) => ({ id: parseInt(val) }))
    : [];
  const jobIds = args.motherjob
    ? [...args.motherjob].map((val) => ({ id: parseInt(val) }))
    : [];
  return await prisma.mother.create({
    data: {
      ...args,
      jobs: {
        connect: jobIds
      },
      orphans: {
        connect: orphansIds
      }
    }
  });
}

/*✅*/ async function updateMother(_parent, args, { prisma }, _info) {
  const orphansIds = args.orphans
    ? [...args.orphans].map((val) => ({ id: parseInt(val) }))
    : [];
  const jobIds = args.jobs
    ? [...args.jobs].map((val) => ({ id: parseInt(val) }))
    : [];
  const id = parseInt(args.id);
  delete args.id;
  return await prisma.mother.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      jobs: {
        connect: jobIds
      },
      orphans: {
        connect: orphansIds
      }
    }
  });
}

/*✅*/ async function createMotherJob(_parent, args, { prisma }, _info) {
  return await prisma.motherJob.create({
    data: {
      ...args,
      motherId: args.motherId ? parseInt(args.motherId) : null
    }
  });
}

/*✅*/ async function updateMotherJob(_parent, args, { prisma }, _info) {
  const id = parseInt(args.id);
  delete args.id;
  return await prisma.motherJob.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      motherId: args.motherId ? parseInt(args.motherId) : null
    }
  });
}

/*✅*/ async function createOrphan(_parent, args, { prisma }, _info) {
  const siblingIds = args.siblings
    ? [...args.siblings].map((val) => ({ id: parseInt(val) }))
    : [];
  const finRecIds = args.financialRecords
    ? [...args.financialRecords].map((val) => ({
        id: parseInt(val)
      }))
    : [];
  const spnsrStsIds = args.sponsorshipStatuses
    ? [...args.sponsorshipStatuses].map((val) => ({
        id: parseInt(val)
      }))
    : [];

  const healthIds = args.health
    ? [...args.health].map((val) => ({ id: parseInt(val) }))
    : [];
  return await prisma.orphan.create({
    data: {
      ...args,
      districtId: args.districtId ? parseInt(args.districtId) : null,
      photosId: args.photosId ? parseInt(args.photosId) : null,
      donorId: args.donorId ? parseInt(args.donorId) : null,
      educationId: args.educationId ? parseInt(args.educationId) : null,
      fatherId: args.fatherId ? parseInt(args.fatherId) : null,
      guardianId: args.guardianId ? parseInt(args.guardianId) : null,
      house_propertyId: args.house_propertyId
        ? parseInt(args.house_propertyId)
        : null,
      motherId: args.motherId ? parseInt(args.motherId) : null,
      peasantAssociationId: args.peasantAssociationId
        ? parseInt(args.peasantAssociationId)
        : null,
      siblingId: args.siblingId ? parseInt(args.siblingId) : null,
      socialWorkerId: args.socialWorkerId
        ? parseInt(args.socialWorkerId)
        : null,
      // connect one-to-many relations as many-to-one
      supportPlanId: args.supportPlanId ? parseInt(args.supportPlanId) : null,
      // connect one-to-many relations as one-to-one
      health: { connect: healthIds[0] },
      // connect one-to-many relations as one-to-many
      financialRecords: { connect: finRecIds },
      siblings: { connect: siblingIds },
      sponsorshipStatuses: { connect: spnsrStsIds }
    }
  });
}

/*✅*/ async function updateOrphan(_parent, args, { prisma }, _info) {
  const siblingIds = args.siblings
    ? [...args.siblings].map((val) => ({ id: parseInt(val) }))
    : [];
  const finRecIds = args.financialRecords
    ? [...args.financialRecords].map((val) => ({
        id: parseInt(val)
      }))
    : [];
  const spnsrStsIds = args.sponsorshipStatuses
    ? [...args.sponsorshipStatuses].map((val) => ({
        id: parseInt(val)
      }))
    : [];

  const healthIds = args.health
    ? [...args.health].map((val) => ({ id: parseInt(val) }))
    : [];

  const id = parseInt(args.id);
  delete args.id;
  return await prisma.orphan.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      districtId: args.districtId ? parseInt(args.districtId) : null,
      photosId: args.photosId ? parseInt(args.photosId) : null,
      donorId: args.donorId ? parseInt(args.donorId) : null,
      educationId: args.educationId ? parseInt(args.educationId) : null,
      fatherId: args.fatherId ? parseInt(args.fatherId) : null,
      guardianId: args.guardianId ? parseInt(args.guardianId) : null,
      house_propertyId: args.house_propertyId
        ? parseInt(args.house_propertyId)
        : null,
      motherId: args.motherId ? parseInt(args.motherId) : null,
      peasantAssociationId: args.peasantAssociationId
        ? parseInt(args.peasantAssociationId)
        : null,
      siblingId: args.siblingId ? parseInt(args.siblingId) : null,
      socialWorkerId: args.socialWorkerId
        ? parseInt(args.socialWorkerId)
        : null,
      // connect one-to-many relations as many-to-one
      supportPlanId: args.supportPlanId ? parseInt(args.supportPlanId) : null,
      // connect one-to-many relations as one-to-one
      health: { connect: healthIds[0] },
      // connect one-to-many relations as one-to-many
      financialRecords: { connect: finRecIds },
      siblings: { connect: siblingIds },
      sponsorshipStatuses: { connect: spnsrStsIds }
    }
  });
}

/*✅*/ async function createSocialWorker(_parent, args, { prisma }, _info) {
  const orphansIds = args.orphans
    ? [...args.orphans].map((val) => ({ id: parseInt(val) }))
    : [];
  return await prisma.socialWorker.create({
    data: {
      ...args,
      peasantAssociationId: args.peasantAssociationId
        ? parseInt(args.peasantAssociationId)
        : null,
      orphans: { connect: orphansIds }
    }
  });
}

/*✅*/ async function updateSocialWorker(_parent, args, { prisma }, _info) {
  const orphansIds = args.orphans
    ? [...args.orphans].map((val) => ({ id: parseInt(val) }))
    : [];
  const id = parseInt(args.id);
  delete args.id;
  return await prisma.socialWorker.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      peasantAssociationId: args.peasantAssociationId
        ? parseInt(args.peasantAssociationId)
        : null,
      orphans: { connect: orphansIds }
    }
  });
}

/*✅*/ async function createDistrict(_parent, args, { prisma }, _info) {
  const orphansIds = args.orphans
    ? [...args.orphans].map((val) => ({ id: parseInt(val) }))
    : [];
  const peasantAssociationsIds = [...args.peasantAssociations].map((val) => ({
    id: parseInt(val)
  }));
  return await prisma.district.create({
    data: {
      ...args,
      orphans: {
        connect: orphansIds
      },
      peasantAssociations: {
        connect: peasantAssociationsIds
      }
    }
  });
}

/*✅*/ async function updateDistrict(_parent, args, { prisma }, _info) {
  const orphansIds = args.orphans
    ? [...args.orphans].map((val) => ({ id: parseInt(val) }))
    : [];
  const peasantAssociationsIds = args.peasantAssociations
    ? [...args.peasantAssociations].map((val) => ({
        id: parseInt(val)
      }))
    : [];
  const id = parseInt(args.id);
  delete args.id;
  return await prisma.district.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      orphans: {
        connect: orphansIds
      },
      peasantAssociations: {
        connect: peasantAssociationsIds
      }
    }
  });
}

/*✅*/ async function createEducationalRecord(
  _parent,
  args,
  { prisma },
  _info
) {
  return await prisma.educationalRecord.create({
    data: {
      ...args,
      educationId: args.educationId ? parseInt(args.educationId) : null
    }
  });
}

/*✅*/ async function updateEducationalRecord(
  _parent,
  args,
  { prisma },
  _info
) {
  const id = parseInt(args.id);
  delete args.id;
  return await prisma.educationalRecord.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      educationId: args.educationId ? parseInt(args.educationId) : null
    }
  });
}

/*✅*/ async function createFinancialRecord(_parent, args, { prisma }, _info) {
  return await prisma.financialRecord.create({
    data: {
      ...args,
      orphanId: args.orphanId ? parseInt(args.orphanId) : null
    }
  });
}

/*✅*/ async function updateFinancialRecord(_parent, args, { prisma }, _info) {
  const id = parseInt(args.id);
  delete args.id;
  return await prisma.financialRecord.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      orphanId: args.orphanId ? parseInt(args.orphanId) : null
    }
  });
}

/*✅*/ async function createHealth(_parent, args, { prisma }, _info) {
  const healthRecordsIds = args.healthRecords
    ? [...args.healthRecords].map((val) => ({
        id: parseInt(val)
      }))
    : [];
  return await prisma.health.create({
    data: {
      ...args,
      orphanId: args.orphanId ? parseInt(args.orphanId) : null,
      healthRecords: { connect: healthRecordsIds }
    }
  });
}

/*✅*/ async function updateHealth(_parent, args, { prisma }, _info) {
  const healthRecordsIds = [...args.healthRecords].map((val) => ({
    id: parseInt(val)
  }));
  const id = parseInt(args.id);
  delete args.id;
  return await prisma.health.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      orphanId: args.orphanId ? parseInt(args.orphanId) : null,
      healthRecords: { connect: healthRecordsIds }
    }
  });
}

/*✅*/ async function createHealthRecord(_parent, args, { prisma }, _info) {
  return await prisma.healthRecord.create({
    data: {
      ...args,
      healthId: args.healthId ? parseInt(args.healthId) : null
    }
  });
}

/*✅*/ async function updateHealthRecord(_parent, args, { prisma }, _info) {
  const id = parseInt(args.id);
  delete args.id;
  return await prisma.healthRecord.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      healthId: args.healthId ? parseInt(args.healthId) : null
    }
  });
}

/*✅*/ async function createHouse_property(_parent, args, { prisma }, _info) {
  const orphansIds = args.orphans
    ? [...args.orphans].map((val) => ({ id: parseInt(val) }))
    : [];
  return await prisma.house_property.create({
    data: {
      ...args,
      orphans: { connect: orphansIds }
    }
  });
}

/*✅*/ async function updateHouse_property(_parent, args, { prisma }, _info) {
  const orphansIds = args.orphans
    ? [...args.orphans].map((val) => ({ id: parseInt(val) }))
    : [];
  const id = parseInt(args.id);
  delete args.id;
  return await prisma.house_property.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      orphans: { connect: orphansIds }
    }
  });
}

/*❌*/ async function createOrphanPhotos(_parent, args, { prisma }, _info) {
  return await prisma.orphanPhotos.create({
    data: {
      ...args,
      orphanId: args.orphanId ? parseInt(args.orphanId) : null
    }
  });
}

/*❌*/ async function updateOrphanPhotos(_parent, args, { prisma }, _info) {
  const id = parseInt(args.id);
  delete args.id;
  return await prisma.orphanPhotos.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      orphanId: args.orphanId ? parseInt(args.orphanId) : null
    }
  });
}

/*✅*/ async function createPeasantAssociation(_parent, args, { prisma }, _info) {
  const orphansIds = args.orphans
    ? [...args.orphans].map((val) => ({
        id: parseInt(val)
      }))
    : [];
  const socialWorkersIds = args.socialWorkers
    ? [...args.socialWorkers].map((val) => ({
        id: parseInt(val)
      }))
    : [];
  return await prisma.peasantAssociation.create({
    data: {
      ...args,
      districtId: args.districtId ? parseInt(args.districtId) : null,
      donorId: args.donorId ? parseInt(args.donorId) : null,
      orphans: { connect: orphansIds },
      socialWorkers: { connect: socialWorkersIds }
    }
  });
}

/*✅*/ async function updatePeasantAssociation(_parent, args, { prisma }, _info) {
  const orphansIds = args.orphans
    ? [...args.orphans].map((val) => ({
        id: parseInt(val)
      }))
    : [];
  const socialWorkersIds = args.socialWorkers
    ? [...args.socialWorkers].map((val) => ({
        id: parseInt(val)
      }))
    : [];
  const id = parseInt(args.id);
  delete args.id;
  return await prisma.peasantAssociation.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      districtId: args.districtId ? parseInt(args.districtId) : null,
      donorId: args.donorId ? parseInt(args.donorId) : null,
      orphans: { connect: orphansIds },
      socialWorkers: { connect: socialWorkersIds }
    }
  });
}

/*✅*/ async function createSponsorshipStatus(_parent, args, { prisma }, _info) {
  return await prisma.sponsorshipStatus.create({
    data: {
      ...args,
      orphanId: args.orphanId ? parseInt(args.orphanId) : null
    }
  });
}

/*✅*/ async function updateSponsorshipStatus(_parent, args, { prisma }, _info) {
  const id = parseInt(args.id);
  delete args.id;
  return await prisma.sponsorshipStatus.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      orphanId: args.orphanId ? parseInt(args.orphanId) : null
    }
  });
}

/*✅*/ async function createSupportPlan(_parent, args, { prisma }, _info) {
  const orphansIds = args.orphans
    ? [...args.orphans].map((val) => ({ id: parseInt(val) }))
    : [];
  return await prisma.supportPlan.create({
    data: {
      ...args,
      donorId: args.donorId ? parseInt(args.donorId) : null,
      orphans: { connect: orphansIds }
    }
  });
}

/*✅*/ async function updateSupportPlan(_parent, args, { prisma }, _info) {
  const orphansIds = args.orphans
    ? [...args.orphans].map((val) => ({ id: parseInt(val) }))
    : [];
  const id = parseInt(args.id);
  delete args.id;
  return await prisma.supportPlan.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      donorId: args.donorId ? parseInt(args.donorId) : null,
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
