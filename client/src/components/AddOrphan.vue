<template>
  <!-- AddOrphan accordion form -->
  <div class="accordion" role="tablist">
    <!-- PERSONAL INFORMATION -->
    <b-card no-body>
      <b-card-header header-tag="header" class="p-1" role="tab">
        <!-- button that toggles the personal information section -->
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
          <!-- PersonalInformationForm component with a custom 'personal-info-complete'
               event( has a payload[includes all personal data],details on the PersonalInformationForm
               component ) that triggers the 'onPersonalInfoComplete' method  -->
          <PersonalInformationForm
            @personal-info-complete="onPersonalInfoComplete"
          />
        </b-card-body>
      </b-collapse>
    </b-card>
    <!-- HEALTH INFORMATION -->
    <b-card no-body>
      <b-card-header header-tag="header" class="p-1" role="tab">
        <!-- button that toggles the health information section -->
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
          <!-- HealthInformationForm component with a custom 'health-info-complete'
               event( has a payload[includes all health data],details on the HealthInformationForm
               component ) that triggers the 'onHealthInfoComplete' method  -->
          <HealthInformationForm @health-info-complete="onHealthInfoComplete" />
        </b-card-body>
      </b-collapse>
    </b-card>
    <!-- EDUCATION INFORMATION -->
    <b-card no-body>
      <b-card-header header-tag="header" class="p-1" role="tab">
        <!-- button that toggles the education information section -->
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
          <!-- EducationInformationForm component with a custom 'education-info-complete'
               event( has a payload[includes all education data],details on the EducationInformationForm
               component ) that triggers the 'onEducationInfoComplete' method  -->
          <EducationInformationForm
            @education-info-complete="onEducationInfoComplete"
          />
        </b-card-body>
      </b-collapse>
    </b-card>
    <!-- HOUSEHOLD INFORMATION -->
    <b-card no-body>
      <b-card-header header-tag="header" class="p-1" role="tab">
        <!-- button that toggles the household information section -->
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
          <!-- HouseholdInformationForm component with a custom 'household-info-complete'
               event( has a payload[includes all household data],details on the HouseholdInformationForm
               component ) that triggers the 'onHouseholdInfoComplete' method  -->
          <HouseholdInformationForm
            @household-info-complete="onHouseholdInfoComplete"
          />
        </b-card-body>
      </b-collapse>
    </b-card>
    <!-- GUARDIAN INFORMATION -->
    <b-card no-body>
      <b-card-header header-tag="header" class="p-1" role="tab">
        <!-- button that toggles the guardian information section -->
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
          <!-- GuardianInformationForm component with a custom 'guardian-info-complete'
               event( has a payload[includes all guardian data],details on the GuardianInformationForm
               component ) that triggers the 'onGuardianInfoComplete' method  -->
          <GuardianInformationForm
            @guardian-info-complete="onGuardianInfoComplete"
          />
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
// import necessary components
import PersonalInformationForm from "./PersonalInformationForm.vue";
import HealthInformationForm from "./HealthInformationForm";
import EducationInformationForm from "./EducationInformationForm";
import HouseholdInformationForm from "./HouseholdInformationForm";
import GuardianInformationForm from "./GuardianInformationForm";

// import actions and getters fom vuex
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import moment from "moment";

// import query strings
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
      // id to be supplied to all the consequent axios requests
      // that create data related to the orphan
      //  and this id takes the orphan's id from
      // the request that creates a new orphan see line#555

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
    // add vuex getters as computed property using spread operator ( ... )
    ...mapGetters([
      "getInvalidPersonalForm",
      "getInvalidHealthForm",
      "getInvalidEducationForm",
      "getInvalidHouseholdForm",
      "getInvalidGuardianForm"
    ])
  },
  methods: {
    // add vuex actions as methods using spread operator ( ... )
    ...mapActions([
      "setInvalidPersonalForm",
      "setInvalidHealthForm",
      "setInvalidEducationForm",
      "setInvalidHouseholdForm",
      "setInvalidGuardianForm"
    ]),
    onPersonalInfoComplete: function({
      // extract personal info from personal-info-complete event payload
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
      // set them to their local versions
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
      // extract health info from health-info-complete event payload
      orphanPhysicalHealth,
      orphanPsychologicalHealth,
      orphanOtherHealthIssues
    }) {
      // set them to their local versions
      this.orphanPhysicalHealth = orphanPhysicalHealth;
      this.orphanPsychologicalHealth = orphanPsychologicalHealth;
      this.orphanOtherHealthIssues = orphanOtherHealthIssues;
    },
    onEducationInfoComplete: function({
      // extract education info from education-info-complete event payload
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
      // extract household info from household-info-complete event payload
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
      // set them to their local versions
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
      // extract guardian info from guardian-info-complete event payload
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
      // set them to their local versions
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

      // check if all the form sections' validation rules are met
      if (
        !this.getInvalidPersonalForm &&
        !this.getInvalidHealthForm &&
        !this.getInvalidEducationForm &&
        !this.getInvalidHouseholdForm &&
        !this.getInvalidGuardianForm
      ) {
        // then call sendMutation method on line#526
        this.sendMutation();
      } else {
        // if not display error
        console.error(`The form is not complete!!`);
      }
    },
    orphanRes: async function() {
      // unused function. only in testing mode
      // create an orphan on the DB
      return await axios
        .post("/graphql/", {
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
      // a method to determine what value should the year property be assigned to
      // enrollment year for enrolled orphan
      // dropout year for droppedout orphan
      // empty string for unenrolled orphan
      if (this.educationEnrollmentStatus == "enrolled") {
        return this.educationYear;
      } else if (this.educationEnrollmentStatus == "droppedout") {
        return parseInt(this.educationDroppedOutGrade);
      } else return "";
    },
    level: function() {
      // a method to determine what value should the level property be assigned to
      // I believe the method is self-evident
      // N_A is for unenrolled orphans
      if (this.educationLevel === "KG") return "preSchool";
      else if (this.educationLevel === "GS") return "gradeSchool";
      else if (this.educationLevel === "UG") return "underGraduate";
      else if (this.educationLevel === "PG") return "postGraduate";
      else return "N_A";
    },
    reason: function() {
      // a method to determine what value should the reason property be assigned to
      // dropout reason for dropout orphans
      // unenollment reason for unenrolled orphans
      // empty string for enrolled orphans
      if (this.educationDroppedOutReason) return this.educationDroppedOutReason;
      else if (this.educationUnEnrolledReason)
        return this.educationUnEnrolledReason;
      else return "";
    },
    sendMutation: async function() {
      // create a new orphan on the server
      // with all the appropriate data conversions
      // for dates and numerical values
      const orphanRes = await axios
        .post("/graphql/", {
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
      // set the id of the created orphan
      // that we got from the server to the local property
      this.orphanId = orphanRes.data.data.createOrphan.id;
      console.log("orphan: " + this.orphanId);

      // create an Iga_property on the DB connected to the above orphan
      // with all the appropriate data conversions
      // for dates and numerical values
      const igaRes = await axios
        .post("/graphql/", {
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
      // with all the appropriate data conversions
      // for dates and numerical values
      const offDocsRes = await axios
        .post("/graphql/", {
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
      // with all the appropriate data conversions
      // for dates and numerical values
      const educationRes = await axios
        .post("/graphql/", {
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
      console.log("education: " + educationRes.data.data.createEducation.id);

      // create a Father on the DB connected to the above orphan
      // with all the appropriate data conversions
      // for dates and numerical values
      const fatherRes = await axios
        .post("/graphql/", {
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
      console.log("father: " + fatherRes.data.data.createFather.id);

      // create a Guardian on the DB connected to the above orphan
      // with all the appropriate data conversions
      // for dates and numerical values
      const guardianRes = await axios
        .post("/graphql/", {
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
      // with all the appropriate data conversions
      // for dates and numerical values
      const motherRes = await axios
        .post("/graphql/", {
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
      console.log("mother: " + motherRes.data.data.createMother.id);

      // if the mother is alive creata a MotherJob record
      // on the DB and connect it to the mother above
      // with all the appropriate data conversions
      // for dates and numerical values
      if (this.motherVitalStatus == "alive") {
        const motherJobRes = await axios
          .post("/graphql/", {
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
      // with all the appropriate data conversions
      // for dates and numerical values
      if (this.siblings.length) {
        this.siblings.forEach(async sibling => {
          const siblingRes = await axios
            .post("/graphql/", {
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
    }
  }
};
</script>

<style></style>
