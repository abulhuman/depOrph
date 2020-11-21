<template>
  <b-form>
    <b-form-text class="text-left mb-3"
      >The inputs marked by * are all required</b-form-text
    >
    <b-form-row>
      <b-col class="text-left col-6">
        <b-form-group
          label="Enrollment Status*"
          label-for="educationEnrollmentStatus"
        >
          <b-form-select
            id="educationEnrollmentStatus"
            required
            v-model="educationEnrollmentStatus"
          >
            <template #first>
              <b-form-select-option disabled value="">
                - Select Status -
              </b-form-select-option>
            </template>
            <b-form-select-option value="Enrolled"
              >Enrolled</b-form-select-option
            >
            <b-form-select-option value="Droppped-out"
              >Droppped-out</b-form-select-option
            >
            <b-form-select-option value="Un-Enrolled"
              >Un-Enrolled</b-form-select-option
            >
          </b-form-select>
        </b-form-group>
      </b-col>
    </b-form-row>
    <!-- Enrolled container -->
    <b-container class="p-0" v-if="educationEnrollmentStatus === 'Enrolled'">
      <!-- Enrolled school type -->
      <b-form-row>
        <b-col>
          <b-form-group class="text-left" label="School Type">
            <div class="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                id="publicSchoolTypeRadio"
                name="SchoolTypeRadios"
                class="custom-control-input"
                checked
              />
              <label class="custom-control-label" for="publicSchoolTypeRadio"
                >Public</label
              >
            </div>
            <div class="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                id="privateSchoolTypeRadio"
                name="SchoolTypeRadios"
                class="custom-control-input"
              />
              <label class="custom-control-label" for="privateSchoolTypeRadio"
                >Private</label
              >
            </div>
          </b-form-group>
        </b-col>
      </b-form-row>
      <!-- Enrolled school grade & school name -->
      <b-form-row>
        <b-col class="text-left col-4">
          <b-form-group label="Grade" label-for="grade">
            <b-form-input
              id="grade"
              type="number"
              max="12"
              min="1"
              placeholder="Select school grade ..."
            >
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col class="text-left">
          <b-form-group label="School Name" label-for="schoolName">
            <b-form-input id="schoolName" placeholder="School Name ... ">
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
    </b-container>
    <!-- Droppped-out container -->
    <b-container
      class="p-0"
      v-if="educationEnrollmentStatus === 'Droppped-out'"
    >
      <!-- Droppped-out school grade & reason -->
      <b-form-row>
        <b-col class="text-left col-4">
          <b-form-group label="Grade" label-for="drop-out-grade">
            <b-form-input
              id="drop-out-grade"
              type="number"
              max="12"
              min="1"
              placeholder="Select school grade ..."
            >
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col class="text-left">
          <b-form-group
            label="Reason"
            label-for="drop-out-reason"
            description="State the reason why the child dropped out of school."
          >
            <b-form-input id="drop-out-reason" placeholder="Reason ... ">
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
    </b-container>
    <!-- Un-Enrolled container -->
    <b-container class="p-0" v-if="educationEnrollmentStatus === 'Un-Enrolled'">
      <!-- Un-Enrolled reason -->
      <b-form-row>
        <b-col class="text-left">
          <b-form-group
            label="Reason"
            label-for="un-enrolled-reason"
            description="State the reason why the child is not in school."
          >
            <b-form-input id="un-enrolled-reason" placeholder="Reason ... ">
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
      <b-col cols="1">
        <b-button v-b-toggle.accordion-4 align-h="start" variant="primary"
          >Next</b-button
        >
      </b-col>
    </b-form-row>
  </b-form>
</template>

<script>
export default {
  data() {
    return {
      orphanHobbies: "",
      orphanHobbiesState: null,

      educationEnrollmentStatus: "",
      educationSchoolName: "",
      educationTypeOfSchool: "",
      educationGrade: "", // edd checker
      educationYear: "",
      educationLevel: "",
      educationReason: ""
    };
  }
};
</script>

<style></style>
