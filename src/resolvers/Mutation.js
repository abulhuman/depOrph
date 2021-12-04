const bcrypt = require("bcryptjs");
const {
  getUser,
  AuthenticationError,
  updateImage,
  AuthorizationError
} = require("../utils");
const { userRoles_enum } = require("@prisma/client");

async function createDonor(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const orphansIds = args.orphans
      ? [...args.orphans].map((val) => ({
          id: parseInt(val)
        }))
      : [];

    const supportPlansIds = args.supportPlans
      ? [...args.supportPlans].map((val) => ({
          id: parseInt(val)
        }))
      : [];

    const coordinatorsIds = args.coordinators
      ? [...args.coordinators].map((val) => ({
          id: parseInt(val)
        }))
      : [];

    const DonorCreateInput = {
      ...args,
      user: args.userId
        ? { connect: { id: parseInt(args.userId) } }
        : undefined,

      coordinators: {
        connect: coordinatorsIds
      },
      orphans: {
        connect: orphansIds
      },
      supportPlans: {
        connect: supportPlansIds
      }
    };

    delete DonorCreateInput.coordinatorId;
    delete DonorCreateInput.userId;

    return await prisma.donor.create({
      data: DonorCreateInput
    });
  }
  throw new AuthenticationError();
}

async function updateDonor(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const id = parseInt(args.id);
    delete args.id;

    const previousCoordinator = await prisma.donor
      .findUnique({
        where: { id }
      })
      .coordinator();
    const previousCoordinatorId = previousCoordinator
      ? previousCoordinator.id
      : undefined;

    const previousUser = await prisma.donor
      .findUnique({ where: { id } })
      .user();
    const previousUserId = previousUser ? previousUser.id : undefined;

    const orphansIds = args.orphans
      ? [...args.orphans].map((val) => ({
          id: parseInt(val)
        }))
      : [];

    const districtsIds = args.districts
      ? [...args.districts].map((val) => ({
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

    const DonorUpdateInput = {
      ...args,
      updated_at: new Date(),
      coordinator: args.coordinatorId
        ? { connect: { id: parseInt(args.coordinatorId) } }
        : previousCoordinatorId
        ? { connect: { id: previousCoordinatorId } }
        : undefined,
      // user: args.userId
      //   ? { connect: { id: parseInt(args.userId) } }
      //   : previousUserId
      //   ? { connect: { id: previousUserId } }
      //   : undefined,

      orphans: {
        connect: orphansIds
      },
      districts: {
        connect: districtsIds
      },
      villages: {
        connect: villagesIds
      },
      supportPlans: {
        connect: supportPlansIds
      }
    };

    delete DonorUpdateInput.coordinatorId;
    delete DonorUpdateInput.userId;

    return await prisma.donor.update({
      where: { id },
      data: DonorUpdateInput
    });
  }
  throw new AuthenticationError();
}

async function createFather(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
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
  throw new AuthenticationError();
}

async function updateFather(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const id = parseInt(args.id);
    delete args.id;

    await updateImage(
      prisma,
      id,
      args.deathCertificateUrl,
      `deathCertificateUrl`,
      `father`
    );

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
  throw new AuthenticationError();
}

async function createGuardian(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
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
  throw new AuthenticationError();
}

async function updateGuardian(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const id = parseInt(args.id);
    delete args.id;

    await updateImage(prisma, id, args.iDCardUrl, `iDCardUrl`, `guardian`);

    await updateImage(
      prisma,
      id,
      args.confirmationLetterUrl,
      `confirmationLetterUrl`,
      `guardian`
    );

    await updateImage(
      prisma,
      id,
      args.legalConfirmationLetterUrl,
      `legalConfirmationLetterUrl`,
      `guardian`
    );

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
  throw new AuthenticationError();
}

async function createMother(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
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
  throw new AuthenticationError();
}

async function updateMother(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
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
  throw new AuthenticationError();
}

async function createMotherJob(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const MotherJobCreateInput = {
      ...args,
      mother: args.motherId
        ? {
            connect: { id: parseInt(args.motherId) }
          }
        : undefined
    };
    delete MotherJobCreateInput.motherId;

    return await prisma.motherJob.create({
      data: MotherJobCreateInput
    });
  }
  throw new AuthenticationError();
}

async function updateMotherJob(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const id = parseInt(args.id);
    delete args.id;

    const previousMother = await prisma.motherJob
      .findUnique({ where: { id } })
      .mother();
    const previousMotherId = previousMother ? previousMother.id : undefined;

    const MotherJobUpdateInput = {
      ...args,
      updated_at: new Date(),
      mother: args.motherId
        ? {
            connect: { id: parseInt(args.motherId) }
          }
        : previousMotherId
        ? {
            connect: { id: previousMotherId }
          }
        : undefined
    };
    delete MotherJobUpdateInput.motherId;
    return await prisma.motherJob.update({
      where: { id },
      data: MotherJobUpdateInput
    });
  }
  throw new AuthenticationError();
}

async function createRegion(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    return await prisma.region.create({
      data: {
        ...args
      }
    });
  }
  throw new AuthenticationError();
}

async function updateRegion(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const id = parseInt(args.id);
    delete args.id;

    const zonesIds = args.zones
      ? [...args.zones].map((val) => ({ id: parseInt(val) }))
      : [];
    return await prisma.region.update({
      where: { id },
      data: {
        ...args,
        updated_at: new Date(),
        zones: {
          connect: zonesIds
        }
      }
    });
  }
  throw new AuthenticationError();
}

async function createZone(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const ZoneCreateInput = {
      ...args,
      region: { connect: { id: parseInt(args.regionId) } }
    };
    delete ZoneCreateInput.regionId;
    return await prisma.zone.create({
      data: ZoneCreateInput
    });
  }
  throw new AuthenticationError();
}

async function updateZone(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
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
    const previousRegionId = previousRegion ? previousRegion.id : undefined;
    const ZoneUpdateInput = {
      ...args,
      updated_at: new Date(),
      districts: {
        connect: districtsIds
      },
      region: args.regionId
        ? { connect: { id: parseInt(args.regionId) } }
        : previousRegionId
        ? { connect: { id: previousRegionId } }
        : undefined
    };
    delete ZoneUpdateInput.regionId;
    return await prisma.zone.update({
      where: { id },
      data: ZoneUpdateInput
    });
  }
  throw new AuthenticationError();
}

async function createDistrict(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const DistrictCreateInput = {
      ...args,
      zone: {
        connect: { id: parseInt(args.zoneId) }
      }
    };
    delete DistrictCreateInput.zoneId;
    return await prisma.district.create({
      data: DistrictCreateInput
    });
  }
  throw new AuthenticationError();
}

async function updateDistrict(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const id = parseInt(args.id);
    delete args.id;

    const previousCoordinator = await prisma.district
      .findUnique({
        where: { id }
      })
      .coordinator();
    const previousCoordinatorId = previousCoordinator
      ? previousCoordinator.id
      : undefined;

    const previousZone = await prisma.district
      .findUnique({
        where: { id }
      })
      .zone();
    const previousZoneId = previousZone ? previousZone.id : undefined;

    const villagesIds = args.villages
      ? [...args.villages].map((val) => ({ id: parseInt(val) }))
      : [];
    const socialWorkersIds = args.socialWorkers
      ? [...args.socialWorkers].map((val) => ({ id: parseInt(val) }))
      : [];
    const donorsIds = args.donors
      ? [...args.donors].map((val) => ({ id: parseInt(val) }))
      : [];

    const DistrictUpdateInput = {
      ...args,
      updated_at: new Date(),
      coordinator: args.coordinatorId
        ? {
            connect: {
              id: parseInt(args.coordinatorId)
            }
          }
        : previousCoordinatorId
        ? {
            connect: {
              id: previousCoordinatorId
            }
          }
        : undefined,
      zone: args.zoneId
        ? {
            connect: { id: parseInt(args.zoneId) }
          }
        : previousZoneId
        ? { connect: { id: previousZoneId } }
        : undefined,
      villages: {
        connect: villagesIds
      },
      socialWorkers: {
        connect: socialWorkersIds
      },
      donors: {
        connect: donorsIds
      }
    };
    delete DistrictUpdateInput.coordinatorId;
    delete DistrictUpdateInput.zoneId;

    return await prisma.district.update({
      where: { id },
      data: DistrictUpdateInput
    });
  }
  throw new AuthenticationError();
}

async function createVillage(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const projectsIds = args.projects
      ? [...args.projects].map((val) => ({ id: parseInt(val) }))
      : [];

    const VillageCreateInput = {
      ...args,
      projects: { connect: projectsIds },
      district: args.districtId
        ? { connect: { id: parseInt(args.districtId) } }
        : {}
    };
    delete VillageCreateInput.districtId;

    return await prisma.village.create({
      data: VillageCreateInput
    });
  }
  throw new AuthenticationError();
}

async function updateVillage(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const id = parseInt(args.id);
    delete args.id;

    const previousSocialWorker = await prisma.village
      .findUnique({ where: { id } })
      .socialWorker();
    const previousSocialWorkerId = previousSocialWorker
      ? previousSocialWorker.id
      : undefined;

    const previousDistrict = await prisma.village
      .findUnique({ where: { id } })
      .district();
    const previousDistrictId = previousDistrict
      ? previousDistrict.id
      : undefined;

    const orphansIds = args.orphans
      ? [...args.orphans].map((val) => ({
          id: parseInt(val)
        }))
      : [];

    const projectsIds = args.projects
      ? [...args.projects].map((val) => ({
          id: parseInt(val)
        }))
      : [];
    const VillageUpdateInput = {
      ...args,
      updated_at: new Date(),
      socialWorker: args.socialWorkerId
        ? { connect: { id: parseInt(args.socialWorkerId) } }
        : previousSocialWorkerId
        ? { connect: { id: previousSocialWorkerId } }
        : undefined,
      district: args.districtId
        ? { connect: { id: parseInt(args.districtId) } }
        : previousDistrictId
        ? { connect: { id: previousDistrictId } }
        : undefined,
      projects: { connect: projectsIds },
      orphans: { connect: orphansIds }
    };
    delete VillageUpdateInput.districtId;
    delete VillageUpdateInput.socialWorkerId;
    delete VillageUpdateInput.donorId;

    return await prisma.village.update({
      where: { id },
      data: VillageUpdateInput
    });
  }
  throw new AuthenticationError();
}

async function createOrphan(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const photosIds = args.photos
      ? [...args.photos].map((val) => ({ id: parseInt(val) }))
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
    const siblingssIds = args.siblings
      ? [...args.siblings].map((val) => ({ id: parseInt(val) }))
      : [];
    const siblingOfsIds = args.siblingOf
      ? [...args.siblingOf].map((val) => ({ id: parseInt(val) }))
      : [];

    const OrphanCreateInput = {
      ...args,
      donor: args.donorId
        ? { connect: { id: parseInt(args.donorId) } }
        : undefined,
      father: args.fatherId
        ? { connect: { id: parseInt(args.fatherId) } }
        : undefined,
      guardian: args.guardianId
        ? { connect: { id: parseInt(args.guardianId) } }
        : undefined,
      house_property: args.house_propertyId
        ? { connect: { id: parseInt(args.house_propertyId) } }
        : undefined,
      mother: args.motherId
        ? { connect: { id: parseInt(args.motherId) } }
        : undefined,
      village: args.villageId
        ? { connect: { id: parseInt(args.villageId) } }
        : undefined,
      socialWorker: args.socialWorkerId
        ? { connect: { id: parseInt(args.socialWorkerId) } }
        : undefined,
      supportPlan: args.supportPlanId
        ? { connect: { id: parseInt(args.supportPlanId) } }
        : undefined,
      education: args.educationId
        ? { connect: { id: parseInt(args.educationId) } }
        : undefined,
      photos: { connect: photosIds },
      financialRecords: { connect: financialRecordsIds },
      healthRecords: { connect: healthRecordsIds },
      sponsorshipStatuses: { connect: sponsorshipStatusesIds },
      siblings: {
        connect: siblingssIds
      },
      siblingOf: {
        connect: siblingOfsIds
      }
    };
    delete OrphanCreateInput.donorId;
    delete OrphanCreateInput.fatherId;
    delete OrphanCreateInput.guardianId;
    delete OrphanCreateInput.house_propertyId;
    delete OrphanCreateInput.motherId;
    delete OrphanCreateInput.villageId;
    delete OrphanCreateInput.socialWorkerId;
    delete OrphanCreateInput.supportPlanId;
    delete OrphanCreateInput.educationId;
    return await prisma.orphan.create({
      data: OrphanCreateInput
    });
  }
  throw new AuthenticationError();
}

async function createOrphanWithBaselineData(
  _parent,
  args,
  { prisma, req },
  _info
) {
  if (getUser(req).userId) {
    const OrphanCreateInput = {
      ...args,
      father: {
        create: { ...args.father }
      },
      mother: {
        create: { ...args.mother }
      },
      guardian: {
        create: { ...args.guardian }
      },
      house_property: {
        create: { ...args.house_property }
      },
      healthStatuses: {
        create: { ...args.firstHealthStatus }
      },
      photos: {
        create: { ...args.firstPhotos }
      },
      educationalRecords: {
        create: { ...args.firstEducationalRecord }
      },
      sponsorshipStatuses: {
        create: {
          status: "new",
          reason: "new registreation successful",
          date: new Date()
        }
      },
      village: { connect: { id: parseInt(args.villageId) } },
      socialWorker: { connect: { id: parseInt(args.socialWorkerId) } }
    };
    delete OrphanCreateInput.firstHealthStatus;
    delete OrphanCreateInput.firstPhotos;
    delete OrphanCreateInput.firstEducationalRecord;
    delete OrphanCreateInput.villageId;
    delete OrphanCreateInput.socialWorkerId;

    return await prisma.orphan.create({
      data: OrphanCreateInput
    });
  }
  throw new AuthenticationError();
}

async function updateOrphan(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const id = parseInt(args.id);
    delete args.id;

    // update all images of orphan
    await updateImage(prisma, id, args.idCardUrl, `idCardUrl`, `orphan`);
    await updateImage(prisma, id, args.passportUrl, `passportUrl`, `orphan`);
    await updateImage(
      prisma,
      id,
      args.originalThankyouLetterUrl,
      `originalThankyouLetterUrl`,
      `orphan`
    );
    await updateImage(
      prisma,
      id,
      args.translatedThankyouLetterUrl,
      `translatedThankyouLetterUrl`,
      `orphan`
    );
    await updateImage(
      prisma,
      id,
      args.birthCertificateUrl,
      `birthCertificateUrl`,
      `orphan`
    );

    const previousGuardain = await prisma.orphan
      .findUnique({ where: { id } })
      .guardian();
    const previousGuardainId = previousGuardain
      ? previousGuardain.id
      : undefined;

    const previousHouse_property = await prisma.orphan
      .findUnique({ where: { id } })
      .house_property();
    const previousHouse_propertyId = previousHouse_property
      ? previousHouse_property.id
      : undefined;

    const previousFather = await prisma.orphan
      .findUnique({ where: { id } })
      .father();
    const previousFatherId = previousFather ? previousFather.id : undefined;

    const previousMother = await prisma.orphan
      .findUnique({ where: { id } })
      .mother();
    const previousMotherId = previousMother ? previousMother.id : undefined;

    const previousSocialWorker = await prisma.orphan
      .findUnique({ where: { id } })
      .socialWorker();
    const previousSocialWorkerId = previousSocialWorker
      ? previousSocialWorker.id
      : undefined;

    const photosIds = args.photos
      ? [...args.photos].map((val) => ({ id: parseInt(val) }))
      : [];
    const financialRecordsIds = args.financialRecords
      ? [...args.financialRecords].map((val) => ({
          id: parseInt(val)
        }))
      : [];
    const educationalRecordsIds = args.educationalRecords
      ? [...args.educationalRecords].map((val) => ({
          id: parseInt(val)
        }))
      : [];
    const supportPlansIds = args.supportPlans
      ? [...args.supportPlans].map((val) => ({
          id: parseInt(val)
        }))
      : [];
    const sponsorshipStatusesIds = args.sponsorshipStatuses
      ? [...args.sponsorshipStatuses].map((val) => ({
          id: parseInt(val)
        }))
      : [];
    const documentsIds = args.documents
      ? [...args.documents].map((val) => ({
          id: parseInt(val)
        }))
      : [];
    const donorsIds = args.donors
      ? [...args.donors].map((val) => ({
          id: parseInt(val)
        }))
      : [];
    const siblingssIds = args.siblings
      ? [...args.siblings].map((val) => ({ id: parseInt(val) }))
      : [];
    const siblingOfsIds = args.siblingOf
      ? [...args.siblingOf].map((val) => ({ id: parseInt(val) }))
      : [];
    const OrphanUpdateInput = {
      ...args,
      updated_at: new Date(),
      father: args.fatherId
        ? { connect: { id: parseInt(args.fatherId) } }
        : previousFatherId
        ? { connect: { id: previousFatherId } }
        : undefined,
      guardian: args.guardianId
        ? { connect: { id: parseInt(args.guardianId) } }
        : previousGuardainId
        ? { connect: { id: previousGuardainId } }
        : undefined,
      house_property: args.house_propertyId
        ? { connect: { id: parseInt(args.house_propertyId) } }
        : previousHouse_propertyId
        ? { connect: { id: previousHouse_propertyId } }
        : undefined,
      mother: args.motherId
        ? { connect: { id: parseInt(args.motherId) } }
        : previousMotherId
        ? { connect: { id: previousMotherId } }
        : undefined,
      socialWorker: args.socialWorkerId
        ? { connect: { id: parseInt(args.socialWorkerId) } }
        : previousSocialWorkerId
        ? { connect: { id: previousSocialWorkerId } }
        : undefined,
      photos: { connect: photosIds },
      financialRecords: { connect: financialRecordsIds },
      educationalRecords: { connect: educationalRecordsIds },
      supportPlans: { connect: supportPlansIds },
      documents: { connect: documentsIds },
      sponsorshipStatuses: { connect: sponsorshipStatusesIds },
      donors: { connect: donorsIds },
      siblings: {
        connect: siblingssIds
      },
      siblingOf: {
        connect: siblingOfsIds
      }
    };
    delete OrphanUpdateInput.fatherId;
    delete OrphanUpdateInput.guardianId;
    delete OrphanUpdateInput.house_propertyId;
    delete OrphanUpdateInput.motherId;
    delete OrphanUpdateInput.socialWorkerId;
    delete OrphanUpdateInput.supportPlanId;
    return await prisma.orphan.update({
      where: { id },
      data: OrphanUpdateInput
    });
  }
  throw new AuthenticationError();
}

async function createSocialWorker(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const orphansIds = args.orphans
      ? [...args.orphans].map((val) => ({ id: parseInt(val) }))
      : [];

    const districtsIds = args.districts
      ? [...args.districts].map((val) => ({ id: parseInt(val) }))
      : [];

    const villagesIds = args.villages
      ? [...args.villages].map((val) => ({ id: parseInt(val) }))
      : [];

    const SocialWorkerCreateInput = {
      ...args,
      user: args.userId
        ? { connect: { id: parseInt(args.userId) } }
        : undefined,
      districts: { connect: districtsIds },
      villages: { connect: villagesIds },
      orphans: { connect: orphansIds }
    };
    delete SocialWorkerCreateInput.userId;

    return await prisma.socialWorker.create({
      data: SocialWorkerCreateInput
    });
  }
  throw new AuthenticationError();
}

async function updateSocialWorker(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const id = parseInt(args.id);
    delete args.id;

    // const previousUser = await prisma.socialWorker
    //   .findUnique({ where: { id } })
    //   .user();
    // const previousUserId = previousUser ? previousUser.id : undefined;

    const orphansIds = args.orphans
      ? [...args.orphans].map((val) => ({ id: parseInt(val) }))
      : [];

    const districtsIds = args.districts
      ? [...args.districts].map((val) => ({ id: parseInt(val) }))
      : [];

    const villagesIds = args.villages
      ? [...args.villages].map((val) => ({ id: parseInt(val) }))
      : [];

    const SocialWorkerUpdateInput = {
      ...args,
      updated_at: new Date(),
      // user: args.userId
      //   ? { connect: { id: parseInt(args.userId) } }
      //   : previousUserId
      //   ? { connect: { id: previousUserId } }
      //   : undefined,
      districts: { connect: districtsIds },
      villages: { connect: villagesIds },
      orphans: { connect: orphansIds }
    };
    delete SocialWorkerUpdateInput.userId;

    return await prisma.socialWorker.update({
      where: { id },
      data: SocialWorkerUpdateInput
    });
  }
  throw new AuthenticationError();
}

async function createEducationalRecord(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const EducationalRecordCreateInput = {
      ...args,
      orphan: { connect: { id: parseInt(args.orphanId) } }
    };
    delete EducationalRecordCreateInput.orphanId;
    return await prisma.educationalRecord.create({
      data: EducationalRecordCreateInput
    });
  }
  throw new AuthenticationError();
}

async function updateEducationalRecord(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const id = parseInt(args.id);
    delete args.id;

    // update report card
    await updateImage(
      prisma,
      id,
      args.reportCardUrl,
      `reportCardUrl`,
      `educationalRecord`
    );

    const previousOrphan = await prisma.educationalRecord
      .findUnique({ where: { id } })
      .orphan();
    const previousOrphanId = previousOrphan ? previousOrphan.id : undefined;
    const EducationalRecordUpdateInput = {
      ...args,
      updated_at: new Date(),
      orphan: args.orphanId
        ? { connect: { id: parseInt(args.orphanId) } }
        : previousOrphanId
        ? { connect: { id: previousOrphanId } }
        : undefined
    };
    delete EducationalRecordUpdateInput.orphanId;
    return await prisma.educationalRecord.update({
      where: { id },
      data: EducationalRecordUpdateInput
    });
  }
  throw new AuthenticationError();
}

async function createFinancialRecord(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const FinancialRecordCreateInput = {
      ...args,
      orphan: { connect: { id: parseInt(args.orphanId) } }
    };
    delete FinancialRecordCreateInput.orphanId;
    return await prisma.financialRecord.create({
      data: FinancialRecordCreateInput
    });
  }
  throw new AuthenticationError();
}

async function updateFinancialRecord(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const id = parseInt(args.id);
    delete args.id;

    const previousOrphan = await prisma.financialRecord
      .findUnique({ where: { id } })
      .orphan();
    const previousOrphanId = previousOrphan ? previousOrphan.id : undefined;
    const FinancialRecordUpdateInput = {
      ...args,
      updated_at: new Date(),
      orphan: args.orphanId
        ? { connect: { id: parseInt(args.orphanId) } }
        : previousOrphanId
        ? { connect: { id: previousOrphanId } }
        : undefined
    };
    delete FinancialRecordUpdateInput.orphanId;
    return await prisma.financialRecord.update({
      where: { id },
      data: FinancialRecordUpdateInput
    });
  }
  throw new AuthenticationError();
}

async function createOrphanDocument(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const OrphanDocumentCreateInput = {
      ...args,
      orphan: { connect: { id: parseInt(args.orphanId) } }
    };
    delete OrphanDocumentCreateInput.orphanId;
    return await prisma.orphanDocument.create({
      data: OrphanDocumentCreateInput
    });
  }
  throw new AuthenticationError();
}

async function updateOrphanDocument(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const id = parseInt(args.id);
    delete args.id;

    // update medical cerificate
    await updateImage(
      prisma,
      id,
      args.documentUrl,
      `orphanDocumentUrl`,
      `orphanDocument`
    );

    const previousOrphan = await prisma.orphanDocument
      .findUnique({ where: { id } })
      .orphan();
    const previousOrphanId = previousOrphan ? previousOrphan.id : undefined;
    const OrphanDocumentUpdateInput = {
      ...args,
      updated_at: new Date(),
      orphan: args.orphanId
        ? { connect: { id: parseInt(args.orphanId) } }
        : previousOrphanId
        ? { connect: { id: previousOrphanId } }
        : undefined
    };
    delete OrphanDocumentUpdateInput.orphanId;
    return await prisma.orphanDocument.update({
      where: { id },
      data: OrphanDocumentUpdateInput
    });
  }
  throw new AuthenticationError();
}

async function createHouse_property(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
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
  throw new AuthenticationError();
}

async function updateHouse_property(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
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
  throw new AuthenticationError();
}

async function createOrphanPhoto(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const OrphanPhotoCreateInput = {
      ...args,
      orphan: { connect: { id: parseInt(args.orphanId) } }
    };
    delete OrphanPhotoCreateInput.orphanId;
    return await prisma.orphanPhoto.create({
      data: OrphanPhotoCreateInput
    });
  }
  throw new AuthenticationError();
}

async function updateOrphanPhoto(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const id = parseInt(args.id);
    delete args.id;

    // update both(portait and long) photos
    await updateImage(
      prisma,
      id,
      args.photoPortraitUrl,
      `photoPortraitUrl`,
      `orphanPhoto`
    );
    await updateImage(
      prisma,
      id,
      args.photoLongUrl,
      `photoLongUrl`,
      `orphanPhoto`
    );

    const previousOrphan = await prisma.orphanPhoto
      .findUnique({ where: { id } })
      .orphan();
    const previousOrphanId = previousOrphan ? previousOrphan.id : undefined;
    const OrphanPhotoUpdateInput = {
      ...args,
      updated_at: new Date(),
      orphan: args.orphanId
        ? { connect: { id: parseInt(args.orphanId) } }
        : previousOrphanId
        ? { connect: { id: previousOrphanId } }
        : undefined
    };
    delete OrphanPhotoUpdateInput.orphanId;
    return await prisma.orphanPhoto.update({
      where: { id },
      data: OrphanPhotoUpdateInput
    });
  }
  throw new AuthenticationError();
}

async function createSponsorshipStatus(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const SponsorshipStatusCreateInput = {
      ...args,
      orphan: { connect: { id: parseInt(args.orphanId) } }
    };
    delete SponsorshipStatusCreateInput.orphanId;
    return await prisma.sponsorshipStatus.create({
      data: SponsorshipStatusCreateInput
    });
  }
  throw new AuthenticationError();
}

async function updateSponsorshipStatus(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const id = parseInt(args.id);
    delete args.id;

    const previousOrphan = await prisma.sponsorshipStatus
      .findUnique({ where: { id } })
      .orphan();
    const previousOrphanId = previousOrphan ? previousOrphan.id : undefined;
    const SponsorshipStatusUpdateInput = {
      ...args,
      updated_at: new Date(),
      orphan: args.orphanId
        ? { connect: { id: parseInt(args.orphanId) } }
        : previousOrphanId
        ? { connect: { id: previousOrphanId } }
        : undefined
    };
    delete SponsorshipStatusUpdateInput.orphanId;
    return await prisma.sponsorshipStatus.update({
      where: { id },
      data: SponsorshipStatusUpdateInput
    });
  }
  throw new AuthenticationError();
}

async function createHealthStatus(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const HealthStatusCreateInput = {
      ...args,
      orphan: { connect: { id: parseInt(args.orphanId) } }
    };
    delete HealthStatusCreateInput.orphanId;
    return await prisma.healthStatus.create({
      data: HealthStatusCreateInput
    });
  }
  throw new AuthenticationError();
}

async function createOrphanLetter(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const OrphanLetterCreateInput = {
      ...args,
      orphan: { connect: { id: parseInt(args.orphanId) } }
    };
    delete OrphanLetterCreateInput.orphanId;
    return await prisma.orphanLetter.create({
      data: OrphanLetterCreateInput
    });
  }
  throw new AuthenticationError();
}

async function createProject(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const supportPlansIds = args.supportPlans
      ? [...args.supportPlans].map((val) => ({ id: parseInt(val) }))
      : [];
    const coordinatorsIds = args.coordinators
      ? [...args.coordinators].map((val) => ({ id: parseInt(val) }))
      : [];
    const projectDocumentsIds = args.projectDocuments
      ? [...args.projectDocuments].map((val) => ({ id: parseInt(val) }))
      : [];
    const incomeGeneratingActivitiesIds = args.incomeGeneratingActivities
      ? [...args.incomeGeneratingActivities].map((val) => ({
          id: parseInt(val)
        }))
      : [];
    const locationIds = args.location
      ? [...args.location].map((val) => ({ id: parseInt(val) }))
      : [];
    const ProjectCreateInput = {
      ...args,
      supportPlans: { connect: supportPlansIds },
      coordinators: { connect: coordinatorsIds },
      projectDocuments: { connect: projectDocumentsIds },
      incomeGeneratingActivities: { connect: incomeGeneratingActivitiesIds },
      location: { connect: locationIds }
    };
    return await prisma.project.create({
      data: ProjectCreateInput
    });
  }
  throw new AuthenticationError();
}

async function createProjectWithProposal(
  _parent,
  args,
  { prisma, req },
  _info
) {
  if (getUser(req).userId) {
    /*
    const supportPlansIds = args.supportPlans
      ? [...args.supportPlans].map((val) => ({ id: parseInt(val) }))
      : [];
        */
const coordinatorsIds = args.coordinators
      ? [...args.coordinators].map((val) => ({ id: parseInt(val) }))
      : [];

    const locationIds = args.location
      ? [...args.location].map((val) => ({ id: parseInt(val) }))
      : [];
    const ProjectCreateInput = {
      ...args,
      // supportPlans: { connect: supportPlansIds },
      coordinators: { connect: coordinatorsIds },
      projectDocuments: {
        create: {
          documentType: "proposal",
          documentUrl: args.proposalUrl
        }
      },
      location: { connect: locationIds }
    };
    delete ProjectCreateInput.proposalUrl;
    return await prisma.project.create({
      data: ProjectCreateInput
    });
  }
  throw new AuthenticationError();
}

async function updateProject(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const { id } = args;
    const locationIds = args.location
      ? [...args.location].map((val) => ({ id: parseInt(val) }))
      : [];
    const ProjectUpdateInput = {
      ...args,
      location: { connect: locationIds }
    };
    delete ProjectUpdateInput.id;
    return await prisma.project.update({
      where: { id: parseInt(id) },
      data: ProjectUpdateInput
    });
  }
  throw new AuthenticationError();
}

async function createProjectDocument(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const ProjectDocumentCreateInput = {
      ...args,
      project: { connect: { id: parseInt(args.projectId) } }
    };
    delete ProjectDocumentCreateInput.projectId;
    return await prisma.projectDocument.create({
      data: ProjectDocumentCreateInput
    });
  }
  throw new AuthenticationError();
}

async function updateProjectDocument(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const id = parseInt(args.id);
    delete args.id;

    const previousProject = await prisma.projectDocument
      .findUnique({ where: { id } })
      .project();
    const previousProjectId = previousProject ? previousProject.id : undefined;
    const ProjectDocumentUpdateInput = {
      ...args,
      project: args.projectId
        ? { connect: { id: parseInt(args.projectId) } }
        : previousProjectId
        ? { connect: { id: previousProjectId } }
        : undefined
    };
    delete ProjectDocumentUpdateInput.projectId;
    return await prisma.projectDocument.update({
      where: { id: parseInt(id) },
      data: ProjectDocumentUpdateInput
    });
  }
  throw new AuthenticationError();
}

async function createIncomeGeneratingActivity(
  _parent,
  args,
  { prisma, req },
  _info
) {
  if (getUser(req).userId) {
    const photoURLs = args.photos
      ? args.photos.map((val) => ({
          photoUrl: val.photoUrl
        }))
      : [];

    const IncomeGeneratingActivityCreateInput = {
      ...args,
      project: { connect: { id: parseInt(args.projectId) } },
      photos: {
        createMany: { data: [...photoURLs] }
      }
    };
    delete IncomeGeneratingActivityCreateInput.projectId;
    return await prisma.incomeGeneratingActivity.create({
      data: IncomeGeneratingActivityCreateInput
    });
  }
  throw new AuthenticationError();
}

async function createIncomeGeneratingActivityPhoto(
  _parent,
  args,
  { prisma, req },
  _info
) {
  if (getUser(req).userId) {
    const IncomeGeneratingActivityPhotoCreateInput = {
      ...args,
      incomeGeneratingActivity: {
        connect: { id: parseInt(args.incomeGeneratingActivityId) }
      }
    };
    delete IncomeGeneratingActivityPhotoCreateInput.incomeGeneratingActivityId;
    return await prisma.incomeGeneratingActivityPhoto.create({
      data: IncomeGeneratingActivityPhotoCreateInput
    });
  }
  throw new AuthenticationError();
}

async function createPayment(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const PaymentCreateInput = {
      ...args,
      supportPlan: { connect: { id: parseInt(args.supportPlanId) } }
    };
    delete PaymentCreateInput.supportPlanId;
    return await prisma.payment.create({
      data: PaymentCreateInput
    });
  }
  throw new AuthenticationError();
}

async function createIndividualPayment(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const IndividualPaymentCreateInput = {
      ...args,
      orphan: { connect: { id: parseInt(args.orphanId) } },
      payment: { connect: { id: parseInt(args.paymentId) } }
    };
    delete IndividualPaymentCreateInput.orphanId;
    delete IndividualPaymentCreateInput.paymentId;
    return await prisma.individualPayment.create({
      data: IndividualPaymentCreateInput
    });
  }
  throw new AuthenticationError();
}

async function createSupportPlan(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const orphansIds = args.orphans
      ? [...args.orphans].map((val) => ({ id: parseInt(val) }))
      : [];
    const paymentsIds = args.payments
      ? [...args.payments].map((val) => ({ id: parseInt(val) }))
      : [];

    const SupportPlanCreateInput = {
      ...args,
      donor: args.donorId
        ? { connect: { id: parseInt(args.donorId) } }
        : undefined,
      project: args.projectId
        ? { connect: { id: parseInt(args.projectId) } }
        : undefined,
      orphans: { connect: orphansIds },
      payments: { connect: paymentsIds }
    };
    delete SupportPlanCreateInput.donorId;
    delete SupportPlanCreateInput.projectId;

    return await prisma.supportPlan.create({
      data: SupportPlanCreateInput
    });
  }
  throw new AuthenticationError();
}

async function updateSupportPlan(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const id = parseInt(args.id);
    delete args.id;

    const orphansIds = args.orphans
      ? [...args.orphans].map((val) => ({ id: parseInt(val) }))
      : [];
    const paymentsIds = args.payments
      ? [...args.payments].map((val) => ({ id: parseInt(val) }))
      : [];

    const previousDonor = await prisma.supportPlan
      .findUnique({ where: { id } })
      .donor();
    const previousDonorId = previousDonor ? previousDonor.id : undefined;

    const previousProject = await prisma.supportPlan
      .findUnique({ where: { id } })
      .project();
    const previousProjectId = previousProject ? previousProject.id : undefined;

    const SupportPlanUpdateInput = {
      ...args,
      updated_at: new Date(),
      donor: args.donorId
        ? { connect: { id: parseInt(args.donorId) } }
        : previousDonorId
        ? { connect: { id: previousDonorId } }
        : undefined,
      project: args.projectId
        ? { connect: { id: parseInt(args.projectId) } }
        : previousProjectId
        ? { connect: { id: previousProjectId } }
        : undefined,
      orphans: { connect: orphansIds },
      payments: { connect: paymentsIds }
    };
    delete SupportPlanUpdateInput.donorId;
    delete SupportPlanUpdateInput.projectId;

    return await prisma.supportPlan.update({
      where: { id },
      data: SupportPlanUpdateInput
    });
  }
  throw new AuthenticationError();
}

async function createHead(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const HeadCreateInput = {
      ...args,
      user: args.userId ? { connect: { id: parseInt(args.userId) } } : undefined
    };
    delete HeadCreateInput.userId;
    return await prisma.head.create({
      data: HeadCreateInput
    });
  }
  throw new AuthenticationError();
}

async function updateHead(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const id = parseInt(args.id);
    delete args.id;

    const previousUser = await prisma.head.findUnique({ where: { id } }).user();
    const previousUserId = previousUser ? previousUser.id : undefined;
    const HeadUpdateInput = {
      ...args,
      updated_at: new Date(),
      user: args.userId
        ? { connect: { id: parseInt(args.userId) } }
        : previousUserId
        ? { connect: { id: previousUserId } }
        : undefined
    };
    delete HeadUpdateInput.userId;
    return await prisma.head.update({
      where: { id },
      data: HeadUpdateInput
    });
  }
  throw new AuthenticationError();
}

async function createCoordinator(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const CoordinatorCreateInput = {
      ...args,
      user: { connect: { id: parseInt(args.userId) } }
    };
    delete CoordinatorCreateInput.userId;
    return await prisma.coordinator.create({
      data: CoordinatorCreateInput
    });
  }
  throw new AuthenticationError();
}

async function updateCoordinator(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const id = parseInt(args.id);
    delete args.id;

    const donorsIds = args.donors
      ? [...args.donors].map((val) => ({ id: parseInt(val) }))
      : [];

    const previousUser = await prisma.coordinator
      .findUnique({ where: { id } })
      .user();
    const previousUserId = previousUser ? previousUser.id : undefined;
    const CoordinatorUpdateInput = {
      ...args,
      updated_at: new Date(),
      user: args.userId
        ? { connect: { id: parseInt(args.userId) } }
        : previousUserId
        ? { connect: { id: previousUserId } }
        : undefined,
      villages: { connect: villagesIds },
      districts: { connect: districtsIds },
      donors: { connect: donorsIds }
    };
    delete CoordinatorUpdateInput.userId;

    return await prisma.coordinator.update({
      where: { id },
      data: CoordinatorUpdateInput
    });
  }
  throw new AuthenticationError();
}

async function createUser(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const coordinatorsIds = args.coordinators
      ? [...args.coordinators].map((val) => ({ id: parseInt(val) }))
      : [];
    const headsIds = args.heads
      ? [...args.heads].map((val) => ({ id: parseInt(val) }))
      : [];
    const socialWorkersIds = args.socialworkers
      ? [...args.socialworkers].map((val) => ({ id: parseInt(val) }))
      : [];
    const donorsIds = args.donors
      ? [...args.donors].map((val) => ({ id: parseInt(val) }))
      : [];
    return await prisma.user.create({
      data: {
        ...args,
        heads: { connect: headsIds },
        socialworkers: { connect: socialWorkersIds },
        donors: { connect: donorsIds },
        coordinators: { connect: coordinatorsIds }
      }
    });
  }
  throw new AuthenticationError();
}

async function updateUser(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const id = parseInt(args.id);
    delete args.id;
    const hashedPassword = await bcrypt.hash(args.password, 10);

    return await prisma.user.update({
      where: { id },
      data: {
        role: args.role,
        email: args.email ? String(args.email).toLowerCase() : undefined,
        password: hashedPassword,
        updated_at: new Date()
      }
    });
  }
  throw new AuthenticationError();
}

async function register(
  _parent,
  { role, email, password },
  { req, prisma },
  _info
) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { role, email: String(email).toLowerCase(), password: hashedPassword }
  });
  req.session.userId = user.id;
  req.session.userRole = user.role;
  return {
    user
  };
}

async function login(_parent, { email, password }, { req, prisma }, _info) {
  const user = await prisma.user.findUnique({
    where: { email: String(email).toLowerCase() }
  });
  if (!user) {
    throw new Error(`No such user found for email: ${email}`);
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error(`Invalid password`);
  }
  req.session.userId = user.id;
  req.session.userRole = user.role;
  return {
    user
  };
}

function logout(_parent, _args, { req }, _info) {
  return new Promise((res) =>
    req.session.destroy((err) => {
      if (err) {
        console.log("logout err: ", err);
      }
      res(true);
    })
  );
}

async function createAccountMaintainence(_parent, args, { prisma }, _info) {
  return await prisma.accountMaintainence.create({ data: { ...args } });
}

async function updateAccountMaintainence(
  _parent,
  args,
  { prisma, req },
  _info
) {
  if (getUser(req).userId) {
    if (getUser(req).userRole === "Head") {
      const id = parseInt(args.id);
      delete args.id;
      return await prisma.accountMaintainence.update({
        where: { id },
        data: { ...args, updated_at: new Date() }
      });
    }
    throw new AuthorizationError();
  }
  throw new AuthenticationError();
}

module.exports = {
  createDonor,
  updateDonor,
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

  createOrphanWithBaselineData,

  updateOrphan,
  createSocialWorker,
  updateSocialWorker,
  createEducationalRecord,
  updateEducationalRecord,
  createFinancialRecord,
  updateFinancialRecord,
  createOrphanDocument,
  updateOrphanDocument,
  createHouse_property,
  updateHouse_property,
  createOrphanPhoto,
  updateOrphanPhoto,
  createSponsorshipStatus,
  updateSponsorshipStatus,

  createHealthStatus,
  createOrphanLetter,

  createProject,
  createProjectWithProposal,
  updateProject,
  createProjectDocument,
  updateProjectDocument,
  createIncomeGeneratingActivity,
  createIncomeGeneratingActivityPhoto,
  createPayment,
  createIndividualPayment,

  createSupportPlan,
  updateSupportPlan,
  createHead,
  updateHead,
  createCoordinator,
  updateCoordinator,
  createUser,
  updateUser,
  register,
  login,
  logout,
  createAccountMaintainence,
  updateAccountMaintainence
};
