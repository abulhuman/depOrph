const state = {
  invalidPersonalForm: null,
  invalidHealthForm: null,
  invalidEducationForm: null,
  invalidHouseholdForm: null,
  invalidGuardianForm: null,

  // state from orphan
  orphanFirstName: null,
  orphanFatherName: null,
  orphanGrandFatherName: null,
  orphanGreatGrandFatherName: null,
  orphanGender: null,
  orphanPlaceOfBirth: null,
  orphanClan: null,
  orphanSpokenLanguages: null,
  orphanDateOfBirth: null,
  orphanBirthCertificateUrl: null,
  orphanPhotoPortraitUrl: null,

  // state from health
  orphanPhysicalHealth: null,
  orphanPsychologicalHealth: null,
  orphanOtherHealthIssues: null,

  // state from education
  educationEnrollmentStatus: null,
  educationSchoolName: null,
  educationTypeOfSchool: null,
  educationLevel: null,
  educationYear: null,
  educationDroppedOutGrade: null,
  educationDroppedOutReason: null,
  educationUnEnrolledReason: null,

  // state from household
  orphanNumberOfSponsoredSiblings: null,

  fatherCauseOfDeath: null,
  fatherJobTitle: null,
  fatherMonthlyIncome: null,
  fatherDeathCertificateUrl: null,
  fatherDateOfBrith: null,
  fatherDateOfDeath: null,

  motherFirstName: null,
  motherMiddleName: null,
  motherLastName: null,
  motherVitalStatus: null,
  motherCauseOfDeath: null,
  motherMaritalStatus: null,
  motherJobTitle: null,
  motherMonthlyExpense: null,
  motherMonthlyIncome: null,
  motherSourceOfIncome: null,
  motherPhoneNumber: null,
  motherDateOfBrith: null,
  motherDateOfDeath: null,

  siblings: [],

  igaOwnershipStatus: null,
  igaOtherProperty: null,

  // state from guardian
  guardianFirstName: null,
  guardianMiddleName: null,
  guardianLastName: null,
  guardianGender: null,
  guardianNationality: null,
  guardianAddress: null,
  guardianRelationToOrphan: null,
  guardianTelephone: null,
  guardianMobile: null,
  guardianPOBox: null,
  guardianEmail: null,
  guardianJobTitle: null,
  guardianMonthlyExpense: null,
  guardianConfirmationLetterUrl: null,
  guardianIDCardUrl: null,
  guadrianDateOfBrith: null
};

const getters = {
  getInvalidPersonalForm: state => state.invalidPersonalForm,
  getInvalidHealthForm: state => state.invalidHealthForm,
  getInvalidEducationForm: state => state.invalidEducationForm,
  getInvalidHouseholdForm: state => state.invalidHouseholdForm,
  getInvalidGuardianForm: state => state.invalidGuardianForm,

  // getters for state from orphan
  getOrphanFirstName: state => state.orphanFirstName,
  getOrphanFatherName: state => state.orphanFatherName,
  getOrphanGrandFatherName: state => state.orphanGrandFatherName,
  getOrphanGreatGrandFatherName: state => state.orphanGreatGrandFatherName,
  getOrphanGender: state => state.orphanGender,
  getOrphanPlaceOfBirth: state => state.orphanPlaceOfBirth,
  getOrphanClan: state => state.orphanClan,
  getOrphanSpokenLanguages: state => state.orphanSpokenLanguages,
  getOrphanDateOfBirth: state => state.orphanDateOfBirth,
  getOrphanBirthCertificateUrl: state => state.orphanBirthCertificateUrl,
  getOrphanPhotoPortraitUrl: state => state.orphanPhotoPortraitUrl,

  // getters for state from health
  getOrphanPhysicalHealth: state => state.orphanPhysicalHealth,
  getOrphanPsychologicalHealth: state => state.orphanPsychologicalHealth,
  getOrphanOtherHealthIssues: state => state.orphanOtherHealthIssues,

  // getters for state from education
  getEducationEnrollmentStatus: state => state.educationEnrollmentStatus,
  getEducationSchoolName: state => state.educationSchoolName,
  getEducationTypeOfSchool: state => state.educationTypeOfSchool,
  getEducationLevel: state => state.educationLevel,
  getEducationYear: state => state.educationYear,
  getEducationDroppedOutGrade: state => state.educationDroppedOutGrade,
  getEducationDroppedOutReason: state => state.educationDroppedOutReason,
  getEducationUnEnrolledReason: state => state.educationUnEnrolledReason,

  // getters for state from household
  getOrphanNumberOfSponsoredSiblings: state =>
    state.orphanNumberOfSponsoredSiblings,

  getFatherCauseOfDeath: state => state.fatherCauseOfDeath,
  getFatherJobTitle: state => state.fatherJobTitle,
  getFatherMonthlyIncome: state => state.fatherMonthlyIncome,
  getFatherDeathCertificateUrl: state => state.fatherDeathCertificateUrl,
  getFatherDateOfBrith: state => state.fatherDateOfBrith,
  getFatherDateOfDeath: state => state.fatherDateOfDeath,

  getMotherFirstName: state => state.motherFirstName,
  getMotherMiddleName: state => state.motherMiddleName,
  getMotherLastName: state => state.motherLastName,
  getMotherVitalStatus: state => state.motherVitalStatus,
  getMotherCauseOfDeath: state => state.motherCauseOfDeath,
  getMotherMaritalStatus: state => state.motherMaritalStatus,
  getMotherJobTitle: state => state.motherJobTitle,
  getMotherMonthlyExpense: state => state.motherMonthlyExpense,
  getMotherMonthlyIncome: state => state.motherMonthlyIncome,
  getMotherSourceOfIncome: state => state.motherSourceOfIncome,
  getMotherPhoneNumber: state => state.motherPhoneNumber,
  getMotherDateOfBrith: state => state.motherDateOfBrith,
  getMotherDateOfDeath: state => state.motherDateOfDeath,

  getSiblings: state => state.siblings,

  getIgaOwnershipStatus: state => state.igaOwnershipStatus,
  getIgaOtherProperty: state => state.igaOtherProperty,

  // getters for state from guardian
  getGuardianFirstName: state => state.guardianFirstName,
  getGuardianMiddleName: state => state.guardianMiddleName,
  getGuardianLastName: state => state.guardianLastName,
  getGuardianGender: state => state.guardianGender,
  getGuardianNationality: state => state.guardianNationality,
  getGuardianAddress: state => state.guardianAddress,
  getGuardianRelationToOrphan: state => state.guardianRelationToOrphan,
  getGuardianTelephone: state => state.guardianTelephone,
  getGuardianMobile: state => state.guardianMobile,
  getGuardianPOBox: state => state.guardianPOBox,
  getGuardianEmail: state => state.guardianEmail,
  getGuardianJobTitle: state => state.guardianJobTitle,
  getGuardianMonthlyExpense: state => state.guardianMonthlyExpense,
  getGuardianConfirmationLetterUrl: state =>
    state.guardianConfirmationLetterUrl,
  getGuardianIDCardUrl: state => state.guardianIDCardUrl,
  getGuadrianDateOfBrith: state => state.guadrianDateOfBrith
};

const actions = {
  setInvalidPersonalForm({ commit }, status) {
    commit("SET_INVALID_PERSONAL_FORM", status);
  },
  setInvalidHealthForm({ commit }, status) {
    commit("SET_INVALID_HEALTH_FORM", status);
  },
  setInvalidEducationForm({ commit }, status) {
    commit("SET_INVALID_EDUCATION_FORM", status);
  },
  setInvalidHouseholdForm({ commit }, status) {
    commit("SET_INVALID_HOUSEHOLD_FORM", status);
  },
  setInvalidGuardianForm({ commit }, status) {
    commit("SET_INVALID_GUARDIAN_FORM", status);
  },

  // getters for state from orphan
  setOrphanFirstName({ commit }, data) {
    commit("SET_ORPHAN_FIRST_NAME", data);
  },
  setOrphanFatherName({ commit }, data) {
    commit("SET_ORPHAN_FATHER_NAME", data);
  },
  setOrphanGrandFatherName({ commit }, data) {
    commit("SET_ORPHAN_GRAND_FATHER_NAME", data);
  },
  setOrphanGreatGrandFatherName({ commit }, data) {
    commit("SET_ORPHAN__GREAT_GRAND_FATHER_NAME", data);
  },
  setOrphanGender({ commit }, data) {
    commit("SET_ORPHAN_GENDER", data);
  },
  setOrphanPlaceOfBirth({ commit }, data) {
    commit("SET_ORPHAN_PLACE_OF_BIRTH", data);
  },
  setOrphanClan({ commit }, data) {
    commit("SET_ORPHAN_CLAN", data);
  },
  setOrphanSpokenLanguages({ commit }, data) {
    commit("SET_ORPHAN_SPOKEN_LANGUAGES", data);
  },
  setOrphanDateOfBirth({ commit }, data) {
    commit("SET_ORPHAN_DATE_OF_BIRTH", data);
  },
  setOrphanBirthCertificateUrl({ commit }, data) {
    commit("SET_ORPHAN_BIRTH_CERTIFICATE_URL", data);
  },
  setOrphanPhotoPortraitUrl({ commit }, data) {
    commit("SET_ORPHAN_PHOTO_PORTRAIT_URL", data);
  },

  // getters for state from health
  setOrphanPhysicalHealth({ commit }, data) {
    commit("SET_ORPHAN_PHYSICAL_HEALTH", data);
  },
  setOrphanPsychologicalHealth({ commit }, data) {
    commit("SET_ORPHAN_PSYCHOLOGICAL_HEALTH", data);
  },
  setOrphanOtherHealthIssues({ commit }, data) {
    commit("SET_ORPHAN_OTHER_HEALTH_ISSUES", data);
  },

  // getters for state from education
  setEducationEnrollmentStatus({ commit }, data) {
    commit("SET_EDUCATION_ENROLLMENT_STATUS", data);
  },
  setEducationSchoolName({ commit }, data) {
    commit("SET_EDUCATION_SCHOOL_NAME", data);
  },
  setEducationTypeOfSchool({ commit }, data) {
    commit("SET_EDUCATION_TYPE_OF_SCHOOL", data);
  },
  setEducationLevel({ commit }, data) {
    commit("SET_EDUCATION_LEVEL", data);
  },
  setEducationYear({ commit }, data) {
    commit("SET_EDUCATION_YEAR", data);
  },
  setEducationDroppedOutGrade({ commit }, data) {
    commit("SET_EDUCATION_DROPPED_OUT_GRADE", data);
  },
  setEducationDroppedOutReason({ commit }, data) {
    commit("SET_EDUCATION_DROPPED_OUT_REASON", data);
  },
  setEducationUnEnrolledReason({ commit }, data) {
    commit("SET_EDUCATION_UN_ENROLLED_REASON", data);
  },

  // getters for state from household
  setOrphanNumberOfSponsoredSiblings({ commit }, data) {
    commit("SET_ORPHAN_NUMBER_OF_SPONSORED_SIBLINGS", data);
  },

  setFatherCauseOfDeath({ commit }, data) {
    commit("SET_FATHER_CAUSE_OF_DEATH", data);
  },
  setFatherJobTitle({ commit }, data) {
    commit("SET_FATHER_JOB_TITLE", data);
  },
  setFatherMonthlyIncome({ commit }, data) {
    commit("SET_FATHER_MONTHLY_INCOME", data);
  },
  setFatherDeathCertificateUrl({ commit }, data) {
    commit("SET_FATHER_DEATH_CERTIFICATE_URL", data);
  },
  setFatherDateOfBrith({ commit }, data) {
    commit("SET_FATHER_DATE_OF_BIRTH", data);
  },
  setFatherDateOfDeath({ commit }, data) {
    commit("SET_FATHER_DATE_OF_DEATH", data);
  },

  setMotherFirstName({ commit }, data) {
    commit("SET_MOTHER_FIRST_NAME", data);
  },
  setMotherMiddleName({ commit }, data) {
    commit("SET_MOTHER_MIDDLE_NAME", data);
  },
  setMotherLastName({ commit }, data) {
    commit("SET_MOTHER_LAST_NAME", data);
  },
  setMotherVitalStatus({ commit }, data) {
    commit("SET_MOTHER_VITAL_STATUS", data);
  },
  setMotherCauseOfDeath({ commit }, data) {
    commit("SET_MOTHER_CAUSE_OF_DEATH", data);
  },
  setMotherMaritalStatus({ commit }, data) {
    commit("SET_MOTHER_MARITAL_STATUS", data);
  },
  setMotherJobTitle({ commit }, data) {
    commit("SET_MOTHER_JOB_TITLE", data);
  },
  setMotherMonthlyExpense({ commit }, data) {
    commit("SET_MOTHER_MONTHLY_EXPENSE", data);
  },
  setMotherMonthlyIncome({ commit }, data) {
    commit("SET_MOTHER_MONTHLY_INCOME", data);
  },
  setMotherSourceOfIncome({ commit }, data) {
    commit("SET_MOTHER_SOURCE_OF_INCOME", data);
  },
  setMotherPhoneNumber({ commit }, data) {
    commit("SET_MOTHER_PHONE_NUMBER", data);
  },
  setMotherDateOfBrith({ commit }, data) {
    commit("SET_MOTHER_DATE_OF_BIRTH", data);
  },
  setMotherDateOfDeath({ commit }, data) {
    commit("SET_MOTHER_DATE_OF_DEATH", data);
  },

  setSiblings({ commit }, data) {
    commit("SET_SIBLINGS", data);
  },

  setIgaOwnershipStatus({ commit }, data) {
    commit("SET_IGA_OWNERSHIP_STATUS", data);
  },
  setIgaOtherProperty({ commit }, data) {
    commit("SET_IGA_OTHER_PROPERTY", data);
  },

  // getters for state from guardian
  setGuardianFirstName({ commit }, data) {
    commit("SET_GUARDIAN_FIRST_NAME", data);
  },
  setGuardianMiddleName({ commit }, data) {
    commit("SET_GUARDIAN_MIDDLE_NAME", data);
  },
  setGuardianLastName({ commit }, data) {
    commit("SET_GUARDIAN_LAST_NAME", data);
  },
  setGuardianGender({ commit }, data) {
    commit("SET_GUARDIAN_GENDER", data);
  },
  setGuardianNationality({ commit }, data) {
    commit("SET_GUARDIAN_NATIONALITY", data);
  },
  setGuardianAddress({ commit }, data) {
    commit("SET_GUARDIAN_ADDRESS", data);
  },
  setGuardianRelationToOrphan({ commit }, data) {
    commit("SET_GUARDIAN_RELATION_TO_ORPHAN", data);
  },
  setGuardianTelephone({ commit }, data) {
    commit("SET_GUARDIAN_TELEPHONE", data);
  },
  setGuardianMobile({ commit }, data) {
    commit("SET_GUARDIAN_MOBILE", data);
  },
  setGuardianPOBox({ commit }, data) {
    commit("SET_GUARDIAN_POBOX", data);
  },
  setGuardianEmail({ commit }, data) {
    commit("SET_GUARDIAN_EMAIL", data);
  },
  setGuardianJobTitle({ commit }, data) {
    commit("SET_GUARDIAN_JOB_TITLE", data);
  },
  setGuardianMonthlyExpense({ commit }, data) {
    commit("SET_GUARDIAN_MONTHLY_EXPENSE", data);
  },
  setGuardianConfirmationLetterUrl({ commit }, data) {
    commit("SET_GUARDIAN_CONFIRMATION_LETTER_URL", data);
  },
  setGuardianIDCardUrl({ commit }, data) {
    commit("SET_GUARDIAN_ID_CARD_URL", data);
  },
  setGuadrianDateOfBrith({ commit }, data) {
    commit("SET_GUARDIAN_DATE_OF_BIRTH", data);
  }
};

const mutations = {
  SET_INVALID_PERSONAL_FORM(state, status) {
    state.invalidPersonalForm = status;
  },
  SET_INVALID_HEALTH_FORM(state, status) {
    state.invalidHealthForm = status;
  },
  SET_INVALID_EDUCATION_FORM(state, status) {
    state.invalidEducationForm = status;
  },
  SET_INVALID_HOUSEHOLD_FORM(state, status) {
    state.invalidHouseholdForm = status;
  },
  SET_INVALID_GUARDIAN_FORM(state, status) {
    state.invalidGuardianForm = status;
  },

  //  MUTATIONS FOR ACTIONS, FROM PERSONAL
  SET_ORPHAN_FIRST_NAME(state, data) {
    state.orphanFirstName = data;
  },
  SET_ORPHAN_FATHER_NAME(state, data) {
    state.orphanFatherName = data;
  },
  SET_ORPHAN_GRAND_FATHER_NAME(state, data) {
    state.orphanGrandFatherName = data;
  },
  SET_ORPHAN__GREAT_GRAND_FATHER_NAME(state, data) {
    state.orphanGreatGrandFatherName = data;
  },
  SET_ORPHAN_GENDER(state, data) {
    state.orphanGender = data;
  },
  SET_ORPHAN_PLACE_OF_BIRTH(state, data) {
    state.orphanPlaceOfBirth = data;
  },
  SET_ORPHAN_CLAN(state, data) {
    state.orphanClan = data;
  },
  SET_ORPHAN_SPOKEN_LANGUAGES(state, data) {
    state.orphanSpokenLanguages = data;
  },
  SET_ORPHAN_DATE_OF_BIRTH(state, data) {
    state.orphanDateOfBirth = data;
  },
  SET_ORPHAN_BIRTH_CERTIFICATE_URL(state, data) {
    state.orphanBirthCertificateUrl = data;
  },
  SET_ORPHAN_PHOTO_PORTRAIT_URL(state, data) {
    state.orphanPhotoPortraitUrl = data;
  },

  //  MUTATIONS FOR ACTIONS FROM HEALTH
  SET_ORPHAN_PHYSICAL_HEALTH(state, data) {
    state.orphanPhysicalHealth = data;
  },
  SET_ORPHAN_PSYCHOLOGICAL_HEALTH(state, data) {
    state.orphanPsychologicalHealth = data;
  },
  SET_ORPHAN_OTHER_HEALTH_ISSUES(state, data) {
    state.orphanOtherHealthIssues = data;
  },

  //  MUTATIONS FOR ACTIONS FROM EDUCATION
  SET_EDUCATION_ENROLLMENT_STATUS(state, data) {
    state.educationEnrollmentStatus = data;
  },
  SET_EDUCATION_SCHOOL_NAME(state, data) {
    state.educationSchoolName = data;
  },
  SET_EDUCATION_TYPE_OF_SCHOOL(state, data) {
    state.educationTypeOfSchool = data;
  },
  SET_EDUCATION_LEVEL(state, data) {
    state.educationLevel = data;
  },
  SET_EDUCATION_YEAR(state, data) {
    state.educationYear = data;
  },
  SET_EDUCATION_DROPPED_OUT_GRADE(state, data) {
    state.educationDroppedOutGrade = data;
  },
  SET_EDUCATION_DROPPED_OUT_REASON(state, data) {
    state.educationDroppedOutReason = data;
  },
  SET_EDUCATION_UN_ENROLLED_REASON(state, data) {
    state.educationUnEnrolledReason = data;
  },

  //  MUTATIONS FOR ACTIONS FROM HOUSEHOLD
  SET_ORPHAN_NUMBER_OF_SPONSORED_SIBLINGS(state, data) {
    state.orphanNumberOfSponsoredSiblings = data;
  },
  SET_FATHER_CAUSE_OF_DEATH(state, data) {
    state.fatherCauseOfDeath = data;
  },
  SET_FATHER_JOB_TITLE(state, data) {
    state.fatherJobTitle = data;
  },
  SET_FATHER_MONTHLY_INCOME(state, data) {
    state.fatherMonthlyIncome = data;
  },
  SET_FATHER_DEATH_CERTIFICATE_URL(state, data) {
    state.fatherDeathCertificateUrl = data;
  },
  SET_FATHER_DATE_OF_BIRTH(state, data) {
    state.fatherDateOfBrith = data;
  },
  SET_FATHER_DATE_OF_DEATH(state, data) {
    state.fatherDateOfDeath = data;
  },
  SET_MOTHER_FIRST_NAME(state, data) {
    state.motherFirstName = data;
  },
  SET_MOTHER_MIDDLE_NAME(state, data) {
    state.motherMiddleName = data;
  },
  SET_MOTHER_LAST_NAME(state, data) {
    state.motherLastName = data;
  },
  SET_MOTHER_VITAL_STATUS(state, data) {
    state.motherVitalStatus = data;
  },
  SET_MOTHER_CAUSE_OF_DEATH(state, data) {
    state.motherCauseOfDeath = data;
  },
  SET_MOTHER_MARITAL_STATUS(state, data) {
    state.motherMaritalStatus = data;
  },
  SET_MOTHER_JOB_TITLE(state, data) {
    state.motherJobTitle = data;
  },
  SET_MOTHER_MONTHLY_EXPENSE(state, data) {
    state.motherMonthlyExpense = data;
  },
  SET_MOTHER_MONTHLY_INCOME(state, data) {
    state.motherMonthlyIncome = data;
  },
  SET_MOTHER_SOURCE_OF_INCOME(state, data) {
    state.motherSourceOfIncome = data;
  },
  SET_MOTHER_PHONE_NUMBER(state, data) {
    state.motherPhoneNumber = data;
  },
  SET_MOTHER_DATE_OF_BIRTH(state, data) {
    state.motherDateOfBrith = data;
  },
  SET_MOTHER_DATE_OF_DEATH(state, data) {
    state.motherDateOfDeath = data;
  },
  SET_SIBLINGS(state, data) {
    state.siblings = data;
  },
  SET_IGA_OWNERSHIP_STATUS(state, data) {
    state.igaOwnershipStatus = data;
  },
  SET_IGA_OTHER_PROPERTY(state, data) {
    state.igaOtherProperty = data;
  },

  //  MUTATIONS FOR ACTIONS FROM GUARDIAN
  SET_GUARDIAN_FIRST_NAME(state, data) {
    state.guardianFirstName = data;
  },
  SET_GUARDIAN_MIDDLE_NAME(state, data) {
    state.guardianMiddleName = data;
  },
  SET_GUARDIAN_LAST_NAME(state, data) {
    state.guardianLastName = data;
  },
  SET_GUARDIAN_GENDER(state, data) {
    state.guardianGender = data;
  },
  SET_GUARDIAN_NATIONALITY(state, data) {
    state.guardianNationality = data;
  },
  SET_GUARDIAN_ADDRESS(state, data) {
    state.guardianAddress = data;
  },
  SET_GUARDIAN_RELATION_TO_ORPHAN(state, data) {
    state.guardianRelationToOrphan = data;
  },
  SET_GUARDIAN_TELEPHONE(state, data) {
    state.guardianTelephone = data;
  },
  SET_GUARDIAN_MOBILE(state, data) {
    state.guardianMobile = data;
  },
  SET_GUARDIAN_POBOX(state, data) {
    state.guardianPOBox = data;
  },
  SET_GUARDIAN_EMAIL(state, data) {
    state.guardianEmail = data;
  },
  SET_GUARDIAN_JOB_TITLE(state, data) {
    state.guardianJobTitle = data;
  },
  SET_GUARDIAN_MONTHLY_EXPENSE(state, data) {
    state.guardianMonthlyExpense = data;
  },
  SET_GUARDIAN_CONFIRMATION_LETTER_URL(state, data) {
    state.guardianConfirmationLetterUrl = data;
  },
  SET_GUARDIAN_ID_CARD_URL(state, data) {
    state.guardianIDCardUrl = data;
  },
  SET_GUARDIAN_DATE_OF_BIRTH(state, data) {
    state.guadrianDateOfBrith = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
