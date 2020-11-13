<template>
  <b-form>
    <h5 class="text-left">Father</h5>
    <b-form-row>
      <b-col class="text-left">
        <b-form-group label="Date of Birth" label-for="fatherDateOfBrith">
          <b-form-input
            type="date"
            required
            id="fatherDateOfBrith"
            v-model="tmpFatherDateOfBrith"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col class="text-left">
        <b-form-group label="Date of Death" label-for="fatherDateOfDeath">
          <b-form-input
            type="date"
            required
            id="fatherDateOfDeath"
            v-model="tmpFatherDateOfDeath"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col class="text-left">
        <b-form-group label="Cause of Death" label-for="fatherCauseOfDeath">
          <b-form-input
            id="fatherCauseOfDeath"
            placeholder="Cause of Death ..."
            v-model="fatherCauseOfDeath"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col class="text-left">
        <b-form-group label="Job Title" label-for="fatherJobTitle">
          <b-form-input
            id="fatherJobTitle"
            placeholder="Job Title ..."
            v-model="fatherJobTitle"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col class="text-left">
        <b-form-group label="Monthly Income" label-for="fatherMonthlyIncome">
          <b-form-input
            id="fatherMonthlyIncome"
            placeholder="Monthly Income ..."
            v-model="fatherMonthlyIncome"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col class="text-left">
        <b-form-group
          label="Death Certificate (Upload)"
          label-for="fatherDeathCertificate"
        >
          <b-form-file
            id="fatherDeathCertificate"
            placeholder="Upload Death Certificate ..."
            accept="image/*"
          >
          </b-form-file>
        </b-form-group>
      </b-col>
    </b-form-row>
    <h5 class="text-left">Mother</h5>
    <b-form-row>
      <b-col class="text-left">
        <b-form-group label="First Name" label-for="motherFirstName">
          <b-form-input
            id="motherFirstName"
            placeholder="First Name ..."
            required
            v-model="motherFirstName"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col class="text-left">
        <b-form-group label="Middle Name" label-for="motherMiddleName">
          <b-form-input
            id="motherMiddleName"
            placeholder="Middle Name ..."
            required
            v-model="motherMiddleName"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col class="text-left">
        <b-form-group label="Last Name" label-for="motherLastName">
          <b-form-input
            id="motherLastName"
            placeholder="Last Name ..."
            required
            v-model="motherLastName"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col class="text-left">
        <b-form-group label="Date of Birth" label-for="motherDateOfBrith">
          <b-form-input
            type="date"
            required
            id="motherDateOfBrith"
            v-model="tmpMotherDateOfBirth"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col class="text-left">
        <b-form-group label="Vital Status" label-for="motherVitalStatus">
          <b-form-select
            id="motherVitalStatus"
            required
            v-model="motherVitalStatus"
          >
            <template #first>
              <b-form-select-option disabled value="">
                - Select Status -
              </b-form-select-option>
            </template>
            <b-form-select-option value="Alive">Alive</b-form-select-option>
            <b-form-select-option value="Passed Away"
              >Passed Away</b-form-select-option
            >
          </b-form-select>
        </b-form-group>
      </b-col>
    </b-form-row>
    <!-- alive container -->
    <b-container class="p-0" v-if="motherVitalStatus === 'Alive'">
      <b-form-row>
        <b-col class="text-left">
          <b-form-group label="Marital status">
            <b-form-radio
              name="motherMaritalStatusRadios"
              size="sm"
              plain
              value="widow"
              required
              v-model="motherMaritalStatus"
              >Widow</b-form-radio
            >
            <b-form-radio
              name="motherMaritalStatusRadios"
              size="sm"
              plain
              value="remarried"
              required
              v-model="motherMaritalStatus"
              >Remarried</b-form-radio
            >
          </b-form-group></b-col
        >
      </b-form-row>
      <b-form-row>
        <b-col class="text-left">
          <b-form-group label="Job Title" label-for="motherJobTitle">
            <b-form-input
              id="motherJobTitle"
              placeholder="Job Title ..."
              v-model="motherJobTitle"
            >
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col class="text-left">
          <b-form-group label="Monthly Income" label-for="motherMonthlyIncome">
            <b-form-input
              id="motherMonthlyIncome"
              placeholder="Monthly Income ..."
              v-model="motherMonthlyIncome"
            >
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col class="text-left">
          <b-form-group
            label="Source(s) of Income"
            label-for="motherSourceOfIncome"
            description="Enter Source(s) of Income separated by comma(,)"
          >
            <b-form-tags
              id="motherSourceOfIncome"
              separator=","
              tag-variant="info"
              placeholder="Add Source(s) of Income ..."
              v-model="motherSourceOfIncome"
            >
            </b-form-tags>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col class="text-left">
          <b-form-group
            label="Monthly Expense"
            label-for="motherMonthlyExpense"
          >
            <b-form-input
              id="motherMonthlyExpense"
              placeholder="Monthly Expense ..."
              required
              v-model="motherMonthlyExpense"
            >
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col class="text-left">
          <b-form-group label="Phone Number" label-for="motherPhoneNumber">
            <b-form-input
              id="motherPhoneNumber"
              placeholder="Phone Number ..."
              required
              v-model="motherPhoneNumber"
            >
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
    </b-container>
    <!-- passed away container -->
    <b-container class="p-0" v-if="motherVitalStatus === 'Passed Away'">
      <b-form-row>
        <b-col class="text-left col-4">
          <b-form-group label="Cause of Death" label-for="motherCauseOfDeath">
            <b-form-input
              id="motherCauseOfDeath"
              placeholder="Cause of Death ..."
              v-model="motherCauseOfDeath"
            >
            </b-form-input> </b-form-group
        ></b-col>
        <b-col class="text-left col-4">
          <b-form-group label="Date of Death" label-for="motherDateOfDeath">
            <b-form-input
              type="date"
              id="motherDateOfDeath"
              placeholder="Select date ..."
              v-model="tmpMotherDateOfDeath"
            >
            </b-form-input> </b-form-group
        ></b-col>
      </b-form-row>
    </b-container>

    <h5 class="text-left">Siblings</h5>
    <b-form-row>
      <b-col class="text-left col-4">
        <b-form-group
          label="Number of Sponsored Siblings"
          label-for="orphanNumberOfSponsoredSiblings"
        >
          <b-form-input
            id="orphanNumberOfSponsoredSiblings"
            placeholder="Number of Sponsored Siblings ..."
            required
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col class="text-left col-4 mt-2">
        <b-button v-b-modal.modal-add-sibling class="mt-4"
          >Add Sibling | Details</b-button
        >
        <b-modal
          id="modal-add-sibling"
          centered
          title="Add Sibling Details"
          @ok.prevent="handleSiblingSubmit"
          @cancel.prevent="handleSiblingCancel"
        >
          <form ref="form" @submit.stop.prevent="handleSiblingSubmit">
            <b-form-row>
              <b-col class="text-left">
                <b-form-group
                  label="Full Name"
                  label-for="siblingFullName"
                  invalid-feedback="Name is required"
                >
                  <b-form-input
                    id="siblingFullName"
                    placeholder="Full Name ..."
                    :state="siblingFullNameState"
                    required
                    ref="siblingFullName"
                    @input="update(newSibling, 'FullName', $event)"
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-form-row>

            <b-form-row>
              <b-col class="text-left col-4">
                <b-form-group
                  label="Gender"
                  label-for="siblingGender"
                  invalid-feedback="Gender is required"
                >
                  <b-form-select
                    id="siblingGender"
                    :state="siblingGenderState"
                    ref="siblingGender"
                    required
                    @input="update(newSibling, 'Gender', $event)"
                  >
                    <template #first>
                      <b-form-select-option disabled value="">
                        - Select Gender -
                      </b-form-select-option>
                    </template>
                    <b-form-select-option value="M">Male</b-form-select-option>
                    <b-form-select-option value="F"
                      >Female</b-form-select-option
                    >
                  </b-form-select>
                </b-form-group>
              </b-col>
              <b-col class="text-left">
                <b-form-group
                  label="Age"
                  label-for="siblingAge"
                  invalid-feedback="Age is required"
                >
                  <b-form-input
                    id="siblingAge"
                    placeholder="Age ..."
                    :state="siblingAgeState"
                    required
                    ref="siblingAge"
                    type="number"
                    @input="update(newSibling, 'Age', $event)"
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-form-row>

            <b-form-row>
              <b-col class="text-left">
                <b-form-group
                  label="Education Level | School Grade"
                  label-for="siblingSchoolGrade"
                >
                  <b-form-input
                    id="siblingSchoolGrade"
                    placeholder="Education Level | School Grade ..."
                    @input="update(newSibling, 'EducationLevel', $event)"
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-form-row>

            <b-form-row>
              <b-col class="text-left">
                <b-form-group label="Job" label-for="siblingJob">
                  <b-form-input
                    id="siblingJob"
                    placeholder="Job ..."
                    @input="update(newSibling, 'Job', $event)"
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-form-row>

            <b-form-row>
              <b-col class="text-left">
                <b-form-group
                  label="Marital Status"
                  label-for="siblingMaritalStatus"
                  invalid-feedback="Marital Status is required"
                >
                  <b-form-select
                    id="siblingMaritalStatus"
                    :state="siblingMaritalStatusState"
                    required
                    ref="siblingMaritalStatus"
                    @input="update(newSibling, 'MaritalStatus', $event)"
                  >
                    <template #first>
                      <b-form-select-option disabled value="">
                        - Select Marital Status -
                      </b-form-select-option>
                    </template>
                    <b-form-select-option value="Un-Married"
                      >Un-Married</b-form-select-option
                    >
                    <b-form-select-option value="Married"
                      >Married</b-form-select-option
                    >
                    <b-form-select-option value="Divorced"
                      >Divorced</b-form-select-option
                    >
                  </b-form-select>
                </b-form-group>
              </b-col>
            </b-form-row>
          </form>
        </b-modal>
      </b-col>
    </b-form-row>
    <b-table
      v-if="siblings.length"
      head-variant="light"
      table-variant="info"
      sticky-header
      bordered
      clickable
      hover
      :items="siblings"
      class="text-left col p-0 border-rounded"
    >
    </b-table>
    <h5 class="text-left">House and Property Info</h5>
    <b-form-row>
      <b-col class="text-left">
        <b-form-group label="House ownership">
          <b-form-radio
            name="IgaOwnershipStatusRadios"
            size="sm"
            class="ml-2"
            plain
            value="Privately owned"
            v-model="igaOwnershipStatus"
            required
            >Privately owned</b-form-radio
          >
          <b-form-radio
            name="IgaOwnershipStatusRadios"
            size="sm"
            class="ml-2"
            plain
            value="Rental"
            v-model="igaOwnershipStatus"
            required
            >Rental</b-form-radio
          >
          <b-form-radio
            name="IgaOwnershipStatusRadios"
            size="sm"
            class="ml-2"
            plain
            value="With Relatives"
            v-model="igaOwnershipStatus"
            required
            >With Relatives</b-form-radio
          >
          <b-form-radio
            name="IgaOwnershipStatusRadios"
            size="sm"
            class="ml-2"
            plain
            value="Dependent"
            v-model="igaOwnershipStatus"
            >Dependent</b-form-radio
          >
          <b-input-group>
            <b-input-group-prepend is-text>
              <input
                type="radio"
                name="IgaOwnershipStatusRadios"
                class="ml-n1"
                value="Other"
                required
              />
              <label
                class="form-check-label mb-0 ml-2"
                for="physicalHealth-disabledRadio"
                >Other</label
              >
            </b-input-group-prepend>
            <b-form-input
              for="physicalHealth-disabledRadio"
              placeholder="Mention housing situation ... "
              v-model="igaOwnershipStatus"
              required
            ></b-form-input>
          </b-input-group> </b-form-group
      ></b-col>
    </b-form-row>
    <b-form-row>
      <b-col class="text-left">
        <b-form-group
          label-for="hobbies"
          label="Other Properties Owned by the Family"
        >
          <b-textarea
            id="igaOtherProperty"
            class="mt-2"
            placeholder="Mention if any ..."
            no-resize
            rows="3"
            v-model="igaOtherProperty"
          ></b-textarea
        ></b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row align-h="start">
      <b-col cols="1">
        <b-button v-b-toggle.accordion-5 align-h="start" variant="primary"
          >Next</b-button
        >
      </b-col>
    </b-form-row>
  </b-form>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      orphanNumberOfSponserdSiblings: "",

      fatherCauseOfDeath: "",
      fatherJobTitle: "",
      fatherMonthlyIncome: "",

      tmpFatherDateOfBrith: "", // turned into computed props
      tmpFatherDateOfDeath: "", // turned into computed props

      motherFirstName: "",
      motherMiddleName: "",
      motherLastName: "",
      motherVitalStatus: "", // TODO:DONE add to UI
      motherCauseOfDeath: "", // TODO:DONE add to schema
      motherMaritalStatus: "",
      motherJobTitle: "",
      motherMonthlyExpense: "",
      motherMonthlyIncome: "",
      motherSourceOfIncome: [],
      motherPhoneNumber: "",

      tmpMotherDateOfBirth: "", // add to UI, turned into computed props
      tmpMotherDateOfDeath: "", // TODO:DONE add to schema, turned into computed props

      newSibling: {},

      siblingFullNameState: null,
      siblingGenderState: null,
      siblingAgeState: null,
      siblingMaritalStatusState: null,
      siblings: [],

      igaOwnershipStatus: "",
      igaOtherProperty: ""
    };
  },
  computed: {
    fatherDateOfBrith: function() {
      return moment(this.tmpFatherDateOfBrith).format();
    },
    fatherDateOfDeath: function() {
      return moment(this.tmpFatherDateOfDeath).format();
    },
    motherDateOfBrith: function() {
      return moment(this.tmpMotherDateOfBrith).format();
    },
    motherDateOfDeath: function() {
      return moment(this.tmpMotherDateOfDeath).format();
    }
  },
  methods: {
    addSibling: function() {
      if (
        this.newSibling.FullName &&
        this.newSibling.Gender &&
        this.newSibling.Age &&
        this.newSibling.MaritalStatus
      ) {
        const tempObj = { ...this.newSibling };
        this.siblings.push(tempObj);
        this.newSibling.Age = null;
        this.newSibling.FullName = null;
        this.newSibling.Gender = null;
        this.newSibling.EducationLevel = null;
        this.newSibling.Job = null;
        this.newSibling.MaritalStatus = null;
      }
    },
    update: function(obj, prop, event) {
      this.$set(obj, prop, event);
    },
    // Add sibling form validation
    checkSiblingFullNameValidity: function() {
      const validSiblingFullName = this.$refs.siblingFullName.checkValidity();
      this.siblingFullNameState = validSiblingFullName;
      return validSiblingFullName;
    },
    checkSiblingGenderValidity: function() {
      if (this.newSibling.Gender === "M" || this.newSibling.Gender === "F") {
        this.siblingGenderState = true;
      } else {
        this.siblingGenderState = false;
      }
      return this.siblingGenderState;
    },
    checkSiblingAgeValidity: function() {
      const validSiblingAge = this.$refs.siblingAge.checkValidity();
      this.siblingAgeState = validSiblingAge;
      return validSiblingAge;
    },
    checkSiblingMaritalStatusValidity: function() {
      if (
        this.newSibling.MaritalStatus === "Un-Married" ||
        this.newSibling.MaritalStatus === "Married" ||
        this.newSibling.MaritalStatus === "Divorced"
      ) {
        this.siblingMaritalStatusState = true;
      } else {
        this.siblingMaritalStatusState = false;
      }
      return this.siblingMaritalStatusState;
    },
    handleSiblingSubmit: function() {
      if (
        !this.checkSiblingFullNameValidity() ||
        !this.checkSiblingGenderValidity() ||
        !this.checkSiblingAgeValidity() ||
        !this.checkSiblingMaritalStatusValidity()
      ) {
        return;
      }
      this.addSibling();
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-add-sibling");
      });
      // Reset form state
      this.siblingFullNameState = null;
      this.siblingGenderState = null;
      this.siblingAgeState = null;
      this.siblingMaritalStatusState = null;
    },
    handleSiblingCancel: function() {
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
      // Reset form state
      this.siblingFullNameState = null;
      this.siblingGenderState = null;
      this.siblingAgeState = null;
      this.siblingMaritalStatusState = null;
    }
  }
};
</script>

<style></style>
