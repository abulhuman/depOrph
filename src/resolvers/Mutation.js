async function createDonor(_parent, args, { prisma }, _info) {
  const orphansIds = args.orphans
    ? [...args.orphans].map((val) => ({
        id: parseInt(val)
      }))
    : [];

  const villagesIds = args.villages
    ? [...args.villages].map((val) => ({
        id: parseInt(val)
      }))
    : [];

  const supportPlansIds = args.supportPlans
    ? [...args.supportPlans].map((val) => ({
        id: parseInt(val)
      }))
    : [];

  return await prisma.donor.create({
    data: {
      ...args,
      coordinatorId: args.coordinatorId ? parseInt(args.coordinatorId) : null,
      userId: args.userId ? parseInt(args.userId) : null,

      orphans: {
        connect: orphansIds
      },
      villages: {
        connect: villagesIds
      },
      supportPlans: {
        connect: supportPlansIds
      }
    }
  });
}

async function updateDonor(_parent, args, { prisma }, _info) {
  const id = parseInt(args.id);
  delete args.id;

  const previousCoordinator = await prisma.donor
    .findUnique({
      where: { id }
    })
    .coordinator();
  const previousCoordinatorId = previousCoordinator
    ? previousCoordinator.id
    : null;

  const previousUser = await prisma.donor.findUnique({ where: { id } }).user();
  const previousUserId = previousUser ? previousUser.id : null;

  const orphansIds = args.orphans
    ? [...args.orphans].map((val) => ({
        id: parseInt(val)
      }))
    : [];

  const villagesIds = args.villages
    ? [...args.villages].map((val) => ({
        id: parseInt(val)
      }))
    : [];

  const supportPlansIds = args.supportPlans
    ? [...args.supportPlans].map((val) => ({
        id: parseInt(val)
      }))
    : [];
  return await prisma.donor.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      coordinatorId: args.coordinatorId
        ? parseInt(args.coordinatorId)
        : previousCoordinatorId,
      userId: args.userId ? parseInt(args.userId) : previousUserId,
      orphans: {
        connect: orphansIds
      },
      villages: {
        connect: villagesIds
      },
      supportPlans: {
        connect: supportPlansIds
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
  const educationalRecordsIds = args.educationalRecords
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
        connect: educationalRecordsIds
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
  const id = parseInt(args.id);
  delete args.id;

  const orphansIds = args.orphans
    ? [...args.orphans].map((val) => ({ id: parseInt(val) }))
    : [];
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
  const id = parseInt(args.id);
  delete args.id;

  const orphansIds = args.orphans
    ? [...args.orphans].map((val) => ({ id: parseInt(val) }))
    : [];
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
  const id = parseInt(args.id);
  delete args.id;

  const orphansIds = args.orphans
    ? [...args.orphans].map((val) => ({ id: parseInt(val) }))
    : [];
  const jobIds = args.jobs
    ? [...args.jobs].map((val) => ({ id: parseInt(val) }))
    : [];
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

  const previousMother = await prisma.motherJob
    .findUnique({ where: { id } })
    .mother();
  const previousMotherId = previousMother ? previousMother.id : null;
  return await prisma.motherJob.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      motherId: args.motherId ? parseInt(args.motherId) : previousMotherId
    }
  });
}

async function createRegion(_parent, args, { prisma }, _info) {
  const zonesIds = args.zones
    ? [...args.zones].map((val) => ({ id: parseInt(val) }))
    : [];
  return await prisma.zone.create({
    data: {
      ...args,
      zone: {
        connect: zonesIds
      }
    }
  });
}

async function updateRegion(_parent, args, { prisma }, _info) {
  const id = parseInt(args.id);
  delete args.id;

  const zonesIds = args.zones
    ? [...args.zones].map((val) => ({ id: parseInt(val) }))
    : [];
  return await prisma.zone.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      zone: {
        connect: zonesIds
      }
    }
  });
}

async function createZone(_parent, args, { prisma }, _info) {
  const districtsIds = args.districts
    ? [...args.districts].map((val) => ({ id: parseInt(val) }))
    : [];
  return await prisma.zone.create({
    data: {
      ...args,
      districts: {
        connect: districtsIds
      },
      regionId: args.regionId ? parseInt(args.regionId) : null
    }
  });
}

async function updateZone(_parent, args, { prisma }, _info) {
  const id = parseInt(args.id);
  delete args.id;

  const districtsIds = args.districts
    ? [...args.districts].map((val) => ({ id: parseInt(val) }))
    : [];
  const previousRegion = await prisma.zone
    .findUnique({
      where: { id }
    })
    .region();
  const previousRegionId = previousRegion ? previousRegion.id : null;
  return await prisma.zone.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      districts: {
        connect: districtsIds
      },
      regionId: args.regionId ? parseInt(args.regionId) : previousRegionId
    }
  });
}

async function createDistrict(_parent, args, { prisma }, _info) {
  const orphansIds = args.orphans
    ? [...args.orphans].map((val) => ({ id: parseInt(val) }))
    : [];
  const villageIds = [...args.villageIds].map((val) => ({
    id: parseInt(val)
  }));
  const socialWorkersIds = [...args.socialWorkersIds].map((val) => ({
    id: parseInt(val)
  }));
  return await prisma.district.create({
    data: {
      ...args,
      orphans: {
        connect: orphansIds
      },
      villages: {
        connect: villageIds
      },
      cooridnatorId: args.coordinatorId ? parseInt(args.coordinatorId) : null,
      zoneId: args.zoneId ? parseInt(args.zoneId) : null,
      socialWorkers: {
        connect: socialWorkersIds
      }
    }
  });
}

async function updateDistrict(_parent, args, { prisma }, _info) {
  const id = parseInt(args.id);
  delete args.id;

  const previousCoordinator = await prisma.district
    .findUnique({
      where: { id }
    })
    .coordinator();
  const previousCoordinatorId = previousCoordinator
    ? previousCoordinator.id
    : null;

  const previousZone = await prisma.district
    .findUnique({
      where: { id }
    })
    .zone();
  const previousZoneId = previousZone ? previousZone.id : null;

  const villagesIds = args.villages
    ? [...args.villages].map((val) => ({ id: parseInt(val) }))
    : [];
  const socialWorkersIds = args.socialWorkers
    ? [...args.socialWorkers].map((val) => ({ id: parseInt(val) }))
    : [];
  return await prisma.district.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      coordinatorId: args.coordinatorId
        ? parseInt(args.coordinatorId)
        : previousCoordinatorId,
      zoneId: args.zoneId ? parseInt(args.zoneId) : previousZoneId,
      villages: {
        connect: villagesIds
      },
      socialWorkers: {
        connect: socialWorkersIds
      }
    }
  });
}

async function createVillage(_parent, args, { prisma }, _info) {
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
  return await prisma.village.create({
    data: {
      ...args,
      districtId: args.districtId ? parseInt(args.districtId) : null,
      donorId: args.donorId ? parseInt(args.donorId) : null,
      orphans: { connect: orphansIds },
      socialWorkers: { connect: socialWorkersIds }
    }
  });
}

async function updateVillage(_parent, args, { prisma }, _info) {
  const id = parseInt(args.id);
  delete args.id;

  const previousCoordinator = await prisma.village
    .findUnique({ where: { id } })
    .coordinator();
  const previousCoordinatorId = previousCoordinator
    ? previousCoordinator.id
    : null;

  const previousDistrict = await prisma.village
    .findUnique({ where: { id } })
    .district();
  const previousDistrictId = previousDistrict ? previousDistrict.id : null;

  const previousDonor = await prisma.village
    .findUnique({ where: { id } })
    .donor();
  const previousDonorId = previousDonor ? previousDonor.id : null;

  const orphansIds = args.orphans
    ? [...args.orphans].map((val) => ({
        id: parseInt(val)
      }))
    : [];
  return await prisma.village.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      coordinatorId: args.coordinatorId
        ? parseInt(args.coordinatorId)
        : previousCoordinatorId,
      districtId: args.districtId
        ? parseInt(args.districtId)
        : previousDistrictId,
      donorId: args.donorId ? parseInt(args.donorId) : previousDonorId,
      orphans: { connect: orphansIds }
    }
  });
}

async function createOrphan(_parent, args, { prisma }, _info) {
  const photosIds = args.photos
    ? [...args.photos].map((val) => ({ id: parseInt(val) }))
    : [];
  const siblingsIds = args.siblings
    ? [...args.siblings].map((val) => ({ id: parseInt(val) }))
    : [];
  const siblingOfIds = args.siblingOf
    ? [...args.siblingOf].map((val) => ({ id: parseInt(val) }))
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
      donorId: args.donorId ? parseInt(args.donorId) : null,
      fatherId: args.fatherId ? parseInt(args.fatherId) : null,
      guardianId: args.guardianId ? parseInt(args.guardianId) : null,
      house_propertyId: args.house_propertyId
        ? parseInt(args.house_propertyId)
        : null,
      motherId: args.motherId ? parseInt(args.motherId) : null,
      villagesId: args.villagesId ? parseInt(args.villagesId) : null,
      socialWorkerId: args.socialWorkerId
        ? parseInt(args.socialWorkerId)
        : null,
      supportPlanId: args.supportPlanId ? parseInt(args.supportPlanId) : null,
      educationId: args.educationId ? parseInt(args.educationId) : null,
      photos: { connect: { photosIds } },
      financialRecords: { connect: finRecIds },
      healthRecords: { connect: healthRecordsIds },
      siblings: { connect: siblingsIds },
      siblingOfIds: { connect: siblingOfIds },
      sponsorshipStatuses: { connect: spnsrStsIds }
    }
  });
}

async function updateOrphan(_parent, args, { prisma }, _info) {
  const id = parseInt(args.id);
  delete args.id;

  const previousDonor = await prisma.orphan
    .findUnique({ where: { id } })
    .donor();
  const previousDonorId = previousDonor ? previousDonor.id : null;

  const previousGuardain = await prisma.orphan
    .findUnique({ where: { id } })
    .guardian();
  const previousGuardainId = previousGuardain ? previousGuardain.id : null;

  const previousHouse_property = await prisma.orphan
    .findUnique({ where: { id } })
    .house_property();
  const previousHouse_propertyId = previousHouse_property
    ? previousHouse_property.id
    : null;

  const previousFather = await prisma.orphan
    .findUnique({ where: { id } })
    .father();
  const previousFatherId = previousFather ? previousFather.id : null;

  const previousMother = await prisma.orphan
    .findUnique({ where: { id } })
    .mother();
  const previousMotherId = previousMother ? previousMother.id : null;

  const previousVillage = await prisma.orphan
    .findUnique({ where: { id } })
    .village();
  const previousVillageId = previousVillage ? previousVillage.id : null;

  const previousSocialWorker = await prisma.orphan
    .findUnique({ where: { id } })
    .socialWorker();
  const previousSocialWorkerId = previousSocialWorker
    ? previousSocialWorker.id
    : null;

  const previousEducation = await prisma.orphan
    .findUnique({ where: { id } })
    .education();
  const previousEducationId = previousEducation ? previousEducation.id : null;

  const previousSupportPlan = await prisma.orphan
    .findUnique({ where: { id } })
    .supportPlan();
  const previousSupportPlanId = previousSupportPlan
    ? previousSupportPlan.id
    : null;

  const photosIds = args.photos
    ? [...args.photos].map((val) => ({ id: parseInt(val) }))
    : [];
  const siblingsIds = args.siblings
    ? [...args.siblings].map((val) => ({ id: parseInt(val) }))
    : [];
  const siblingOfIds = args.siblingOf
    ? [...args.siblingOf].map((val) => ({ id: parseInt(val) }))
    : [];
  const financialRecordsIds = args.financialRecords
    ? [...args.financialRecords].map((val) => ({
        id: parseInt(val)
      }))
    : [];
  const sponsorshipStatusesIds = args.sponsorshipStatuses
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
      donorId: args.donorId ? parseInt(args.donorId) : previousDonorId,
      educationId: args.educationId
        ? parseInt(args.educationId)
        : previousEducationId,
      fatherId: args.fatherId ? parseInt(args.fatherId) : previousFatherId,
      guardianId: args.guardianId
        ? parseInt(args.guardianId)
        : previousGuardainId,
      house_propertyId: args.house_propertyId
        ? parseInt(args.house_propertyId)
        : previousHouse_propertyId,
      motherId: args.motherId ? parseInt(args.motherId) : previousMotherId,
      villageId: args.villageId ? parseInt(args.villageId) : previousVillageId,
      socialWorkerId: args.socialWorkerId
        ? parseInt(args.socialWorkerId)
        : previousSocialWorkerId,
      supportPlanId: args.supportPlanId
        ? parseInt(args.supportPlanId)
        : previousSupportPlanId,
      photos: { connect: photosIds },
      financialRecords: { connect: financialRecordsIds },
      healthRecords: { connect: healthRecordsIds },
      sponsorshipStatuses: { connect: sponsorshipStatusesIds },
      siblings: { connect: siblingIds },
      siblingOf: { connect: siblingOfIds }
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
      villagesId: args.villagesId ? parseInt(args.villagesId) : null,
      orphans: { connect: orphansIds },
      userId: args.userId ? parseInt(args.userId) : null
    }
  });
}

async function updateSocialWorker(_parent, args, { prisma }, _info) {
  const id = parseInt(args.id);
  delete args.id;

  const previousUser = await prisma.socialWorker
    .findUnique({ where: { id } })
    .user();
  const previousUserId = previousUser ? previousUser.id : null;
  const previousDistrict = await prisma.socialWorker
    .findUnique({ where: { id } })
    .district();
  const previousDistrictId = previousDistrict ? previousDistrict.id : null;
  const orphansIds = args.orphans
    ? [...args.orphans].map((val) => ({ id: parseInt(val) }))
    : [];
  return await prisma.socialWorker.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      userId: args.userId ? parseInt(args.userId) : previousUserId,
      districtId: args.districtId
        ? parseInt(args.districtId)
        : previousDistrictId,
      orphans: { connect: orphansIds }
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
  const previousEducation = await prisma.educationalRecord
    .findUnique({ where: { id } })
    .education();
  const previousEducationId = previousEducation ? previousEducation.id : null;
  return await prisma.educationalRecord.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      educationId: args.educationId
        ? parseInt(args.educationId)
        : previousEducationId
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
  const previousOrphan = await prisma.financialRecord
    .findUnique({ where: { id } })
    .orphan();
  const previousOrphanId = previousOrphan ? previousOrphan.id : null;
  return await prisma.financialRecord.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      orphanId: args.orphanId ? parseInt(args.orphanId) : previousOrphanId
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
  const previousOrphan = await prisma.healthRecord
    .findUnique({ where: { id } })
    .orphan();
  const previousOrphanId = previousOrphan ? previousOrphan.id : null;
  return await prisma.healthRecord.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      orphanId: args.orphanId ? parseInt(args.orphanId) : previousOrphanId
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

  const previousOrphan = await prisma.orphanPhotos
    .findUnique({ where: { id } })
    .orphan();
  const previousOrphanId = previousOrphan ? previousOrphan.id : null;
  return await prisma.orphanPhotos.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      orphanId: args.orphanId ? parseInt(args.orphanId) : previousOrphanId
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
  const previousOrphan = await prisma.sponsorshipStatus
    .findUnique({ where: { id } })
    .orphan();
  const previousOrphanId = previousOrphan ? previousOrphan.id : null;
  return await prisma.sponsorshipStatus.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      orphanId: args.orphanId ? parseInt(args.orphanId) : previousOrphanId
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

  const previousDonor = await prisma.supportPlan
    .findUnique({ where: { id } })
    .donor();
  const previousDonorId = previousDonor ? previousDonor.id : null;
  return await prisma.supportPlan.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      donorId: args.donorId ? parseInt(args.donorId) : previousDonorId,
      orphans: { connect: orphansIds }
    }
  });
}

async function createHead(_parent, args, { prisma }, _info) {
  return await prisma.head.create({
    data: {
      ...args,
      userId: args.userId ? parseInt(args.userId) : null
    }
  });
}

async function updateHead(_parent, args, { prisma }, _info) {
  const id = parseInt(args.id);
  delete args.id;

  const previousUser = await prisma.head.findUnique({ where: { id } }).user();
  const previousUserId = previousUser ? previousUser.id : null;
  return await prisma.head.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      userId: args.userId ? parseInt(args.userId) : previousUserId
    }
  });
}

async function createCoordinator(_parent, args, { prisma }, _info) {
  const villagesIds = args.village
    ? [...args.village].map((val) => ({ id: parseInt(val) }))
    : [];
  const districtsIds = args.district
    ? [...args.district].map((val) => ({ id: parseInt(val) }))
    : [];
  const donorsIds = args.donors
    ? [...args.donors].map((val) => ({ id: parseInt(val) }))
    : [];
  return await prisma.coordinator.create({
    data: {
      ...args,
      village: { connect: villagesIds },
      district: { connect: districtsIds },
      doner: { connect: donorsIds },
      userId: args.userId ? parseInt(args.userId) : null
    }
  });
}

async function updateCoordinator(_parent, args, { prisma }, _info) {
  const id = parseInt(args.id);
  delete args.id;

  const villagesIds = args.village
    ? [...args.village].map((val) => ({ id: parseInt(val) }))
    : [];
  const districtsIds = args.district
    ? [...args.district].map((val) => ({ id: parseInt(val) }))
    : [];
  const donorsIds = args.donors
    ? [...args.donors].map((val) => ({ id: parseInt(val) }))
    : [];

  const previousUser = await prisma.coordinator
    .findUnique({ where: { id } })
    .user();
  const previousUserId = previousUser ? previousUser.id : null;
  return await prisma.coordinator.update({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      village: { connect: villagesIds },
      district: { connect: districtsIds },
      doner: { connect: donorsIds },
      userId: args.userId ? parseInt(args.userId) : previousUserId
    }
  });
}

async function createUser(_parent, args, { prisma }, _info) {
  const coordinatorsIds = args.coordinator
    ? [...args.coordinator].map((val) => ({ id: parseInt(val) }))
    : [];
  const headsIds = args.heads
    ? [...args.heads].map((val) => ({ id: parseInt(val) }))
    : [];
  const socialWorkersIds = args.socialWorkers
    ? [...args.socialWorkers].map((val) => ({ id: parseInt(val) }))
    : [];
  const donorsIds = args.donors
    ? [...args.donors].map((val) => ({ id: parseInt(val) }))
    : [];
  return await prisma.user.create({
    data: {
      ...args,
      head: { connect: headsIds },
      socialWorker: { connect: socialWorkersIds },
      donors: { connect: donorsIds },
      coordinator: { connect: coordinatorsIds }
    }
  });
}

async function updateUser(_parent, args, { prisma }, _info) {
  const id = parseInt(args.id);
  delete args.id;

  const coordinatorsIds = args.coordinator
    ? [...args.coordinator].map((val) => ({ id: parseInt(val) }))
    : [];
  const headsIds = args.heads
    ? [...args.heads].map((val) => ({ id: parseInt(val) }))
    : [];
  const socialWorkersIds = args.socialWorkers
    ? [...args.socialWorkers].map((val) => ({ id: parseInt(val) }))
    : [];
  const donorsIds = args.donors
    ? [...args.donors].map((val) => ({ id: parseInt(val) }))
    : [];
  return await prisma.user.create({
    where: { id },
    data: {
      ...args,
      updated_at: new Date(),
      head: { connect: headsIds },
      socialWorker: { connect: socialWorkersIds },
      donors: { connect: donorsIds },
      coordinator: { connect: coordinatorsIds }
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
  createRegion,
  updateRegion,
  createZone,
  updateZone,
  createDistrict,
  updateDistrict,
  createVillage,
  updateVillage,
  createOrphan,
  updateOrphan,
  createSocialWorker,
  updateSocialWorker,
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
  createSponsorshipStatus,
  updateSponsorshipStatus,
  createSupportPlan,
  updateSupportPlan,
  createHead,
  updateHead,
  createCoordinator,
  updateCoordinator,
  createUser,
  updateUser
};
