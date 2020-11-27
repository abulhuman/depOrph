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
          <PersonalInformationForm />
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
          <HealthInformationForm />
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
          <EducationInformationForm />
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
          <HouseholdInformationForm />
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
          <GuardianInformationForm />
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
// import gql from "graphql-tag";
import PersonalInformationForm from "./PersonalInformationForm.vue";
import HealthInformationForm from "./HealthInformationForm";
import EducationInformationForm from "./EducationInformationForm";
import HouseholdInformationForm from "./HouseholdInformationForm";
import GuardianInformationForm from "./GuardianInformationForm";
import { mapActions, mapGetters } from "vuex";
// import { createNamespacedHelpers } from "vuex";

// const { mapActions, mapGetters } = createNamespacedHelpers("addOrphan");

export default {
  data() {
    return {
      orphan: null
    };
  },
  components: {
    PersonalInformationForm,
    HealthInformationForm,
    EducationInformationForm,
    HouseholdInformationForm,
    GuardianInformationForm
  },
  apollo: {
    // orphan: gql`
    //   query {
    //     orphan(id: 1) {
    //       created_at
    //       updated_at
    //     }
    //   }
    // `
  },
  computed: {
    ...mapGetters([
      "getInvalidPersonalForm",
      "getInvalidHealthForm",
      "getInvalidEducationForm",
      "getInvalidHouseholdForm",
      "getInvalidGuardianForm"
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
    logOrphan: function() {
      console.log(this.orphan.created_at);
    }
  }
};
</script>

<style></style>
