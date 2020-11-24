<template>
  <b-form>
    <b-form-text class="text-left mb-3"
      >The inputs marked by * are all required</b-form-text
    >
    <b-form-row>
      <!-- Enrollment Status -->
      <b-col class="text-left col-6">
        <b-form-group
          label="Enrollment Status*"
          label-for="educationEnrollmentStatus"
          invalid-feedback="Please select one"
          :state="educationEnrollmentStatusState"
        >
          <b-form-select
            id="educationEnrollmentStatus"
            @change="resetEnrollmentStatusForm"
            v-model="educationEnrollmentStatus"
            :state="educationEnrollmentStatusState"
          >
            <template #first>
              <b-form-select-option disabled :value="null">
                - Select Status -
              </b-form-select-option>
            </template>
            <b-form-select-option value="Enrolled"
              >Enrolled</b-form-select-option
            >
            <b-form-select-option value="Dropped-out"
              >Dropped-out</b-form-select-option
            >
            <b-form-select-option value="Un-Enrolled"
              >Un-Enrolled</b-form-select-option
            >
          </b-form-select>
        </b-form-group>
      </b-col>
    </b-form-row>
    <!-- Enrolled container -->
    <b-container
      class="p-0 m-0"
      v-if="educationEnrollmentStatus === 'Enrolled'"
    >
      <b-form-row>
        <!-- Enrolled school type -->
        <b-col>
          <b-form-group
            class="text-left"
            label="School Type"
            invalid-feedback="Please select one"
            :state="educationTypeOfSchoolState"
          >
            <b-form-radio-group
              v-model="educationTypeOfSchool"
              name="SchoolTypeRadios"
              :options="typeOfSchoolOptions"
              :state="educationTypeOfSchoolState"
            ></b-form-radio-group>
          </b-form-group>
        </b-col>
      </b-form-row>

      <!-- Enrolled school grade & school name -->
      <b-form-row>
        <!-- Enrolled school level -->
        <b-col class="text-left col-3">
          <b-form-group
            label="Level"
            label-for="level"
            invalid-feedback="Please select one"
            :state="educationLevelState"
          >
            <b-form-select
              id="level"
              :options="educationLevelOptions"
              @input="setYear"
              v-model="educationLevel"
              :state="educationLevelState"
            >
              <template #first>
                <b-form-select-option disabled :value="null">
                  - Select Level -
                </b-form-select-option>
              </template>
            </b-form-select>
          </b-form-group>
        </b-col>
        <!-- Enrolled school grade/year -->
        <b-col class="text-left col-3">
          <b-form-group
            label="Grade / Year"
            label-for="grade"
            invalid-feedback="Please select one"
            :state="educationYearState"
          >
            <b-form-select
              :options="educationYearOptions"
              id="grade"
              v-model="educationYear"
              :state="educationYearState"
            >
              <template #first>
                <b-form-select-option disabled :value="null">
                  - Select Grade / Year -
                </b-form-select-option>
              </template>
            </b-form-select>
          </b-form-group>
        </b-col>
        <!-- Enrolled school name -->
        <b-col class="text-left col-6">
          <b-form-group
            label="School Name"
            label-for="schoolName"
            :state="educationSchoolNameState"
            invalid-feedback="School name is required."
          >
            <b-form-input
              id="schoolName"
              placeholder="School Name ... "
              v-model="educationSchoolName"
              :state="educationSchoolNameState"
            >
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
    </b-container>

    <!-- Dropped-out container -->
    <b-container
      class="p-0 m-0"
      v-if="educationEnrollmentStatus === 'Dropped-out'"
    >
      <!-- Dropped-out school grade & reason -->
      <b-form-row>
        <b-col class="text-left col-4">
          <b-form-group
            label="Grade"
            label-for="drop-out-grade"
            invalid-feedback="Grade is required."
            :state="educationDroppedOutGradeState"
          >
            <b-form-select
              id="drop-out-grade"
              type="number"
              :options="droppedOutGradeOptions"
              placeholder="Select school grade ..."
              v-model="educationDroppedOutGrade"
              :state="educationDroppedOutGradeState"
            >
              <template #first>
                <b-form-select-option disabled :value="null">
                  - Select Grade -
                </b-form-select-option>
              </template>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col class="text-left">
          <b-form-group
            label="Reason"
            label-for="drop-out-reason"
            description="State the reason why the child dropped out of school."
            invalid-feedback="Reason is required."
            :state="educationDroppedOutReasonState"
          >
            <b-form-input
              id="drop-out-reason"
              placeholder="Reason ... "
              v-model="educationDroppedOutReason"
              :state="educationDroppedOutReasonState"
            >
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
    </b-container>
    <!-- Un-Enrolled container -->
    <b-container
      class="p-0 m-0"
      v-if="educationEnrollmentStatus === 'Un-Enrolled'"
    >
      <!-- Un-Enrolled reason -->
      <b-form-row>
        <b-col class="text-left">
          <b-form-group
            label="Reason"
            label-for="un-enrolled-reason"
            description="State the reason why the child is not in school."
            invalid-feedback="Reason is required."
            :state="educationUnEnrolledReasonState"
          >
            <b-form-input
              id="un-enrolled-reason"
              placeholder="Reason ... "
              v-model="educationUnEnrolledReason"
              :state="educationUnEnrolledReasonState"
            >
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
    </b-container>

    <b-form-row>
      <b-col class="text-left">
        <b-form-group label-for="hobbies" label="Hobbies &amp; Ambitions">
          <b-textarea
            id="hobbies"
            class="mt-2"
            placeholder="Mention ..."
            no-resize
            rows="3"
            v-model="orphanHobbies"
          ></b-textarea
        ></b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row align-h="start">
      <b-button
        @click="handleEducationSubmit"
        align-h="start"
        class="ml-1"
        variant="primary"
        >Next</b-button
      >
    </b-form-row>
  </b-form>
</template>

<script>
export default {
  data() {
    return {
      orphanHobbies: "",

      educationEnrollmentStatus: null,
      educationEnrollmentStatusState: null,
      educationSchoolName: null,
      educationSchoolNameState: null,
      typeOfSchoolOptions: [
        { text: "Public", value: "Public" },
        { text: "Private", value: "Private" }
      ],
      educationTypeOfSchool: null,
      educationTypeOfSchoolState: null,
      educationLevelOptions: [
        { value: "KG", text: "Kindergarten" },
        { value: "GS", text: "Grade School" },
        { value: "UG", text: "Undergraduate" },
        { value: "PG", text: "Postgraduate" }
      ],
      educationYearOptions: [
        {
          value: null,
          text: "You need to select an education level first",
          disabled: true
        }
      ],
      educationLevel: null,
      educationLevelState: null,
      educationYear: null,
      educationYearState: null,
      droppedOutGradeOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      educationDroppedOutGrade: null,
      educationDroppedOutGradeState: null,
      educationDroppedOutReason: null,
      educationDroppedOutReasonState: null,
      educationUnEnrolledReason: null,
      educationUnEnrolledReasonState: null
    };
  },
  methods: {
    setYear: function() {
      if (this.educationLevel === "KG") {
        this.educationYearOptions = ["Preparatory", "Nursery", "LKG", "UKG"];
      } else if (this.educationLevel === "GS") {
        this.educationYearOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      } else if (this.educationLevel === "UG" || this.educationLevel === "PG") {
        this.educationYearOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      }
    },
    resetEnrollmentStatusForm: function() {
      // supposed to reset respective inputs if the user decides to change
      // enrollment status after he started filling it in.
      // 📝NOTE: the result of this method is unsatisfactory so it needs to be refactored
      // 🔼RE-NOTE: code refactored and its working as desired
      if (this.educationEnrollmentStatus !== "Enrolled") {
        this.educationSchoolName = null;
        this.educationTypeOfSchool = null;
        this.educationYear = null;
        this.educationLevel = null;
        this.educationSchoolNameState = null;
        this.educationTypeOfSchoolState = null;
        this.educationYearState = null;
        this.educationLevelState = null;
      } else if (this.educationEnrollmentStatus !== "Dropped-out") {
        this.educationDroppedOutGrade = null;
        this.educationDroppedOutGradeState = null;
        this.educationDroppedOutReason = null;
        this.educationDroppedOutReasonState = null;
      } else if (this.educationEnrollmentStatus !== "Un-Enrolled") {
        this.educationUnEnrolledReason = null;
        this.educationUnEnrolledReasonState = null;
      }
    },
    checkEducationEnrollmentStatusValidity: function() {
      const validEducationEnrollmentStatus =
        this.educationEnrollmentStatus !== null;
      this.educationEnrollmentStatusState = validEducationEnrollmentStatus;
      return validEducationEnrollmentStatus;
    },
    checkEducationTypeOfSchoolValidity: function() {
      if (this.educationEnrollmentStatus === "Enrolled") {
        const validEducationTypeOfSchool = this.educationTypeOfSchool !== null;
        this.educationTypeOfSchoolState = validEducationTypeOfSchool;
        return validEducationTypeOfSchool;
      } else return true;
    },
    checkEducationLevelValidity: function() {
      if (this.educationEnrollmentStatus === "Enrolled") {
        const validEducationLevel = this.educationLevel !== null;
        this.educationLevelState = validEducationLevel;
        return validEducationLevel;
      } else return true;
    },
    checkEducationYearValidity: function() {
      if (this.educationEnrollmentStatus === "Enrolled") {
        const validEducationYear = this.educationYear !== null;
        this.educationYearState = validEducationYear;
        return validEducationYear;
      } else return true;
    },
    checkEducationSchoolNameValidity: function() {
      if (this.educationEnrollmentStatus === "Enrolled") {
        const validEducationSchoolName = this.educationSchoolName !== null;
        this.educationSchoolNameState = validEducationSchoolName;
        return validEducationSchoolName;
      } else return true;
    },
    checkEducationDroppedOutGradeValidity: function() {
      if (this.educationEnrollmentStatus === "Dropped-out") {
        const validEducationDroppedOutGrade =
          this.educationDroppedOutGrade !== null;
        this.educationDroppedOutGradeState = validEducationDroppedOutGrade;
        return validEducationDroppedOutGrade;
      } else return true;
    },
    checkEducationDroppedOutReasonValidity: function() {
      const validEducationDroppedOutReason =
        this.educationDroppedOutReason !== null;
      if (this.educationEnrollmentStatus === "Dropped-out") {
        this.educationDroppedOutReasonState = validEducationDroppedOutReason;
        return validEducationDroppedOutReason;
      } else return true;
    },
    checkEducationUnEnrolledReasonValidity: function() {
      if (this.educationEnrollmentStatus === "Un-Enrolled") {
        const validEducationUnEnrolledReason =
          this.educationUnEnrolledReason !== null;
        this.educationUnEnrolledReasonState = validEducationUnEnrolledReason;
        return validEducationUnEnrolledReason;
      } else return true;
    },

    handleEducationSubmit: function() {
      if (
        this.checkEducationEnrollmentStatusValidity() &&
        this.checkEducationTypeOfSchoolValidity() &&
        this.checkEducationLevelValidity() &&
        this.checkEducationYearValidity() &&
        this.checkEducationSchoolNameValidity() &&
        this.checkEducationDroppedOutGradeValidity() &&
        this.checkEducationDroppedOutReasonValidity() &&
        this.checkEducationUnEnrolledReasonValidity()
      ) {
        this.$root.$emit("bv::toggle::collapse", "accordion-4");
      }
    }
  }
};
</script>

<style></style>
