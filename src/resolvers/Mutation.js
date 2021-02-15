async function createDonor(_parent, args, { prisma }, _info) {
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

async function updateDonor(_parent, args, { prisma }, _info) {
  const id = parseInt(args.id);
  delete args.id;
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

async function createEducation(_parent, args, { prisma }, _info) {
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

async function updateEducation(_parent, args, { prisma }, _info) {
  const id = parseInt(args.id);
  delete args.id;
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

async function createFather(_parent, args, { prisma }, _info) {
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

async function updateFather(_parent, args, { prisma }, _info) {
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

async function createGuardian(_parent, args, { prisma }, _info) {
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

async function updateGuardian(_parent, args, { prisma }, _info) {
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

async function createMother(_parent, args, { prisma }, _info) {
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

async function updateMother(_parent, args, { prisma }, _info) {
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

async function createMotherJob(_parent, args, { prisma }, _info) {
  return await prisma.motherJob.create({
    data: {
      ...args,
      motherId: args.motherId ? parseInt(args.motherId) : null
    }
  });
}

async function updateMotherJob(_parent, args, { prisma }, _info) {
  const id = parseInt(args.id);
  delete args.id;
  const prevMother = await prisma.motherJob
    .findUnique({ where: { id } })
    .mother();
  const prevMotherId = prevMother ? prevMother.id : null;
  return await prisma.motherJob.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      motherId: args.motherId ? parseInt(args.motherId) : prevMotherId
    }
  });
}

async function createOrphan(_parent, args, { prisma }, _info) {
  const photosIds = args.photos
    ? [...args.photos].map((val) => ({ id: parseInt(val) }))
    : [];
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

  const healthRecordsIds = args.healthRecords
    ? [...args.healthRecords].map((val) => ({
        id: parseInt(val)
      }))
    : [];
  return await prisma.orphan.create({
    data: {
      ...args,
      districtId: args.districtId ? parseInt(args.districtId) : null,
      donorId: args.donorId ? parseInt(args.donorId) : null,
      fatherId: args.fatherId ? parseInt(args.fatherId) : null,
      guardianId: args.guardianId ? parseInt(args.guardianId) : null,
      house_propertyId: args.house_propertyId
        ? parseInt(args.house_propertyId)
        : null,
      motherId: args.motherId ? parseInt(args.motherId) : null,
      peasantAssociationId: args.peasantAssociationId
        ? parseInt(args.peasantAssociationId)
        : null,
      socialWorkerId: args.socialWorkerId
        ? parseInt(args.socialWorkerId)
        : null,
      supportPlanId: args.supportPlanId ? parseInt(args.supportPlanId) : null,
      educationId: args.educationId ? parseInt(args.educationId) : null,
      photos: { connect: { photosIds } },
      financialRecords: { connect: finRecIds },
      healthRecords: { connect: healthRecordsIds },
      siblings: { connect: siblingIds },
      sponsorshipStatuses: { connect: spnsrStsIds }
    }
  });
}

async function updateOrphan(_parent, args, { prisma }, _info) {
  const id = parseInt(args.id);
  delete args.id;

  const prevDistrict = await prisma.orphan
    .findUnique({ where: { id } })
    .district();
  const prevDistrictId = prevDistrict ? prevDistrict.id : null;

  const prevDonor = await prisma.orphan
    .findUnique({ where: { id } })
    .donor();
  const prevDonorId = prevDonor ? prevDonor.id : null;

  const prevGuardain = await prisma.orphan
    .findUnique({ where: { id } })
    .guardian();
  const prevGuardainId = prevGuardain ? prevGuardain.id : null;

  const prevHouse_property = await prisma.orphan
    .findUnique({ where: { id } })
    .house_property();
  const prevHouse_propertyId = prevHouse_property
    ? prevHouse_property.id
    : null;

  const prevFather = await prisma.orphan
    .findUnique({ where: { id } })
    .mother();
  const prevFatherId = prevFather ? prevFather.id : null;

  const prevMother = await prisma.orphan
    .findUnique({ where: { id } })
    .mother();
  const prevMotherId = prevMother ? prevMother.id : null;

  const prevPeasantAssociation = await prisma.orphan
    .findUnique({ where: { id } })
    .peasantAssociation();
  const prevPeasantAssociationId = prevPeasantAssociation
    ? prevPeasantAssociation.id
    : null;

  const prevSocialWorker = await prisma.orphan
    .findUnique({ where: { id } })
    .socialWorker();
  const prevSocialWorkerId = prevSocialWorker ? prevSocialWorker.id : null;

  const prevEducation = await prisma.orphan
    .findUnique({ where: { id } })
    .education();
  const prevEducationId = prevEducation ? prevEducation.id : null;

  const prevSupportPlan = await prisma.orphan
    .findUnique({ where: { id } })
    .supportPlan();
  const prevSupportPlanId = prevSupportPlan ? prevSupportPlan.id : null;
  const photosIds = args.photos
    ? [...args.photos].map((val) => ({ id: parseInt(val) }))
    : [];
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

  const healthRecordsIds = args.healthRecords
    ? [...args.healthRecords].map((val) => ({
        id: parseInt(val)
      }))
    : [];
  return await prisma.orphan.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      districtId: args.districtId ? parseInt(args.districtId) : prevDistrictId,
      donorId: args.donorId ? parseInt(args.donorId) : prevDonorId,
      fatherId: args.fatherId ? parseInt(args.fatherId) : prevFatherId,
      guardianId: args.guardianId ? parseInt(args.guardianId) : prevGuardainId,
      house_propertyId: args.house_propertyId
        ? parseInt(args.house_propertyId)
        : prevHouse_propertyId,
      motherId: args.motherId ? parseInt(args.motherId) : prevMotherId,
      peasantAssociationId: args.peasantAssociationId
        ? parseInt(args.peasantAssociationId)
        : prevPeasantAssociationId,
      socialWorkerId: args.socialWorkerId
        ? parseInt(args.socialWorkerId)
        : prevSocialWorkerId,
      supportPlanId: args.supportPlanId
        ? parseInt(args.supportPlanId)
        : prevSupportPlanId,
      educationId: args.educationId
        ? parseInt(args.educationId)
        : prevEducationId,
      photos: { connect: photosIds },
      financialRecords: { connect: finRecIds },
      healthRecords: { connect: healthRecordsIds },
      // siblings: { connect: siblingIds },
      sponsorshipStatuses: { connect: spnsrStsIds }
    }
  });
}

async function createSocialWorker(_parent, args, { prisma }, _info) {
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

async function updateSocialWorker(_parent, args, { prisma }, _info) {
  const id = parseInt(args.id);
  delete args.id;
  const prevPeasantAssociation = await prisma.socialWorker
    .findUnique({ where: { id } })
    .peasantAssociation();
  const prevPeasantAssociationId = prevPeasantAssociation
    ? prevPeasantAssociation.id
    : null;
  const orphansIds = args.orphans
    ? [...args.orphans].map((val) => ({ id: parseInt(val) }))
    : [];
  return await prisma.socialWorker.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      peasantAssociationId: args.peasantAssociationId
        ? parseInt(args.peasantAssociationId)
        : prevPeasantAssociationId,
      orphans: { connect: orphansIds }
    }
  });
}

async function createDistrict(_parent, args, { prisma }, _info) {
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

async function updateDistrict(_parent, args, { prisma }, _info) {
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

async function createEducationalRecord(_parent, args, { prisma }, _info) {
  return await prisma.educationalRecord.create({
    data: {
      ...args,
      educationId: args.educationId ? parseInt(args.educationId) : null
    }
  });
}

async function updateEducationalRecord(_parent, args, { prisma }, _info) {
  const id = parseInt(args.id);
  delete args.id;
  const prevEducation = await prisma.educationalRecord
    .findUnique({ where: { id } })
    .education();
  const prevEducationId = prevEducation ? prevEducation.id : null;
  return await prisma.educationalRecord.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      educationId: args.educationId
        ? parseInt(args.educationId)
        : prevEducationId
    }
  });
}

async function createFinancialRecord(_parent, args, { prisma }, _info) {
  return await prisma.financialRecord.create({
    data: {
      ...args,
      orphanId: args.orphanId ? parseInt(args.orphanId) : null
    }
  });
}

async function updateFinancialRecord(_parent, args, { prisma }, _info) {
  const id = parseInt(args.id);
  delete args.id;
  const prevFinancialRecord = await prisma.financialRecord
    .findUnique({ where: { id } })
    .financialRecord();
  const prevFinancialRecordId = prevFinancialRecord
    ? prevFinancialRecord.id
    : null;
  return await prisma.financialRecord.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      orphanId: args.orphanId ? parseInt(args.orphanId) : prevFinancialRecordId
    }
  });
}

async function createHealthRecord(_parent, args, { prisma }, _info) {
  return await prisma.healthRecord.create({
    data: {
      ...args,
      orphanId: args.orphanId ? parseInt(args.orphanId) : null
    }
  });
}

async function updateHealthRecord(_parent, args, { prisma }, _info) {
  const id = parseInt(args.id);
  delete args.id;
  const prevOrphan = await prisma.healthRecord
    .findUnique({ where: { id } })
    .orphan();
  const prevOrphanId = prevOrphan ? prevOrphan.id : null;
  return await prisma.healthRecord.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      orphanId: args.orphanId ? parseInt(args.orphanId) : prevOrphanId
    }
  });
}

async function createHouse_property(_parent, args, { prisma }, _info) {
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

async function updateHouse_property(_parent, args, { prisma }, _info) {
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

async function createOrphanPhotos(_parent, args, { prisma }, _info) {
  return await prisma.orphanPhotos.create({
    data: {
      ...args,
      orphanId: args.orphanId ? parseInt(args.orphanId) : null
    }
  });
}

async function updateOrphanPhotos(_parent, args, { prisma }, _info) {
  const id = parseInt(args.id);
  delete args.id;
  const prevOrphan = await prisma.orphanPhotos
    .findUnique({ where: { id } })
    .orphan();
  const prevOrphanId = prevOrphan ? prevOrphan.id : null;
  return await prisma.orphanPhotos.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      orphanId: args.orphanId ? parseInt(args.orphanId) : prevOrphanId
    }
  });
}

async function createPeasantAssociation(_parent, args, { prisma }, _info) {
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

async function updatePeasantAssociation(_parent, args, { prisma }, _info) {
  const id = parseInt(args.id);
  delete args.id;
  const prevDistrict = await prisma.peasantAssociation
    .findUnique({ where: { id } })
    .district();
  const prevDistrictId = prevDistrict ? prevDistrict.id : null;

  const prevDonor = await prisma.peasantAssociation
    .findUnique({ where: { id } })
    .donor();
  const prevDonorId = prevDonor ? prevDonor.id : null;
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
  return await prisma.peasantAssociation.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      districtId: args.districtId ? parseInt(args.districtId) : prevDistrictId,
      donorId: args.donorId ? parseInt(args.donorId) : prevDonorId,
      orphans: { connect: orphansIds },
      socialWorkers: { connect: socialWorkersIds }
    }
  });
}

async function createSponsorshipStatus(_parent, args, { prisma }, _info) {
  return await prisma.sponsorshipStatus.create({
    data: {
      ...args,
      orphanId: args.orphanId ? parseInt(args.orphanId) : null
    }
  });
}

async function updateSponsorshipStatus(_parent, args, { prisma }, _info) {
  const id = parseInt(args.id);
  delete args.id;
  const prevOrphan = await prisma.sponsorshipStatus
    .findUnique({ where: { id } })
    .orphan();
  const prevOrphanId = prevOrphan ? prevOrphan.id : null;
  return await prisma.sponsorshipStatus.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      orphanId: args.orphanId ? parseInt(args.orphanId) : prevOrphanId
    }
  });
}

async function createSupportPlan(_parent, args, { prisma }, _info) {
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

async function updateSupportPlan(_parent, args, { prisma }, _info) {
  const id = parseInt(args.id);
  delete args.id;
  const orphansIds = args.orphans
    ? [...args.orphans].map((val) => ({ id: parseInt(val) }))
    : [];

  const prevDonor = await prisma.supportPlan
    .findUnique({ where: { id } })
    .donor();
  const prevDonorId = prevDonor ? prevDonor.id : null;
  return await prisma.supportPlan.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      donorId: args.donorId ? parseInt(args.donorId) : prevDonorId,
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
