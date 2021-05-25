const bcrypt = require("bcryptjs");
const { getUser, AuthenticationError, updateImage } = require("../utils");

async function createDonor(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
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

    const DonorCreateInput = {
      ...args,
      coordinator: args.coordinatorId
        ? { connect: { id: parseInt(args.coordinatorId) } }
        : undefined,
      user: args.userId
        ? { connect: { id: parseInt(args.userId) } }
        : undefined,

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
      user: args.userId
        ? { connect: { id: parseInt(args.userId) } }
        : previousUserId
        ? { connect: { id: previousUserId } }
        : undefined,

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

async function createEducation(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
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
  throw new AuthenticationError();
}

async function updateEducation(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
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

    /** TODO @implement delete file logic */

    /** delete file logic for guardianIDCard */
    // if (args.guardianIDCardUrl) {
    //   console.log(`1. Inside first if()`);
    //   const previousGuardian = await prisma.guardian.findUnique({
    //     where: { id }
    //   });
    //   if (previousGuardian) {
    //     console.log(`2. Inside second if()`);
    //     // throw new ApolloError('Indside second if()', 'TEST_ERROR')
    //     console.log(
    //       `2.1 Did the IDCardUrl change? ${
    //         previousGuardian.guardianIDCardUrl !== args.guardianIDCardUrl
    //       }`
    //     );
    //     try {
    //       if (fs.statSync(args.guardianIDCardUrl))
    //         console.log(`new file exists`);
    //     } catch (err) {
    //       if (err.code === "ENOENT") {
    //         throw new ApolloError(`file ${args.guardianIDCardUrl} not found`, `FILE_NOT_FOUND`);
    //       }
    //       console.log(err);
    //     }
    //     // else
    //     // fs.stat(args.guardianIDCardUrl, (err, stat) => {
    //     //   if (!err) {
    //     //     console.log(`file exists`);
    //     //   }
    //     //   throw new ApolloError(
    //     //     `${args.guardianIDCardUrl} not found, ${err}`,
    //     //     `FILE_NOT_FOUND`
    //     //   );
    //     // });
    //     // todo ==separator==
    //     // if (previousGuardian.guardianIDCardUrl !== args.guardianIDCardUrl) {
    //     //   console.log(`3. Inside third if()`);
    //     //   fs.stat
    //     // }
    //   } else
    //     throw new ApolloError(
    //       `Guardian with id ${id} is not found`,
    //       `RECORD_NOT_FOUND`
    //     );
    // }

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
    const zonesIds = args.zones
      ? [...args.zones].map((val) => ({ id: parseInt(val) }))
      : [];
    return await prisma.region.create({
      data: {
        ...args,
        zones: {
          connect: zonesIds
        }
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
    const districtsIds = args.districts
      ? [...args.districts].map((val) => ({ id: parseInt(val) }))
      : [];
    const ZoneCreateInput = {
      ...args,
      districts: {
        connect: districtsIds
      },
      region: args.regionId
        ? { connect: { id: parseInt(args.regionId) } }
        : undefined
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
    const villageIds = args.villages
      ? [...args.villages].map((val) => ({
          id: parseInt(val)
        }))
      : [];
    const socialWorkersIds = args.socialWorkers
      ? [...args.socialWorkers].map((val) => ({
          id: parseInt(val)
        }))
      : [];
    const donorsIds = args.donors
      ? [...args.donors].map((val) => ({
          id: parseInt(val)
        }))
      : [];

    const DistrictCreateInput = {
      ...args,
      coordinator: args.coordinatorId
        ? {
            connect: {
              id: parseInt(args.coordinatorId)
            }
          }
        : undefined,
      zone: args.zoneId
        ? {
            connect: { id: parseInt(args.zoneId) }
          }
        : undefined,
      villages: {
        connect: villageIds
      },
      socialWorkers: {
        connect: socialWorkersIds
      },
      donors: {
        connect: donorsIds
      }
    };
    delete DistrictCreateInput.coordinatorId;
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
    const orphansIds = args.orphans
      ? [...args.orphans].map((val) => ({
          id: parseInt(val)
        }))
      : [];

    const VillageCreateInput = {
      ...args,
      district: args.districtId
        ? { connect: { id: parseInt(args.districtId) } }
        : undefined,
      socialWorker: args.socialWorkerId
        ? { connect: { id: parseInt(args.socialWorkerId) } }
        : undefined,
      donor: args.donorId
        ? { connect: { id: parseInt(args.donorId) } }
        : undefined,
      coordinator: args.coordinatorId
        ? { connect: { id: parseInt(args.coordinatorId) } }
        : undefined,
      orphans: { connect: orphansIds }
    };
    delete VillageCreateInput.districtId;
    delete VillageCreateInput.socialWorkerId;
    delete VillageCreateInput.donorId;
    delete VillageCreateInput.coordinatorId;

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

    const previousCoordinator = await prisma.village
      .findUnique({ where: { id } })
      .coordinator();
    const previousCoordinatorId = previousCoordinator
      ? previousCoordinator.id
      : undefined;

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

    const previousDonor = await prisma.village
      .findUnique({ where: { id } })
      .donor();
    const previousDonorId = previousDonor ? previousDonor.id : undefined;

    const orphansIds = args.orphans
      ? [...args.orphans].map((val) => ({
          id: parseInt(val)
        }))
      : [];
    const VillageUpdateInput = {
      ...args,
      updated_at: new Date(),
      coordinator: args.coordinatorId
        ? { connect: { id: parseInt(args.coordinatorId) } }
        : previousCoordinatorId
        ? { connect: { id: previousCoordinatorId } }
        : undefined,
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
      donor: args.donorId
        ? { connect: { id: parseInt(args.donorId) } }
        : previousDonorId
        ? { connect: { id: previousDonorId } }
        : undefined,
      orphans: { connect: orphansIds }
    };
    delete VillageUpdateInput.districtId;
    delete VillageUpdateInput.socialWorkerId;
    delete VillageUpdateInput.donorId;
    delete VillageUpdateInput.coordinatorId;

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
      args.thankyouLetterUrl,
      `thankyouLetterUrl`,
      `orphan`
    );
    await updateImage(
      prisma,
      id,
      args.birthCertificateUrl,
      `birthCertificateUrl`,
      `orphan`
    );

    const previousDonor = await prisma.orphan
      .findUnique({ where: { id } })
      .donor();
    const previousDonorId = previousDonor ? previousDonor.id : undefined;

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

    const previousVillage = await prisma.orphan
      .findUnique({ where: { id } })
      .village();
    const previousVillageId = previousVillage ? previousVillage.id : undefined;

    const previousSocialWorker = await prisma.orphan
      .findUnique({ where: { id } })
      .socialWorker();
    const previousSocialWorkerId = previousSocialWorker
      ? previousSocialWorker.id
      : undefined;

    const previousEducation = await prisma.orphan
      .findUnique({ where: { id } })
      .education();
    const previousEducationId = previousEducation
      ? previousEducation.id
      : undefined;

    const previousSupportPlan = await prisma.orphan
      .findUnique({ where: { id } })
      .supportPlan();
    const previousSupportPlanId = previousSupportPlan
      ? previousSupportPlan.id
      : undefined;

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
    const OrphanUpdateInput = {
      ...args,
      updated_at: new Date(),
      donor: args.donorId
        ? { connect: { id: parseInt(args.donorId) } }
        : previousDonorId
        ? { connect: { id: previousDonorId } }
        : undefined,
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
      village: args.villageId
        ? { connect: { id: parseInt(args.villageId) } }
        : previousVillageId
        ? { connect: { id: previousVillageId } }
        : undefined,
      socialWorker: args.socialWorkerId
        ? { connect: { id: parseInt(args.socialWorkerId) } }
        : previousSocialWorkerId
        ? { connect: { id: previousSocialWorkerId } }
        : undefined,
      supportPlan: args.supportPlanId
        ? { connect: { id: parseInt(args.supportPlanId) } }
        : previousSupportPlanId
        ? { connect: { id: previousSupportPlanId } }
        : undefined,
      education: args.educationId
        ? { connect: { id: parseInt(args.educationId) } }
        : previousEducationId
        ? { connect: { id: previousEducationId } }
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
    delete OrphanUpdateInput.donorId;
    delete OrphanUpdateInput.fatherId;
    delete OrphanUpdateInput.guardianId;
    delete OrphanUpdateInput.house_propertyId;
    delete OrphanUpdateInput.motherId;
    delete OrphanUpdateInput.villageId;
    delete OrphanUpdateInput.socialWorkerId;
    delete OrphanUpdateInput.supportPlanId;
    delete OrphanUpdateInput.educationId;
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

    const previousUser = await prisma.socialWorker
      .findUnique({ where: { id } })
      .user();
    const previousUserId = previousUser ? previousUser.id : undefined;

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
      user: args.userId
        ? { connect: { id: parseInt(args.userId) } }
        : previousUserId
        ? { connect: { id: previousUserId } }
        : undefined,
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
      education: args.educationId
        ? { connect: { id: parseInt(args.educationId) } }
        : undefined
    };
    delete EducationalRecordCreateInput.educationId;
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

    const previousEducation = await prisma.educationalRecord
      .findUnique({ where: { id } })
      .education();
    const previousEducationId = previousEducation
      ? previousEducation.id
      : undefined;
    const EducationalRecordUpdateInput = {
      ...args,
      updated_at: new Date(),
      education: args.educationId
        ? { connect: { id: parseInt(args.educationId) } }
        : previousEducationId
        ? { connect: { id: previousEducationId } }
        : undefined
    };
    delete EducationalRecordUpdateInput.educationId;
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
      orphan: args.orphanId
        ? { connect: { id: parseInt(args.orphanId) } }
        : undefined
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

async function createHealthRecord(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const HealthRecordCreateInput = {
      ...args,
      orphan: args.orphanId
        ? { connect: { id: parseInt(args.orphanId) } }
        : undefined
    };
    delete HealthRecordCreateInput.orphanId;
    return await prisma.healthRecord.create({
      data: HealthRecordCreateInput
    });
  }
  throw new AuthenticationError();
}

async function updateHealthRecord(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const id = parseInt(args.id);
    delete args.id;

    // update medical cerificate
    await updateImage(
      prisma,
      id,
      args.medicalCerificateUrl,
      `medicalCerificateUrl`,
      `healthRecord`
    );

    const previousOrphan = await prisma.healthRecord
      .findUnique({ where: { id } })
      .orphan();
    const previousOrphanId = previousOrphan ? previousOrphan.id : undefined;
    const HealthRecordUpdateInput = {
      ...args,
      updated_at: new Date(),
      orphan: args.orphanId
        ? { connect: { id: parseInt(args.orphanId) } }
        : previousOrphanId
        ? { connect: { id: previousOrphanId } }
        : undefined
    };
    delete HealthRecordUpdateInput.orphanId;
    return await prisma.healthRecord.update({
      where: { id },
      data: HealthRecordUpdateInput
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

async function createOrphanPhotos(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const OrphanPhotosCreateInput = {
      ...args,
      orphan: args.orphanId
        ? { connect: { id: parseInt(args.orphanId) } }
        : undefined
    };
    delete OrphanPhotosCreateInput.orphanId;
    return await prisma.orphanPhotos.create({
      data: OrphanPhotosCreateInput
    });
  }
  throw new AuthenticationError();
}

async function updateOrphanPhotos(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const id = parseInt(args.id);
    delete args.id;

    // update both(portait and long) photos
    await updateImage(
      prisma,
      id,
      args.photoPortraitUrl,
      `photoPortraitUrl`,
      `orphanPhotos`
    );
    await updateImage(
      prisma,
      id,
      args.photoLongUrl,
      `photoLongUrl`,
      `orphanPhotos`
    );

    const previousOrphan = await prisma.orphanPhotos
      .findUnique({ where: { id } })
      .orphan();
    const previousOrphanId = previousOrphan ? previousOrphan.id : undefined;
    const OrphanPhotosUpdateInput = {
      ...args,
      updated_at: new Date(),
      orphan: args.orphanId
        ? { connect: { id: parseInt(args.orphanId) } }
        : previousOrphanId
        ? { connect: { id: previousOrphanId } }
        : undefined
    };
    delete OrphanPhotosUpdateInput.orphanId;
    return await prisma.orphanPhotos.update({
      where: { id },
      data: OrphanPhotosUpdateInput
    });
  }
  throw new AuthenticationError();
}

async function createSponsorshipStatus(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const SponsorshipStatusCreateInput = {
      ...args,
      orphan: args.orphanId
        ? { connect: { id: parseInt(args.orphanId) } }
        : undefined
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

async function createSupportPlan(_parent, args, { prisma, req }, _info) {
  if (getUser(req).userId) {
    const orphansIds = args.orphans
      ? [...args.orphans].map((val) => ({ id: parseInt(val) }))
      : [];

    const SupportPlanCreateInput = {
      ...args,
      donor: args.donorId
        ? { connect: { id: parseInt(args.donorId) } }
        : undefined,
      orphans: { connect: orphansIds }
    };
    delete SupportPlanCreateInput.donorId;

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

    const previousDonor = await prisma.supportPlan
      .findUnique({ where: { id } })
      .donor();
    const previousDonorId = previousDonor ? previousDonor.id : undefined;

    const SupportPlanUpdateInput = {
      ...args,
      updated_at: new Date(),
      donor: args.donorId
        ? { connect: { id: parseInt(args.donorId) } }
        : previousDonorId
        ? { connect: { id: previousDonorId } }
        : undefined,
      orphans: { connect: orphansIds }
    };
    delete SupportPlanUpdateInput.donorId;

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
    const villagesIds = args.villages
      ? [...args.villages].map((val) => ({ id: parseInt(val) }))
      : [];
    const districtsIds = args.district
      ? [...args.districts].map((val) => ({ id: parseInt(val) }))
      : [];
    const donorsIds = args.donors
      ? [...args.donors].map((val) => ({ id: parseInt(val) }))
      : [];
    const CoordinatorCreateInput = {
      ...args,
      user: args.userId
        ? { connect: { id: parseInt(args.userId) } }
        : undefined,
      villages: { connect: villagesIds },
      districts: { connect: districtsIds },
      donors: { connect: donorsIds }
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

    const villagesIds = args.villages
      ? [...args.villages].map((val) => ({ id: parseInt(val) }))
      : [];
    const districtsIds = args.districts
      ? [...args.districts].map((val) => ({ id: parseInt(val) }))
      : [];
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

    return await prisma.user.update({
      where: { id },
      data: {
        ...args,
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
    data: { role, email, password: hashedPassword }
  });
  req.session.userId = user.id;
  req.session.userRole = user.role;
  return {
    user
  };
}

async function login(_parent, { email, password }, { req, prisma }, _info) {
  const user = await prisma.user.findUnique({
    where: { email }
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
  updateUser,
  register,
  login,
  logout
};
