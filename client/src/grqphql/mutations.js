export const CREATE_ORPHAN_MUTATION = `
  mutation(
    $orphanFirstName: String!
    $orphanFatherName: String!
    $orphanGrandFatherName: String!
    $orphanGreatGrandFatherName: String!
    $orphanGender: orphanGender!
    $orphanPlaceOfBirth: String!
    $orphanDateOfBirth: DateTime!
    $orphanClan: String!
    $orphanSpokenLanguages: String!
    $orphanNumberOfSponsoredSiblings: Int!
    $orphanPhysicalHealthStatus: String!
    $orphanPsychologicalHealthStatus: String!
    $orphanOtherHealthIssues: String!
    $orphanHobbies: String!
  ){
    createOrphan(
      firstName: $orphanFirstName
      fatherName: $orphanFatherName
      grandFatherName: $orphanGrandFatherName
      greatGrandFatherName: $orphanGreatGrandFatherName
      gender: $orphanGender
      placeOfBirth: $orphanPlaceOfBirth
      dateOfBirth: $orphanDateOfBirth
      clan: $orphanClan
      spokenLanguages: $orphanSpokenLanguages
      numberOfSponserdSiblings: $orphanNumberOfSponsoredSiblings
      physicalHealthStatus: $orphanPhysicalHealthStatus
      psychologicalHealthStatus: $orphanPsychologicalHealthStatus
      otherHealthIssues: $orphanOtherHealthIssues
      hobbies: $orphanHobbies
      siblings:[]
    ){
      id
    }
  }
  `;

export const CREATE_IGA_PROPERTY_MUTATION = `
  mutation(
    $ownershipStatus: String!
    $otherProperty: String!
    $orphanId: ID
  ){
    createIga_property(
      ownershipStatus: $ownershipStatus
      otherProperty: $otherProperty
      orphan: $orphanId
    ){
      id
    }
  }
  `;

export const CREATE_OFFICIAL_DOCUMENTS_MUTATION = `
  mutation(
    $photoPortraitUrl: String!
    $birthCertificateUrl: String!
    $orphanId: ID
  ){
    createOfficialDocuments(
      photoPortraitUrl: $photoPortraitUrl
      photoLongUrl: ""
      birthCertificateUrl: $birthCertificateUrl
      orphan: $orphanId
    ){
      id
    }
  }
  `;

export const CREATE_EDUCATION_MUTATION = `
  mutation(
    $enrollmentStatus: educationEnrollmentStatus!
    $schoolName: String
    $typeOfSchool: educationTypeOfSchool
    $year: String
    $level: educationLevel
    $reason: String
    $orphanId: ID
  ){
    createEducation(
      enrollmentStatus: $enrollmentStatus
      schoolName: $schoolName
      typeOfSchool: $typeOfSchool
      year: $year
      level: $level
      reason: $reason
      orphan: $orphanId
    ){
      id
    }
  }`;

export const CREATE_FATHER_MUTATION = `
  mutation(
    $dateOfDeath: DateTime!
    $causeOfDeath: String!
    $job: String
    $monthlyIncome: Int
    $dateOfBirth: DateTime!
    $deathCertificateUrl: String!
    $orphan: ID
  ){
    createFather(
      dateOfDeath: $dateOfDeath
      causeOfDeath: $causeOfDeath
      job: $job
      monthlyIncome: $monthlyIncome
      dateOfBirth: $dateOfBirth
      deathCertificateUrl: $deathCertificateUrl
      orphans: [$orphan]
    ){
      id
    }
  }`;

export const CREATE_GUARDIAN_MUTATION = `
  mutation(
    $firstName: String!
    $middleName: String!
    $lastName: String!
    $gender: guardianGender!
    $nationality: String!
    $state: String!
    $zone: String!
    $district: String!
    $kebele: String!
    $relationToOrphan: guardianRelationToOrphan!
    $telephone: String
    $mobile: String!
    $POBox: String
    $email: String!
    $job: String
    $dateOfBirth: DateTime!
    $monthlyExpense: Float!
    $guardianIDCardUrl: String!
    $guardianConfirmationLetterUrl: String!
    $orphan: ID
  ){
    createGuardian(
      firstName: $firstName
      middleName: $middleName
      lastName: $lastName
      gender: $gender
      nationality: $nationality
      state: $state
      zone: $zone
      district: $district
      kebele: $kebele
      relationToOrphan: $relationToOrphan
      telephone: $telephone
      mobile: $mobile
      POBox: $POBox
      email: $email
      job: $job
      dateOfBirth: $dateOfBirth
      monthlyExpense: $monthlyExpense
      guardianIDCardUrl: $guardianIDCardUrl
      guardianConfirmationLetterUrl: $guardianConfirmationLetterUrl
      orphans: [$orphan]
    ) {
      id
    }
  }`;

export const CREATE_MOTHER_MUTATION = `
  mutation(
    $firstName: String!
    $middleName: String!
    $lastName: String!
    $dateOfBirth: DateTime!
    $dateOfDeath: DateTime
    $causeOfDeath: String
    $phoneNumber: String!
    $maritalStatus: motherMaritalStatus!
    $vitalStatus: motherVitalStatus!
    $monthlyExpense: Float!
    $orphan: ID
  ){
    createMother(
      firstName: $firstName
      middleName: $middleName
      lastName: $lastName
      dateOfBirth: $dateOfBirth
      dateOfDeath: $dateOfDeath
      causeOfDeath: $causeOfDeath
      phoneNumber: $phoneNumber
      maritalStatus: $maritalStatus
      vitalStatus: $vitalStatus
      monthlyExpense: $monthlyExpense
      motherjob: []
      orphans: [$orphan]
    ){
      id
    }
  }`;

export const CREATE_MOTHER_JOB_MUTATION = `
  mutation(
    $jobTitle: String
    $monthlyIncome: Float
    $initDate: DateTime
    $termDate: DateTime
    $mother: ID
  ){
    createMotherJob(
      currentJobTitle: $jobTitle
      monthlyIncome: $monthlyIncome
      initDate: $initDate
      termDate: $termDate
      mother: $mother
    ){
      id
    }
  }`;

export const CREATE_SIBLING_MUTATUON = `
  mutation(
    $fullName: String!
    $gender: String!
    $age:Int!
    $schoolGrade: String
    $job: String
    $maritalStatus: String!
    $orphan: ID
  ) {
    createSibling(
      fullName: $fullName
      gender: $gender
      age: $age
      schoolGrade: $schoolGrade
      job: $job
      maritalStatus: $maritalStatus
      orphan: $orphan
    ){
      id
    }
  }`;
