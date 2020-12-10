
async function createOrphan(parent, args, context, info) {
  const siblingIds = args.siblings ? [...(args.siblings)].map((val)=>({id: Number(val)})) : undefined;
  const newOrphan = await context.prisma.orphan.create({
    data: {
      firstName: args.firstName,
      fatherName: args.fatherName,
      grandFatherName: args.grandFatherName,
      greatGrandFatherName: args.greatGrandFatherName,
      gender: args.gender,
      placeOfBirth: args.placeOfBirth,
      dateOfBirth: args.dateOfBirth,
      clan: args.clan,
      spokenLanguages: args.spokenLanguages,
      numberOfSponserdSiblings: args.numberOfSponserdSiblings,
      physicalHealthStatus: args.physicalHealthStatus,
      psychologicalHealthStatus: args.psychologicalHealthStatus,
      otherHealthIssues: args.otherHealthIssues,
      hobbies: args.hobbies,
      sponsorshipStatus: args.sponsorshipStatus,
      iga_property: args.iga_property ? {
        connect: {
          id: Number(args.iga_property)
        },
      } : undefined,
      officialdocuments: args.officialdocuments ? {
        connect: {
          id: Number(args.officialdocuments)
        },
      } : undefined,
      education: args.education ? {
        connect: {
          id: Number(args.education)
        },
      } : undefined,
      father: args.father ? {
        connect: {
          id: Number(args.father)
        },
      } : undefined,
      guardian: args.guardian ? {
        connect: {
          id: Number(args.guardian)
        },
      } : undefined,
      mother: args.mother ? {
        connect: {
          id: Number(args.mother)
        },
      } : undefined,
      donor: args.donor ? {
        connect: {
          id: Number(args.donor)
        },
      } : undefined,
      site: args.site ? {
        connect: {
          id: Number(args.site)
        },
      } : undefined,
      sponsoredgroup: args.sponsoredgroup ? {
        connect: {
          id: Number(args.sponsoredgroup)
        },
      } : undefined,
      siblings :{
        connect: [
          ...siblingIds
      ], 
      }

    },

  });

  return newOrphan;
}

async function createIga_property(parent, args, context, info) {
  const newIga_property = await context.prisma.iga_property.create({
    data: {
      ownershipStatus: args.ownershipStatus,
      otherProperty: args.otherProperty,
      orphan: {
        connect: {
          id: Number(args.orphan),
        }
      }
    },
  });
  return newIga_property;
}

async function createEducation(parent, args, context, info) {
  const newEducation = await context.prisma.education.create({
    data: {
      enrollmentStatus: args.enrollmentStatus,
      schoolName: args.schoolName ? args.schoolName : undefined,
      typeOfSchool: args.typeOfSchool ? args.typeOfSchool : undefined,
      year: args.year ? args.year : undefined,
      level: args.level ? args.level : undefined,
      reason: args.reason ? args.reason : undefined,
      orphan: {
        connect: {
          id: Number(args.orphan)
        },
      },
    },
  });
  return newEducation;
}

async function createFather(parent, args, context, info) {
  const ids = [...(args.orphans)].map((val)=>({id: Number(val)}));
  const newFather = await context.prisma.father.create({
    data: { 
      dateOfDeath: args.dateOfDeath, 
      causeOfDeath: args.causeOfDeath, 
      job: args.job, 
      monthlyIncome: args.monthlyIncome, 
      dateOfBirth: args.dateOfBirth,
      deathCertificateUrl: args.deathCertificateUrl,
      orphans: {
        connect: ids
      },
    },
  })
  return newFather;

}

async function createSibling(parent, args, context, info) {
  const newSibling = await context.prisma.sibling.create({
    data: { 
      fullName: args.fullName, 
      gender: args.gender, 
      age: args.age, 
      schoolGrade: args.schoolGrade, 
      job: args.job, 
      maritalStatus: args.maritalStatus,
      orphan: args.orphan ? {
        connect: {
          id: Number(args.orphan)
        }
      } : undefined,
    },
  })
  return newSibling;
}

async function createGuardian(parent, args, context, info) {
  const ids = [...(args.orphans)].map((val)=>({id: Number(val)}));
  const newGuardian = await context.prisma.guardian.create({
    data: {
      firstName: args.firstName, 
      middleName: args.middleName, 
      lastName: args.lastName, 
      gender: args.gender, 
      nationality: args.nationality,
      state: args.state, 
      zone: args.zone, 
      district: args.district, 
      kebele: args.kebele, 
      relationToOrphan: args.relationToOrphan,
      telephone: args.telephone,
      mobile: args.mobile,
      POBox: args.POBox,
      email: args.email, 
      job: args.job, 
      dateOfBirth: args.dateOfBirth,
      monthlyExpense: parseFloat(args.monthlyExpense),
      guardianIDCardUrl: args.guardianIDCardUrl,
      guardianConfirmationLetterUrl: args.guardianConfirmationLetterUrl,
      orphans: {
        connect: ids
      }
    },
  })
  return newGuardian;
}

async function createMotherJob(parent, args, context, info) {
  const newMotherJob = await context.prisma.motherJob.create({
    data: { 
      currentJobTitle: args.currentJobTitle, 
      monthlyIncome: parseFloat(args.monthlyIncome),
      initDate: args.initDate,
      termDate: args.termDate,
      mother: {
        connect: {
          id: Number(args.mother)
        }
      }
     },
  });
  return newMotherJob
}

async function createMother(parent, args, context, info) {
  const ids = [...(args.orphans)].map((val)=>({id: Number(val)}));
  const jobIds = [...(args.motherjob)].map((val)=>({id: Number(val)}));
  console.log(args.motherJob);
  const newMother = await context.prisma.mother.create({
    data: {
      firstName: args.firstName, 
      middleName: args.middleName, 
      lastName: args.lastName, 
      dateOfBirth: args.dateOfBirth,
      phoneNumber: args.phoneNumber,
      maritalStatus: args.maritalStatus, 
      vitalStatus: args.vitalStatus,
      dateOfDeath: args.dateOfDeath,
      causeOfDeath: args.causeOfDeath,
      monthlyExpense: args.monthlyExpense,
      motherjob: {
        connect: jobIds
      },
      orphans: {
        connect: ids
      }
    },
  });
  return newMother;
}

async function createOfficialDocuments(parent, args, context, info) {
  return await context.prisma.officialDocuments.create({
    data: {
      photoPortraitUrl: args.photoPortraitUrl,
      photoLongUrl: args.photoLongUrl,
      birthCertificateUrl: args.birthCertificateUrl,
      orphan: {
        connect: {
          id: Number(args.orphan)
        }
      },
    },
  })
}

async function createDonor(parent, args, context, info) {
  const GroupsIDs = [...(args.sponsoredgroups)].map((val)=>({id: Number(val)}));
  const newDonor = await context.prisma.donor.create({
    data: {
      companyName: args.companyName,
      initialReportPreparationDate: args.initialReportPreparationDate,
      finalReportPreparationDate: args.finalReportPreparationDate,
      initialDataCollectionDate: args.initialDataCollectionDate,
      finalDataCollectionDate: args.finalDataCollectionDate,
      reportDueDate: args.reportDueDate,
      sponsoredgroups: {
        connect: GroupsIDs,
      },
    },
  })
  return newDonor;
}

async function createSocialWorker(parent, args, context, info) {
  const newSocialWorker = await context.prisma.socialWorker.create({
    data: {
      fullName: args.fullName,
      phoneNumber: args.phoneNumber,
      email: args.email,
      sponsoredgroup: args.sponsoredgroup ? {
        connect: {
          id: Number(args.sponsoredgroup)
        }
      } : undefined,
    },
  })
  return newSocialWorker;
}

async function createSite(parent, args, context, info) {
  const ids = [...(args.orphans)].map((val)=>({id: Number(val)}));
  const sponsoredgroupsIds = [...(args.sponsoredgroups)].map((val)=>({id: Number(val)}));
  const newSite = await context.prisma.site.create({
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
     },
  })
  return newSite;
}

async function createSponsoredGroup(parent, args, context, info) {
  const orphansIds = args.orphans ? [...(args.orphans)].map((val)=>({id: Number(val)})) : undefined;
  const socialworkersIds =  args.socialworkers ? [...(args.socialworkers)].map((val)=>({id: Number(val)})): undefined;
  const newSponsoredGroup = await context.prisma.sponsoredGroup.create({
    data: { 
      sponsorshipDate: args.sponsorshipDate,
      donor: args.donor ? {
        connect : {
          id: Number(args.donor)
        },
      } : undefined,
      support: args.support ? {
        connect : {
          id: Number(args.support)
        },
      } : undefined,
      socialworkers:{
        connect: [
          ...socialworkersIds
        ]
      },
      orphans: {
        connect: orphansIds
      }
     },
  })
  return newSponsoredGroup;
}

async function createSupport(parent, args, context, info) {
  const newSupport = await context.prisma.support.create({
    data: { 
      status: args.status,
      sponsoredgroup: {
        connect: {
          id: Number(args.sponsoredgroup),
        },
      },
     },
  })
  return newSupport;
}


// async function createFinalcialSupport(parent, args, context, info) {
//   return await context.prisma.financialSupport.create({
//     data: args,
//   })
// }

// async function createEducationalSupport(parent, args, context, info) {
//   return await context.prisma.educationalSupport.create({
//     data: args,
//   })
// }

// async function createOtherSupport(parent, args, context, info) {
//   return await context.prisma.otherSupport.create({
//     data: args,
//   })
// }

module.exports = {
  createOrphan,
  createIga_property,
  createEducation,
  createFather,
  createSibling,
  createGuardian,
  createMotherJob,
  createMother,
  createDonor,
  createSocialWorker,
  createSite,
  createOfficialDocuments,
  createSponsoredGroup,
  createSupport,
  // createFinalcialSupport,
  // createEducationalSupport,
  // createOtherSupport,
};

