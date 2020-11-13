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
        accordion="add-orphan-form-accordion"
        role="tabpanel"
      >
        <b-card-body>
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
        visible
        accordion="add-orphan-form-accordion"
        role="tabpanel"
      >
        <b-card-body>
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
          <GuardianInformationForm />
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import gql from "graphql-tag";
import PersonalInformationForm from "./PersonalInformationForm";
import HealthInformationForm from "./HealthInformationForm";
import EducationInformationForm from "./EducationInformationForm";
import HouseholdInformationForm from "./HouseholdInformationForm";
import GuardianInformationForm from "./GuardianInformationForm";

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
    orphan: gql`
      query {
        orphan(id: 1) {
          created_at
          updated_at
        }
      }
    `
  },
  methods: {
    logOrphan: function() {
      console.log(this.orphan.created_at);
    }
  }
};
</script>

<style></style>
