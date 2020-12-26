<template>
  <div class="accordion" role="tablist">
    <!-- PERSONAL INFORMATION -->
    <b-card no-body>
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-1 variant="light" class="text-left"
          >1. Personal Inforamtion</b-button
        >
      </b-card-header>
      <b-collapse
        id="accordion-1"
        visible
        accordion="add-orphan-form-accordion"
        role="tabpanel"
      >
        <b-card-body>
          <b-alert v-model="getInvalidPersonalForm" variant="danger">
            There is an incomplete data in this part of the form. Complete it
            first.
            <b-button-close
              @click="setInvalidPersonalForm(false)"
            ></b-button-close>
          </b-alert>
          <PersonalInformationForm
            @personal-info-complete="onPersonalInfoComplete"
          />
        </b-card-body>
      </b-collapse>
    </b-card>
    <!-- HEALTH INFORMATION -->
    <b-card no-body>
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-2 variant="light" class="text-left"
          >2. Health Inforamtion</b-button
        >
      </b-card-header>
      <b-collapse
        id="accordion-2"
        accordion="add-orphan-form-accordion"
        role="tabpanel"
      >
        <b-card-body>
          <b-alert v-model="getInvalidHealthForm" variant="danger">
            There is an incomplete data in this part of the form. Complete it
            first.
            <b-button-close
              @click="setInvalidHealthForm(false)"
            ></b-button-close>
          </b-alert>
          <HealthInformationForm @health-info-complete="onHealthInfoComplete" />
        </b-card-body>
      </b-collapse>
    </b-card>
    <!-- EDUCATION INFORMATION -->
    <b-card no-body>
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-3 variant="light" class="text-left"
          >3. Education Information</b-button
        >
      </b-card-header>
      <b-collapse
        id="accordion-3"
        accordion="add-orphan-form-accordion"
        role="tabpanel"
      >
        <b-card-body>
          <b-alert v-model="getInvalidEducationForm" variant="danger">
            There is an incomplete data in this part of the form. Complete it
            first.
            <b-button-close
              @click="setInvalidEducationForm(false)"
            ></b-button-close>
          </b-alert>
          <EducationInformationForm
            @education-info-complete="onEducationInfoComplete"
          />
        </b-card-body>
      </b-collapse>
    </b-card>
    <!-- HOUSEHOLD INFORMATION -->
    <b-card no-body>
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-4 variant="light" class="text-left"
          >4. Household Information</b-button
        >
      </b-card-header>
      <b-collapse
        id="accordion-4"
        accordion="add-orphan-form-accordion"
        role="tabpanel"
      >
        <b-card-body>
          <b-alert v-model="getInvalidHouseholdForm" variant="danger">
            There is an incomplete data in this part of the form. Complete it
            first.
            <b-button-close
              @click="setInvalidHouseholdForm(false)"
            ></b-button-close>
          </b-alert>
          <HouseholdInformationForm
            @household-info-complete="onHouseholdInfoComplete"
          />
        </b-card-body>
      </b-collapse>
    </b-card>
    <!-- GUARDIAN INFORMATION -->
    <b-card no-body>
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-5 variant="light" class="text-left"
          >5. Guardian Information</b-button
        >
      </b-card-header>
      <b-collapse
        id="accordion-5"
        accordion="add-orphan-form-accordion"
        role="tabpanel"
      >
        <b-card-body>
          <b-alert v-model="getInvalidGuardianForm" variant="danger">
            There is an incomplete data in this part of the form. Complete it
            first.
            <b-button-close
              @click="setInvalidGuardianForm(false)"
            ></b-button-close>
          </b-alert>
          <GuardianInformationForm
            @guardian-info-complete="onGuardianInfoComplete"
            @formComplete="sendMutation"
          />
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-button @click="testMutation">LOG</b-button>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import PersonalInformationForm from "./PersonalInformationForm.vue";
import HealthInformationForm from "./HealthInformationForm";
import EducationInformationForm from "./EducationInformationForm";
import HouseholdInformationForm from "./HouseholdInformationForm";
import GuardianInformationForm from "./GuardianInformationForm";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import moment from "moment";
import {
  CREATE_ORPHAN_MUTATION,
  CREATE_IGA_PROPERTY_MUTATION,
  CREATE_OFFICIAL_DOCUMENTS_MUTATION,
  CREATE_EDUCATION_MUTATION,
  CREATE_FATHER_MUTATION,
  CREATE_GUARDIAN_MUTATION,
  CREATE_MOTHER_MUTATION,
  CREATE_MOTHER_JOB_MUTATION,
  CREATE_SIBLING_MUTATUON
} from "../graphql/mutations";

export default {
  data() {
    return {
      orphanId: "",

      // data from personal
      orphanFirstName: "",
      orphanFatherName: "",
      orphanGrandFatherName: "",
      orphanGreatGrandFatherName: "",
      orphanGender: "",
      orphanPlaceOfBirth: "",
      orphanClan: "",
      orphanSpokenLanguages: "",
      orphanDateOfBirth: "",
      orphanBirthCertificateUrl: "",
      orphanPhotoPortraitUrl: "",

      // data from health
      orphanPhysicalHealth: "",
      orphanPsychologicalHealth: "",
      orphanOtherHealthIssues: "",

      // data from education
      orphanHobbies: "",

      educationEnrollmentStatus: "",
      educationSchoolName: "",
      educationTypeOfSchool: "",
      educationLevel: "",
      educationYear: "",
      educationDroppedOutGrade: "",
      educationDroppedOutReason: "",
      educationUnEnrolledReason: "",

      // data from household
      orphanNumberOfSponsoredSiblings: "",

      fatherCauseOfDeath: "",
      fatherJobTitle: "",
      fatherMonthlyIncome: "",
      fatherDeathCertificateUrl: "",
      fatherDateOfBrith: "",
      fatherDateOfDeath: "",

      motherFirstName: "",
      motherMiddleName: "",
      motherLastName: "",
      motherVitalStatus: "",
      motherCauseOfDeath: "",
      motherMaritalStatus: "",
      motherJobTitle: "",
      motherMonthlyExpense: 0,
      motherMonthlyIncome: "",
      motherSourceOfIncome: "",
      motherPhoneNumber: "",
      motherDateOfBrith: "",
      motherDateOfDeath: "",

      siblings: [],

      igaOwnershipStatus: "",
      igaOtherProperty: "",

      // data from guardian
      guardianFirstName: "",
      guardianMiddleName: "",
      guardianLastName: "",
      guardianGender: "",
      guardianNationality: "",
      guardianAddress: "",
      guardianRelationToOrphan: "",
      guardianTelephone: "",
      guardianMobile: "",
      guardianPOBox: "",
      guardianEmail: "",
      guardianJobTitle: "",
      guardianMonthlyExpense: 0,
      guardianConfirmationLetterUrl: "",
      guardianIDCardUrl: "",
      guadrianDateOfBrith: ""
    };
  },
  components: {
    PersonalInformationForm,
    HealthInformationForm,
    EducationInformationForm,
    HouseholdInformationForm,
    GuardianInformationForm
  },
  computed: {
    ...mapGetters([
      "getInvalidPersonalForm",
      "getInvalidHealthForm",
      "getInvalidEducationForm",
      "getInvalidHouseholdForm",
      "getInvalidGuardianForm",
      "getOrphanFirstName",
      "getOrphanFatherName",
      "getOrphanGrandFatherName",
      "getOrphanGreatGrandFatherName",
      "getOrphanGender",
      "getOrphanPlaceOfBirth",
      "getOrphanClan",
      "getOrphanSpokenLanguages",
      "getOrphanDateOfBirth",
      "getOrphanPhysicalHealth",
      "getOrphanPsychologicalHealth",
      "getOrphanOtherHealthIssues",
      "getOrphanNumberOfSponsoredSiblings",
      "getOrphanHobbies"
    ])
  },
  methods: {
    ...mapActions([
      "setInvalidPersonalForm",
      "setInvalidHealthForm",
      "setInvalidEducationForm",
      "setInvalidHouseholdForm",
      "setInvalidGuardianForm"
    ]),
    onPersonalInfoComplete: function({
      orphanFirstName,
      orphanFatherName,
      orphanGrandFatherName,
      orphanGreatGrandFatherName,
      orphanGender,
      orphanPlaceOfBirth,
      orphanClan,
      orphanSpokenLanguages,
      orphanDateOfBirth,
      orphanBirthCertificateUrl,
      orphanPhotoPortraitUrl
    }) {
      this.orphanFirstName = orphanFirstName;
      this.orphanFatherName = orphanFatherName;
      this.orphanGrandFatherName = orphanGrandFatherName;
      this.orphanGreatGrandFatherName = orphanGreatGrandFatherName;
      this.orphanGender = orphanGender;
      this.orphanPlaceOfBirth = orphanPlaceOfBirth;
      this.orphanClan = orphanClan;
      this.orphanSpokenLanguages = orphanSpokenLanguages;
      this.orphanDateOfBirth = orphanDateOfBirth;
      this.orphanBirthCertificateUrl = orphanBirthCertificateUrl;
      this.orphanPhotoPortraitUrl = orphanPhotoPortraitUrl;
    },
    onHealthInfoComplete: function({
      orphanPhysicalHealth,
      orphanPsychologicalHealth,
      orphanOtherHealthIssues
    }) {
      this.orphanPhysicalHealth = orphanPhysicalHealth;
      this.orphanPsychologicalHealth = orphanPsychologicalHealth;
      this.orphanOtherHealthIssues = orphanOtherHealthIssues;
    },
    onEducationInfoComplete: function({
      orphanHobbies,
      educationEnrollmentStatus,
      educationSchoolName,
      educationTypeOfSchool,
      educationLevel,
      educationYear,
      educationDroppedOutGrade,
      educationDroppedOutReason,
      educationUnEnrolledReason
    }) {
      this.orphanHobbies = orphanHobbies;
      this.educationEnrollmentStatus = educationEnrollmentStatus;
      this.educationSchoolName = educationSchoolName;
      this.educationTypeOfSchool = educationTypeOfSchool;
      this.educationLevel = educationLevel;
      this.educationYear = educationYear;
      this.educationDroppedOutGrade = educationDroppedOutGrade;
      this.educationDroppedOutReason = educationDroppedOutReason;
      this.educationUnEnrolledReason = educationUnEnrolledReason;
    },
    onHouseholdInfoComplete: function({
      orphanNumberOfSponsoredSiblings,
      fatherCauseOfDeath,
      fatherJobTitle,
      fatherMonthlyIncome,
      fatherDeathCertificateUrl,
      fatherDateOfBrith,
      fatherDateOfDeath,
      motherFirstName,
      motherMiddleName,
      motherLastName,
      motherVitalStatus,
      motherCauseOfDeath,
      motherMaritalStatus,
      motherJobTitle,
      motherMonthlyExpense,
      motherMonthlyIncome,
      motherSourceOfIncome,
      motherPhoneNumber,
      motherDateOfBrith,
      motherDateOfDeath,
      siblings,
      igaOwnershipStatus,
      igaOtherProperty
    }) {
      this.orphanNumberOfSponsoredSiblings = orphanNumberOfSponsoredSiblings;

      this.fatherCauseOfDeath = fatherCauseOfDeath;
      this.fatherJobTitle = fatherJobTitle;
      this.fatherMonthlyIncome = fatherMonthlyIncome;
      this.fatherDeathCertificateUrl = fatherDeathCertificateUrl;
      this.fatherDateOfBrith = fatherDateOfBrith;
      this.fatherDateOfDeath = fatherDateOfDeath;

      this.motherFirstName = motherFirstName;
      this.motherMiddleName = motherMiddleName;
      this.motherLastName = motherLastName;
      this.motherVitalStatus = motherVitalStatus;
      this.motherCauseOfDeath = motherCauseOfDeath;
      this.motherMaritalStatus = motherMaritalStatus;
      this.motherJobTitle = motherJobTitle;
      this.motherMonthlyExpense = motherMonthlyExpense
        ? parseFloat(motherMonthlyExpense)
        : 0;
      this.motherMonthlyIncome = motherMonthlyIncome;
      this.motherSourceOfIncome = motherSourceOfIncome;
      this.motherPhoneNumber = motherPhoneNumber;
      this.motherDateOfBrith = motherDateOfBrith;
      this.motherDateOfDeath = motherDateOfDeath;

      this.siblings = siblings;

      this.igaOwnershipStatus = igaOwnershipStatus;
      this.igaOtherProperty = igaOtherProperty;
    },
    onGuardianInfoComplete: function({
      guardianFirstName,
      guardianMiddleName,
      guardianLastName,
      guardianGender,
      guardianNationality,
      guardianAddress,
      guardianRelationToOrphan,
      guardianTelephone,
      guardianMobile,
      guardianPOBox,
      guardianEmail,
      guardianJobTitle,
      guardianMonthlyExpense,
      guardianConfirmationLetterUrl,
      guardianIDCardUrl,
      guadrianDateOfBrith
    }) {
      this.guardianFirstName = guardianFirstName;
      this.guardianMiddleName = guardianMiddleName;
      this.guardianLastName = guardianLastName;
      this.guardianGender = guardianGender;
      this.guardianNationality = guardianNationality;
      this.guardianAddress = guardianAddress;
      this.guardianRelationToOrphan = guardianRelationToOrphan;
      this.guardianTelephone = guardianTelephone;
      this.guardianMobile = guardianMobile;
      this.guardianPOBox = guardianPOBox;
      this.guardianEmail = guardianEmail;
      this.guardianJobTitle = guardianJobTitle;
      this.guardianMonthlyExpense = guardianMonthlyExpense
        ? parseFloat(guardianMonthlyExpense)
        : 0;
      this.guardianConfirmationLetterUrl = guardianConfirmationLetterUrl;
      this.guardianIDCardUrl = guardianIDCardUrl;
      this.guadrianDateOfBrith = guadrianDateOfBrith;
    },
    orphanRes: async function() {
      // create an orphan on the DB
      return await axios
        .post("/", {
          query: CREATE_ORPHAN_MUTATION,
          variables: {
            orphanFirstName: this.orphanFirstName,
            orphanFatherName: this.orphanFatherName,
            orphanGrandFatherName: this.orphanGrandFatherName,
            orphanGreatGrandFatherName: this.orphanGreatGrandFatherName,
            orphanGender: this.orphanGender,
            orphanPlaceOfBirth: this.orphanPlaceOfBirth,
            orphanDateOfBirth: moment(this.orphanDateOfBirth).toISOString(),
            orphanClan: this.orphanClan,
            orphanSpokenLanguages: this.orphanSpokenLanguages,
            orphanNumberOfSponsoredSiblings: parseInt(
              this.orphanNumberOfSponsoredSiblings
            ),
            orphanPhysicalHealthStatus: this.orphanPhysicalHealth,
            orphanPsychologicalHealthStatus: this.orphanPsychologicalHealth,
            orphanOtherHealthIssues: this.orphanOtherHealthIssues,
            orphanHobbies: this.orphanHobbies
          }
        })
        .catch(err => console.log(err));
    },
    year: function() {
      if (this.educationEnrollmentStatus == "enrolled") {
        return this.educationYear;
      } else if (this.educationEnrollmentStatus == "droppedout") {
        return parseInt(this.educationDroppedOutGrade);
      } else return "";
    },
    level: function() {
      if (this.educationLevel === "KG") return "preSchool";
      else if (this.educationLevel === "GS") return "gradeSchool";
      else if (this.educationLevel === "UG") return "underGraduate";
      else if (this.educationLevel === "PG") return "postGraduate";
      else return "N_A";
    },
    reason: function() {
      if (this.educationDroppedOutReason /*.length*/)
        return this.educationDroppedOutReason;
      else if (this.educationUnEnrolledReason /*.length*/)
        return this.educationUnEnrolledReason;
      else return "";
    },
    testMutation: async function() {
      console.log(`testMutation() From ${this.$vnode.tag}.vue`);

      const orphanRes = await axios
        .post("/", {
          query: CREATE_ORPHAN_MUTATION,
          variables: {
            orphanFirstName: this.orphanFirstName,
            orphanFatherName: this.orphanFatherName,
            orphanGrandFatherName: this.orphanGrandFatherName,
            orphanGreatGrandFatherName: this.orphanGreatGrandFatherName,
            orphanGender: this.orphanGender,
            orphanPlaceOfBirth: this.orphanPlaceOfBirth,
            orphanDateOfBirth: moment(this.orphanDateOfBirth).toISOString(),
            orphanClan: this.orphanClan,
            orphanSpokenLanguages: this.orphanSpokenLanguages,
            orphanNumberOfSponsoredSiblings: parseInt(
              this.orphanNumberOfSponsoredSiblings
            ),
            orphanPhysicalHealthStatus: this.orphanPhysicalHealth,
            orphanPsychologicalHealthStatus: this.orphanPsychologicalHealth,
            orphanOtherHealthIssues: this.orphanOtherHealthIssues,
            orphanHobbies: this.orphanHobbies
          }
        })
        .catch(err => console.log(err));

      this.orphanId = orphanRes.data.data.createOrphan.id;
      console.log("orphan: " + this.orphanId);

      // create an Iga_property on the DB connected to the above orphan
      const igaRes = await axios
        .post("/", {
          query: CREATE_IGA_PROPERTY_MUTATION,
          variables: {
            ownershipStatus: this.igaOwnershipStatus,
            otherProperty: this.igaOtherProperty,
            orphanId: this.orphanId
          }
        })
        .catch(err => console.log(err));
      console.log("IGA: " + igaRes.data.data.createIga_property.id);

      // create an Officail_documents on the DB connected to the above orphan
      const offDocsRes = await axios
        .post("/", {
          query: CREATE_OFFICIAL_DOCUMENTS_MUTATION,
          variables: {
            birthCertificateUrl: this.orphanBirthCertificateUrl,
            photoPortraitUrl: this.orphanPhotoPortraitUrl,
            orphanId: this.orphanId
          }
        })
        .catch(err => console.log(err));
      console.log("docs: " + offDocsRes.data.data.createOfficialDocuments.id);

      // create an Education on the DB connected to the above orphan
      const educationRes = await axios
        .post("/", {
          query: CREATE_EDUCATION_MUTATION,
          variables: {
            enrollmentStatus: this.educationEnrollmentStatus.toLowerCase(),
            schoolName: this.educationSchoolName,
            typeOfSchool: this.educationTypeOfSchool
              ? this.educationTypeOfSchool.toLowerCase()
              : "N_A",
            year: this.year(),
            level: this.level(),
            reason: this.reason(),
            orphanId: this.orphanId
          }
        })
        .catch(err => console.log(err));
      console.log("edd: " + educationRes.data.data.createEducation.id);

      // create a Father on the DB connected to the above orphan
      const fatherRes = await axios
        .post("/", {
          query: CREATE_FATHER_MUTATION,
          variables: {
            dateOfDeath: moment(this.fatherDateOfDeath).toISOString(),
            causeOfDeath: this.fatherCauseOfDeath,
            job: this.fatherJobTitle,
            monthlyIncome: parseInt(this.fatherMonthlyIncome),
            dateOfBirth: moment(this.fatherDateOfBrith).toISOString(),
            deathCertificateUrl: this.fatherDeathCertificateUrl,
            orphan: this.orphanId
          }
        })
        .catch(err => console.log(err));
      console.log("pops: " + fatherRes.data.data.createFather.id);

      // create a Guardian on the DB connected to the above orphan
      const guardianRes = await axios
        .post("/", {
          query: CREATE_GUARDIAN_MUTATION,
          variables: {
            firstName: this.guardianFirstName,
            middleName: this.guardianMiddleName,
            lastName: this.guardianLastName,
            gender: this.guardianGender,
            nationality: this.guardianNationality,
            state: this.guardianAddress[0],
            zone: this.guardianAddress[1],
            district: this.guardianAddress[2],
            kebele: this.guardianAddress[3],
            relationToOrphan: this.guardianRelationToOrphan.toLowerCase(),
            telephone: this.guardianTelephone,
            mobile: this.guardianMobile,
            POBox: this.guardianPOBox,
            email: this.guardianEmail,
            job: this.guardianJobTitle,
            dateOfBirth: moment(this.guadrianDateOfBrith).toISOString(),
            monthlyExpense: this.guardianMonthlyExpense,
            guardianIDCardUrl: this.guardianIDCardUrl,
            guardianConfirmationLetterUrl: this.guardianConfirmationLetterUrl,
            orphan: this.orphanId
          }
        })
        .catch(err => console.log(err));
      console.log("guardian: " + guardianRes.data.data.createGuardian.id);

      // create a Mother on the DB connected to the above orphan
      const motherRes = await axios
        .post("/", {
          query: CREATE_MOTHER_MUTATION,
          variables: {
            firstName: this.motherFirstName,
            middleName: this.motherMiddleName,
            lastName: this.motherLastName,
            dateOfBirth: moment(this.motherDateOfBrith).toISOString(),
            dateOfDeath:
              this.motherVitalStatus == "alive"
                ? moment(this.motherDateOfDeath).toISOString()
                : null,
            causeOfDeath: this.motherCauseOfDeath,
            phoneNumber: this.motherPhoneNumber,
            maritalStatus: this.motherMaritalStatus
              ? this.motherMaritalStatus
              : "N_A",
            vitalStatus: this.motherVitalStatus,
            monthlyExpense: this.motherMonthlyExpense,
            orphan: this.orphanId
          }
        })
        .catch(err => console.log(err));
      console.log("moms: " + motherRes.data.data.createMother.id);

      // if the mother is alive creata a MotherJob record
      // on the DB and connect it to the mother above
      if (this.motherVitalStatus == "alive") {
        const motherJobRes = await axios
          .post("/", {
            query: CREATE_MOTHER_JOB_MUTATION,
            variables: {
              jobTitle: this.motherJobTitle,
              monthlyIncome: this.motherMonthlyIncome
                ? parseFloat(this.motherMonthlyIncome)
                : 0,
              initDate: moment(new Date()).toISOString(),
              termDate: null,
              mother: motherRes.data.data.createMother.id
            }
          })
          .catch(err => console.log(err));
        console.log("momsJob: " + motherJobRes.data.data.createMotherJob.id);
      }

      // if the orphan has siblings create a sibling record
      // for each sibling on the DB and
      // connect it to the orphan above
      if (this.siblings.length) {
        this.siblings.forEach(async sibling => {
          const siblingRes = await axios
            .post("/", {
              query: CREATE_SIBLING_MUTATUON,
              variables: {
                age: sibling.Age,
                fullName: sibling.FullName,
                gender: sibling.Gender,
                schoolGrade: sibling.EducationLevel,
                job: sibling.Job,
                maritalStatus: sibling.MaritalStatus,
                orphan: this.orphanId
              }
            })
            .catch(err => console.log(err));
          console.log("sib: " + siblingRes.data.data.createSibling.id);
        });
      }
    },
    testQuery: async function() {
      const axiosRes = await axios.post("/", {
        query: `
          query {
            orphan(id: 15) {
              created_at
              firstName
              dateOfBirth
            }
          }
          `
      });
      console.log(axiosRes.data.data);
    },
    sendMutation: /*async */ function() {
      console.log("sendMutation: From AddOrphan.vue", this.getOrphanFirstName);
    }
  }
};
</script>

<style></style>
