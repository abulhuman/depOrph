async function createOrphanOnly(parent, args, context, info) {
  const newOrphan = await context.prisma.orphan.create({
    data: {
      firstName, fatherName, grandFatherName, greatGrandFatherName,
      gender, placeOfBirth, dateOfBirth, numberOfSponserdSiblings,
      physicalHealthStatus, psychologicalHealthStatus,
      otherHealthIssues, photoPortraitUrl, photoLongUrl,
    } = args,
  });

  return newOrphan;
}

async function createSiteWithAddress(parent, args, context, info) {
  return context.prisma.site.create({
    data: {
      siteName: args.siteName,
      donationAmount: args.donationAmount,
      address: {
        create: {
          state, zone, district, kebele
        } = args.address,
      },
    },
  });
}

async function createOrphanWithAllDetails(parent, args, context, info) {
  console.log(args.groupoforphans.site.address);
  const newOrphan = await context.prisma.orphan.create({
    data: {
      firstName: args.firstName,
      fatherName: args.fatherName,
      grandFatherName: args.grandFatherName,
      greatGrandFatherName: args.greatGrandFatherName,
      gender: args.gender,
      placeOfBirth: args.placeOfBirth,
      dateOfBirth: args.dateOfBirth,
      numberOfSponserdSiblings: args.numberOfSponserdSiblings,
      physicalHealthStatus: args.physicalHealthStatus,
      psychologicalHealthStatus: args.psychologicalHealthStatus,
      otherHealthIssues: args.otherHealthIssues,
      photoPortraitUrl: args.photoPortraitUrl,
      photoLongUrl: args.photoLongUrl,
      iga_property: {
        create: {
          ownershipStatus, otherProperty,
        } = args.iga_property
      },
      education: {
        create: {
          enrollmentStatus, schoolName, typeOfSchool,
          grade, reason, hobbies,
        } = args.education
      },
      father: {
        create: {
          dateOfDeath, causeOfDeath, job, monthlyIncome, dateOfBirth,
        } = args.father
      },
      groupoforphans: {
        create: {
          registrationDate: args.groupoforphans.registrationDate,
          donor: {
            create: {
              companyName,
              typeOfsupport,
              initialDonationAmount,
              initialReportPreparationDate,
              finalReportPreparationDate,
              initialDataCollectionDate,
              finalDataCollectionDate,
              reportDueDate,
            } = args.groupoforphans.donor,
          }, socialworker: {
            create: {
              fullName,
              phoneNumber,
              email
            } = args.groupoforphans.socialWorker,
          },
          site: {
            create: {
              address: {
                create: {
                  state: args.groupoforphans.site.address.state,
                  zone: args.groupoforphans.site.address.zone,
                  district: args.groupoforphans.site.address.district,
                  kebele: args.groupoforphans.site.address.kebele,
                },
              },
              siteName: args.groupoforphans.site.siteName,
              donationAmount: args.groupoforphans.site.donationAmount,
            },
          },
        },
      },
      guardian: {
        create: {
          firstName, middleName, lastName, gender, nationality,
          state, zone, district, kebele, relationToOrphan,
          email, job, age
        } = args.guardian
      },
      mother: {
        create: {
          firstName: args.mother.firstName,
          middleName: args.mother.middleName,
          lastName: args.mother.lastName,
          dateOfBirth: args.mother.dateOfBirth,
          phoneNumber: args.mother.phoneNumber,
          maritalStatus: args.mother.maritalStatus,
          vitalStatus: args.mother.vitalStatus,
          monthlyExpense: args.mother.monthlyExpense,
          motherjob: {
            create: {
              currentJobTitle, monthlyIncome
            } = args.mother.motherjob
          }
        }
      },
    },
  },

  );

  return newOrphan;
}

async function createIga_property(parent, args, context, info) {
  const newIga_property = await context.prisma.iga_property.create({
    data: { ownershipStatus, otherProperty, } = args,
  });
  return newIga_property;
}

async function createEducation(parent, args, context, info) {
  const newEducation = await context.prisma.education.create({
    data: {
      enrollmentStatus, schoolName, typeOfSchool,
      grade, reason, hobbies,
    } = args,
  });
  return newEducation;
}

async function createFather(parent, args, context, info) {

  const newFather = await context.prisma.father.create({
    data: { dateOfDeath, causeOfDeath, job, monthlyIncome, dateOfBirth, } = args,
  })
  return newFather;

}

async function createSibling(parent, args, context, info) {
  const newSibling = await context.prisma.sibling.create({
    data: { fullName, gender, age, schoolGrade, job, maritalStatus, } = args,
  })
  return newSibling;
}

async function createGuardian(parent, args, context, info) {
  const newGuardian = await context.prisma.guardian.create({
    data: {
      firstName, middleName, lastName, gender, nationality,
      state, zone, district, kebele, relationToOrphan,
      email, job, age
    } = args,
  })
  return newGuardian;
}

async function createMotherJob(parent, args, context, info) {
  const newMotherJob = await context.prisma.motherJob.create({
    data: { currentJobTitle, monthlyIncome, } = args,
  });
  return newMotherJob
}

async function createMother(parent, args, context, info) {
  const newMother = await context.prisma.mother.create({
    data: {
      firstName, middleName, lastName, dateOfBirth,
      phoneNumber, job, maritalStatus, vitalStatus,
      monthlyExpense,
    } = args,
  });
  return newMother;
}

async function createDonor(parent, args, context, info) {
  const newDonor = await context.prisma.donor.create({
    data: {
      companyName,
      typeOfsupport,
      initialDonationAmount,
      initialReportPreparationDate,
      finalReportPreparationDate,
      initialDataCollectionDate,
      finalDataCollectionDate,
      reportDueDate,
    } = args,
  })
  return newDonor;
}

async function createAddress(parent, args, context, info) {
  const newAddress = await context.prisma.address.create({
    data: {
      state,
      zone,
      district,
      kebele,
    } = args,
  });
  return newAddress
}

async function createSite(parent, args, context, info) {
  const newSite = await context.prisma.site.create({
    data: { siteName, donationAmount } = args,
  })
  return newSite;
}

async function createSocialWorker(parent, args, context, info) {
  const newSocialWorker = await context.prisma.socialWorker.create({
    data: {
      fullName,
      phoneNumber,
      email,
    } = args,
  })
  return newSocialWorker;
}

async function createGroupOfOrphans(parent, args, context, info) {
  const newGroupOfOrphans = await context.prisma.groupOfOrphans.create({
    data: { registrationDate } = args,
  })
  return newGroupOfOrphans;
}

module.exports = {
  createOrphanOnly,
  createSiteWithAddress,
  createOrphanWithAllDetails,
  createIga_property,
  createEducation,
  createFather,
  createSibling,
  createGuardian,
  createMotherJob,
  createMother,
  createDonor,
  createAddress,
  createSite,
  createSocialWorker,
  createGroupOfOrphans,
};

