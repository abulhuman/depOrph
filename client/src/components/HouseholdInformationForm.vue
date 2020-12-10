<template>
  <b-form>
    <b-form-text class="text-left mb-3"
      >The inputs marked by * are all required</b-form-text
    >
    <h5 class="text-left">Father</h5>
    <b-form-row>
      <b-col class="text-left">
        <b-form-group
          label="Date of Birth*"
          label-for="fatherDateOfBrith"
          invalid-feedback="Date of birth is required"
          :state="tmpFatherDateOfBirthState"
        >
          <b-form-input
            type="date"
            id="fatherDateOfBrith"
            :state="tmpFatherDateOfBirthState"
            v-model="tmpFatherDateOfBirth"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col class="text-left">
        <b-form-group
          label="Date of Death*"
          label-for="fatherDateOfDeath"
          invalid-feedback="Date of death is required"
          :state="tmpFatherDateOfDeathState"
        >
          <b-form-input
            type="date"
            id="fatherDateOfDeath"
            :state="tmpFatherDateOfDeathState"
            v-model="tmpFatherDateOfDeath"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col class="text-left">
        <b-form-group
          label="Cause of Death*"
          label-for="fatherCauseOfDeath"
          :state="fatherCauseOfDeathState"
          invalid-feedback="Cause of death is required and must contain at least 3 characters."
        >
          <b-form-input
            id="fatherCauseOfDeath"
            placeholder="Cause of Death ..."
            :state="fatherCauseOfDeathState"
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
        <b-form-group
          label="Monthly Income*"
          label-for="fatherMonthlyIncome"
          invalid-feedback="Income is required and must be in numbers."
          :state="fatherMonthlyIncomeState"
        >
          <b-form-input
            id="fatherMonthlyIncome"
            placeholder="Monthly Income ..."
            :state="fatherMonthlyIncomeState"
            v-model="fatherMonthlyIncome"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col class="text-left">
        <b-form-group
          label="Death Certificate (Upload)*"
          label-for="fatherDeathCertificate"
          invalid-feedback="Death certificate is required."
          :state="fatherDeathCertificateState"
        >
          <b-form-file
            id="fatherDeathCertificate"
            placeholder="Upload Death Certificate ..."
            accept="image/*"
            :state="fatherDeathCertificateState"
            v-model="fatherDeathCertificate"
          >
          </b-form-file>
        </b-form-group>
      </b-col>
    </b-form-row>
    <h5 class="text-left">Mother</h5>
    <b-form-row>
      <b-col class="text-left">
        <b-form-group
          label="First Name*"
          label-for="motherFirstName"
          invalid-feedback="First Name is required, must be more than 2 characters long and contain letters ONLY."
        >
          <b-form-input
            id="motherFirstName"
            placeholder="First Name ..."
            :state="motherFirstNameState"
            v-model="motherFirstName"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col class="text-left">
        <b-form-group
          label="Middle Name*"
          label-for="motherMiddleName"
          invalid-feedback="Middle Name is required, must be more than 2 characters long and contain letters ONLY."
        >
          <b-form-input
            id="motherMiddleName"
            placeholder="Middle Name ..."
            :state="motherMiddleNameState"
            v-model="motherMiddleName"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col class="text-left">
        <b-form-group
          label="Last Name*"
          label-for="motherLastName"
          invalid-feedback="Last Name is required, must be more than 2 characters long and contain letters ONLY."
        >
          <b-form-input
            id="motherLastName"
            placeholder="Last Name ..."
            :state="motherLastNameState"
            v-model="motherLastName"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col class="text-left">
        <b-form-group
          label="Date of Birth*"
          label-for="motherDateOfBrith"
          invalid-feedback="Date of birth is required"
          :state="tmpMotherDateOfBirthState"
        >
          <b-form-input
            type="date"
            id="motherDateOfBrith"
            :state="tmpMotherDateOfBirthState"
            v-model="tmpMotherDateOfBirth"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col class="text-left">
        <b-form-group
          label="Vital Status*"
          label-for="motherVitalStatus"
          :state="motherVitalStatusState"
          invalid-feedback="Vital Status is required"
        >
          <b-form-select
            id="motherVitalStatus"
            :state="motherVitalStatusState"
            v-model="motherVitalStatus"
          >
            <template #first>
              <b-form-select-option disabled value="">
                - Select Status -
              </b-form-select-option>
            </template>
            <b-form-select-option value="alive">Alive</b-form-select-option>
            <b-form-select-option value="passed"
              >Passed Away</b-form-select-option
            >
          </b-form-select>
        </b-form-group>
      </b-col>
    </b-form-row>
    <!-- alive container -->
    <b-container class="p-0 m-0" v-if="motherVitalStatus === 'alive'">
      <b-form-row>
        <b-col class="text-left">
          <b-form-group
            label="Marital status*"
            :state="motherMaritalStatusState"
            invalid-feedback="Please select one."
          >
            <b-form-radio
              name="motherMaritalStatusRadios"
              size="sm"
              plain
              value="widow"
              :state="motherMaritalStatusState"
              v-model="motherMaritalStatus"
              >Widow</b-form-radio
            >
            <b-form-radio
              name="motherMaritalStatusRadios"
              size="sm"
              plain
              value="remarried"
              :state="motherMaritalStatusState"
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
          <b-form-group
            label="Monthly Income"
            label-for="motherMonthlyIncome"
            :state="motherMonthlyIncomeState"
            invalid-feedback="Monthly income must be in numbers."
          >
            <b-form-input
              id="motherMonthlyIncome"
              placeholder="Monthly Income ..."
              :state="motherMonthlyIncomeState"
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
            :state="motherMonthlyExpenseState"
            invalid-feedback="Monthly expense must be in numbers."
          >
            <b-form-input
              id="motherMonthlyExpense"
              placeholder="Monthly Expense ..."
              :state="motherMonthlyExpenseState"
              v-model="motherMonthlyExpense"
            >
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col class="text-left">
          <b-form-group
            label="Phone Number*"
            label-for="motherPhoneNumber"
            :state="motherPhoneNumberState"
            invalid-feedback="Phone number is required and must be 10 digit numbers."
          >
            <b-form-input
              id="motherPhoneNumber"
              placeholder="Phone Number ..."
              :state="motherPhoneNumberState"
              v-model="motherPhoneNumber"
            >
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
    </b-container>
    <!-- passed away container -->
    <b-container class="p-0 m-0" v-if="motherVitalStatus === 'passed'">
      <b-form-row>
        <b-col class="text-left col-4">
          <b-form-group
            label="Cause of Death*"
            label-for="motherCauseOfDeath"
            :state="motherCauseOfDeathState"
            invalid-feedback="Cause of death is required and must contain at least 3 characters."
          >
            <b-form-input
              id="motherCauseOfDeath"
              placeholder="Cause of Death ..."
              :state="motherCauseOfDeathState"
              v-model="motherCauseOfDeath"
            >
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col class="text-left col-4">
          <b-form-group
            label="Date of Death*"
            label-for="motherDateOfDeath"
            invalid-feedback="Date of death is required"
            :state="tmpMotherDateOfDeathState"
          >
            <b-form-input
              type="date"
              id="motherDateOfDeath"
              placeholder="Select date ..."
              :state="tmpMotherDateOfDeathState"
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
          label="Number of Sponsored Siblings*"
          label-for="orphanNumberOfSponsoredSiblings"
        >
          <b-form-input
            id="orphanNumberOfSponsoredSiblings"
            placeholder="Number of Sponsored Siblings ..."
            type="number"
            min="0"
            v-model="orphanNumberOfSponsoredSiblings"
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
        <b-form-group
          label="House Ownership*"
          :state="tmpIgaOwnershipStatusRadioState"
          invalid-feedback="Please select one."
        >
          <b-form-radio
            name="IgaOwnershipStatusRadios"
            size="sm"
            class="ml-2"
            plain
            value="Privately owned"
            v-model="tmpIgaOwnershipStatusRadio"
            :state="tmpIgaOwnershipStatusRadioState"
            >Privately owned</b-form-radio
          >
          <b-form-radio
            name="IgaOwnershipStatusRadios"
            size="sm"
            class="ml-2"
            plain
            value="Rental"
            v-model="tmpIgaOwnershipStatusRadio"
            :state="tmpIgaOwnershipStatusRadioState"
            >Rental</b-form-radio
          >
          <b-form-radio
            name="IgaOwnershipStatusRadios"
            size="sm"
            class="ml-2"
            plain
            value="With Relatives"
            v-model="tmpIgaOwnershipStatusRadio"
            :state="tmpIgaOwnershipStatusRadioState"
            >With Relatives</b-form-radio
          >
          <b-form-radio
            name="IgaOwnershipStatusRadios"
            size="sm"
            class="ml-2"
            plain
            value="Dependent"
            v-model="tmpIgaOwnershipStatusRadio"
            :state="tmpIgaOwnershipStatusRadioState"
            >Dependent</b-form-radio
          >
          <b-input-group>
            <b-input-group-prepend is-text>
              <input
                type="radio"
                name="IgaOwnershipStatusRadios"
                class="ml-n1"
                value="Other"
                v-model="tmpIgaOwnershipStatusRadio"
                :state="tmpIgaOwnershipStatusRadioState"
              />
              <label
                class="form-check-label mb-0 ml-2"
                for="igaOwnershipStatusOther"
              >
                Other
              </label>
            </b-input-group-prepend>
            <b-form-input
              id="igaOwnershipStatusOther"
              placeholder="Mention housing situation ... "
              v-model="tmpIgaOwnershipStatus"
              :state="tmpIgaOwnershipStatusState"
            ></b-form-input>
            <b-form-invalid-feedback :state="tmpIgaOwnershipStatusState">
              Please mention housing situation
            </b-form-invalid-feedback>
          </b-input-group>
        </b-form-group>
      </b-col>
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
      <b-button
        align-h="start"
        type="submit"
        class="ml-1"
        @click.prevent="handleHouseholdSubmit"
        variant="primary"
        >Next</b-button
      >
    </b-form-row>
  </b-form>
</template>

<script>
import moment from "moment";
import {
  required,
  alpha,
  minLength,
  maxLength,
  minValue,
  numeric,
  decimal
} from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      orphanNumberOfSponsoredSiblings: "",

      fatherCauseOfDeath: "",
      fatherCauseOfDeathState: null,
      fatherJobTitle: "",
      fatherMonthlyIncome: "",
      fatherMonthlyIncomeState: null,
      fatherDeathCertificate: null,
      fatherDeathCertificateUrl: null,
      fatherDeathCertificateState: null,

      tmpFatherDateOfBirth: "", // turned into computed props
      tmpFatherDateOfBirthState: null,
      tmpFatherDateOfDeath: "", // turned into computed props
      tmpFatherDateOfDeathState: null,

      motherFirstName: "",
      motherFirstNameState: null,
      motherMiddleName: "",
      motherMiddleNameState: null,
      motherLastName: "",
      motherLastNameState: null,
      motherVitalStatus: "", // TODO:DONE add to UI
      motherVitalStatusState: null,
      motherCauseOfDeath: "", // TODO:DONE add to schema
      motherCauseOfDeathState: null,
      motherMaritalStatus: "",
      motherMaritalStatusState: null,
      motherJobTitle: "",
      motherMonthlyExpense: "",
      motherMonthlyExpenseState: null,
      motherMonthlyIncome: "",
      motherMonthlyIncomeState: null,
      motherSourceOfIncome: [],
      motherPhoneNumber: "",
      motherPhoneNumberState: null,

      tmpMotherDateOfBirth: "", // add to UI, turned into computed props
      tmpMotherDateOfBirthState: null,
      tmpMotherDateOfDeath: "", // TODO:DONE add to schema, turned into computed props
      tmpMotherDateOfDeathState: null,

      newSibling: {},

      siblingFullNameState: null,
      siblingGenderState: null,
      siblingAgeState: null,
      siblingMaritalStatusState: null,
      siblings: [],

      // igaOwnershipStatus: "", turned into computed props
      igaOtherProperty: "",
      tmpIgaOwnershipStatusRadio: "",
      tmpIgaOwnershipStatusRadioState: null,
      tmpIgaOwnershipStatus: "",
      tmpIgaOwnershipStatusState: null
    };
  },
  validations: {
    fatherCauseOfDeath: {
      required,
      minLength: minLength(3)
    },
    fatherMonthlyIncome: {
      required,
      numeric,
      minValue: minValue(0)
    },
    tmpFatherDateOfBirth: { required },
    tmpFatherDateOfDeath: { required },
    fatherDeathCertificate: { required },
    motherFirstName: {
      required,
      alpha,
      minLength: minLength(3)
    },
    motherMiddleName: {
      required,
      alpha,
      minLength: minLength(3)
    },
    motherLastName: {
      required,
      alpha,
      minLength: minLength(3)
    },
    tmpMotherDateOfBirth: { required },
    motherMonthlyIncome: {
      decimal,
      minValue: minValue(0)
    },
    motherMonthlyExpense: {
      decimal,
      minValue: minValue(0)
    },
    motherPhoneNumber: {
      required,
      numeric,
      minLength: minLength(10),
      maxLength: maxLength(10)
    },
    motherCauseOfDeath: {
      required,
      minLength: minLength(3)
    },
    tmpMotherDateOfDeath: { required }
  },
  computed: {
    fatherDateOfBrith: function() {
      return moment(this.tmpFatherDateOfBirth).format();
    },
    fatherDateOfDeath: function() {
      return moment(this.tmpFatherDateOfDeath).format();
    },
    motherDateOfBrith: function() {
      return moment(this.tmpMotherDateOfBrith).format();
    },
    motherDateOfDeath: function() {
      return moment(this.tmpMotherDateOfDeath).format();
    },
    igaOwnershipStatus: function() {
      if (this.tmpIgaOwnershipStatusRadio == "Other") {
        return `Other: ${this.tmpIgaOwnershipStatus}`;
      }
      return this.tmpIgaOwnershipStatusRadio;
    }
  },
  methods: {
    ...mapActions([
      "setInvalidHouseholdForm",
      "setOrphanNumberOfSponsoredSiblings",
      "setFatherCauseOfDeath",
      "setFatherJobTitle",
      "setFatherMonthlyIncome",
      "setFatherDeathCertificateUrl",
      "setFatherDateOfBrith",
      "setFatherDateOfDeath",
      "setMotherFirstName",
      "setMotherMiddleName",
      "setMotherLastName",
      "setMotherVitalStatus",
      "setMotherCauseOfDeath",
      "setMotherMaritalStatus",
      "setMotherJobTitle",
      "setMotherMonthlyExpense",
      "setMotherMonthlyIncome",
      "setMotherSourceOfIncome",
      "setMotherPhoneNumber",
      "setMotherDateOfBrith",
      "setMotherDateOfDeath",
      "setSiblings",
      "setIgaOwnershipStatus",
      "setIgaOtherProperty"
    ]),
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

    // dynamically add data properties to a component's property
    update: function(obj, prop, event) {
      this.$set(obj, prop, event);
    },

    // Father info validation
    checkFatherDateOfBirthValidity: function() {
      const validFatherDateOfBirth = !this.$v.tmpFatherDateOfBirth.$invalid;
      this.tmpFatherDateOfBirthState = validFatherDateOfBirth;
      return validFatherDateOfBirth;
    },
    checkFatherDateOfDeathValidity: function() {
      const validFatherDateOfDeath = !this.$v.tmpFatherDateOfDeath.$invalid;
      this.tmpFatherDateOfDeathState = validFatherDateOfDeath;
      return validFatherDateOfDeath;
    },
    checkFatherCauseOfDeathValidity: function() {
      const validFatherCauseOfDeath = !this.$v.fatherCauseOfDeath.$invalid;
      this.fatherCauseOfDeathState = validFatherCauseOfDeath;
      return validFatherCauseOfDeath;
    },
    checkFatherMonthlyIncomeValidity: function() {
      const validFatherMonthlyIncome = !this.$v.fatherMonthlyIncome.$invalid;
      this.fatherMonthlyIncomeState = validFatherMonthlyIncome;
      return validFatherMonthlyIncome;
    },
    checkFatherDeathCertificateValidity: function() {
      const validFatherDeathCertificate = !this.$v.fatherDeathCertificate
        .$invalid;
      this.fatherDeathCertificateState = validFatherDeathCertificate;
      return validFatherDeathCertificate;
    },

    // Mother info validation
    checkMotherFirstNameValidity: function() {
      const validMotherFirstName = !this.$v.motherFirstName.$invalid;
      this.motherFirstNameState = validMotherFirstName;
      return validMotherFirstName;
    },
    checkMotherMiddleNameValidity: function() {
      const validMotherMiddleName = !this.$v.motherMiddleName.$invalid;
      this.motherMiddleNameState = validMotherMiddleName;
      return validMotherMiddleName;
    },
    checkMotherLastNameValidity: function() {
      const validMotherLastName = !this.$v.motherLastName.$invalid;
      this.motherLastNameState = validMotherLastName;
      return validMotherLastName;
    },
    checkMotherDateOfBirthValidity: function() {
      const validMotherDateOfBirth = !this.$v.tmpMotherDateOfBirth.$invalid;
      this.tmpMotherDateOfBirthState = validMotherDateOfBirth;
      return validMotherDateOfBirth;
    },
    checkMotherVitalStatusValidity: function() {
      this.motherVitalStatusState =
        this.motherVitalStatus === "alive" ||
        this.motherVitalStatus === "passed";
      return this.motherVitalStatusState;
    },
    checkMotherMaritalStatusValidity: function() {
      if (this.motherVitalStatus === "Alive") {
        this.motherMaritalStatusState =
          this.motherMaritalStatus === "widow" ||
          this.motherMaritalStatus === "remarried";
        return this.motherMaritalStatusState;
      } else return true;
    },
    checkMotherMonthlyIncomeValidity: function() {
      if (this.motherVitalStatus === "Alive") {
        const validMotherMonthlyIncome = !this.$v.motherMonthlyIncome.$invalid;
        this.motherMonthlyIncomeState = validMotherMonthlyIncome;
        return validMotherMonthlyIncome;
      } else return true;
    },
    checkMotherMonthlyExpenseValidity: function() {
      const validMotherMonthlyExpense = !this.$v.motherMonthlyExpense.$invalid;
      if (this.motherVitalStatus === "Alive") {
        this.motherMonthlyExpenseState = validMotherMonthlyExpense;
        return validMotherMonthlyExpense;
      } else return true;
    },
    checkMotherPhoneNumberValidity: function() {
      if (this.motherVitalStatus === "Alive") {
        const validMotherPhoneNumber = !this.$v.motherPhoneNumber.$invalid;
        this.motherPhoneNumberState = validMotherPhoneNumber;
        return validMotherPhoneNumber;
      } else return true;
    },
    checkMotherCauseOfDeathValidity: function() {
      const validMotherCauseOfDeath = !this.$v.motherCauseOfDeath.$invalid;
      if (this.motherVitalStatus === "passed") {
        this.motherCauseOfDeathState = validMotherCauseOfDeath;
        return validMotherCauseOfDeath;
      } else return true;
    },
    checkMotherDateOfDeathValidity: function() {
      const validMotherDateOfDeath = !this.$v.tmpMotherDateOfDeath.$invalid;
      if (this.motherVitalStatus === "Passed Away") {
        this.tmpMotherDateOfDeathState = validMotherDateOfDeath;
        return validMotherDateOfDeath;
      } else return true;
    },

    // IGA validity check
    checkIgaHouseOwnershipValidity: function() {
      if (
        this.tmpIgaOwnershipStatusRadio === "Privately owned" ||
        this.tmpIgaOwnershipStatusRadio === "Rental" ||
        this.tmpIgaOwnershipStatusRadio === "With Relatives" ||
        this.tmpIgaOwnershipStatusRadio === "Dependent"
      ) {
        this.tmpIgaOwnershipStatusRadioState = true;
        this.tmpIgaOwnershipStatusState = null;
        this.tmpIgaOwnershipStatus = "";
      } else if (
        this.tmpIgaOwnershipStatusRadio === "Other" &&
        this.tmpIgaOwnershipStatus === ""
      ) {
        this.tmpIgaOwnershipStatusState = false;
        this.tmpIgaOwnershipStatusRadioState = null;
      } else if (this.tmpIgaOwnershipStatusRadio === "") {
        this.tmpIgaOwnershipStatusRadioState = false;
      } else {
        this.tmpIgaOwnershipStatusRadioState = true;
        this.tmpIgaOwnershipStatusState = true;
      }
      return this.tmpIgaOwnershipStatusRadioState;
    },

    handleHouseholdSubmit: async function() {
      if (
        this.checkFatherDateOfBirthValidity() &&
        this.checkFatherDateOfDeathValidity() &&
        this.checkFatherCauseOfDeathValidity() &&
        this.checkFatherMonthlyIncomeValidity() &&
        this.checkFatherDeathCertificateValidity() &&
        this.checkMotherFirstNameValidity() &&
        this.checkMotherMiddleNameValidity() &&
        this.checkMotherLastNameValidity() &&
        this.checkMotherDateOfBirthValidity() &&
        this.checkMotherVitalStatusValidity() &&
        this.checkMotherMaritalStatusValidity() &&
        this.checkMotherMonthlyIncomeValidity() &&
        this.checkMotherMonthlyExpenseValidity() &&
        this.checkMotherPhoneNumberValidity() &&
        this.checkMotherCauseOfDeathValidity() &&
        this.checkMotherDateOfDeathValidity() &&
        this.checkIgaHouseOwnershipValidity()
      ) {
        //  dispatch setter actions to the state in the store
        this.setOrphanNumberOfSponsoredSiblings(
          this.orphanNumberOfSponsoredSiblings
        );
        this.setFatherCauseOfDeath(this.fatherCauseOfDeath);
        this.setFatherJobTitle(this.fatherJobTitle);
        this.setFatherMonthlyIncome(this.fatherMonthlyIncome);
        this.setFatherDateOfBrith(this.fatherDateOfBrith);
        this.setFatherDateOfDeath(this.fatherDateOfDeath);
        this.setMotherFirstName(this.motherFirstName);
        this.setMotherMiddleName(this.motherMiddleName);
        this.setMotherLastName(this.motherLastName);
        this.setMotherVitalStatus(this.motherVitalStatus);
        this.setMotherCauseOfDeath(this.motherCauseOfDeath);
        this.setMotherMaritalStatus(this.motherMaritalStatus);
        this.setMotherJobTitle(this.motherJobTitle);
        this.setMotherMonthlyExpense(this.motherMonthlyExpense);
        this.setMotherMonthlyIncome(this.motherMonthlyIncome);
        this.setMotherSourceOfIncome(this.motherSourceOfIncome);
        this.setMotherPhoneNumber(this.motherPhoneNumber);
        this.setMotherDateOfBrith(this.motherDateOfBrith);
        this.setMotherDateOfDeath(this.motherDateOfDeath);
        this.setSiblings(this.siblings);
        this.setIgaOwnershipStatus(this.igaOwnershipStatus);
        this.setIgaOtherProperty(this.igaOtherProperty);

        // TODO:DONE Save the image to the server and get the url for it
        // let fatherDeathCertificateUrl = "";
        const formdata_DC = new FormData();
        formdata_DC.append(
          "fatherDeathCertificate",
          this.fatherDeathCertificate,
          this.fatherDeathCertificate.name
        );

        await axios
          .post(
            `${process.env.VUE_APP_BASE_URL}/public/images/fatherDeathCertificate`,
            formdata_DC
          )
          .then(res => {
            const temp =
              process.env.VUE_APP_BASE_URL + res.data.replace(/\\/g, "/");
            this.fatherDeathCertificateUrl = encodeURI(
              temp.replace("public", "")
            );
          });

        // TODO:DONE Set the url to its state in the store
        this.setFatherDeathCertificateUrl(this.fatherDeathCertificateUrl);

        // Set global form validity
        this.setInvalidHouseholdForm(false);

        // emit `guardian-info-complete` event to send guardian info to addOrphan.vue
        this.$emit("household-info-complete", {
          orphanNumberOfSponsoredSiblings: this.orphanNumberOfSponsoredSiblings,

          fatherCauseOfDeath: this.fatherCauseOfDeath,
          fatherJobTitle: this.fatherJobTitle,
          fatherMonthlyIncome: this.fatherMonthlyIncome,
          fatherDeathCertificateUrl: this.fatherDeathCertificateUrl,
          fatherDateOfBrith: this.fatherDateOfBrith,
          fatherDateOfDeath: this.fatherDateOfDeath,

          motherFirstName: this.motherFirstName,
          motherMiddleName: this.motherMiddleName,
          motherLastName: this.motherLastName,
          motherVitalStatus: this.motherVitalStatus,
          motherCauseOfDeath: this.motherCauseOfDeath,
          motherMaritalStatus: this.motherMaritalStatus,
          motherJobTitle: this.motherJobTitle,
          motherMonthlyExpense: this.motherMonthlyExpense,
          motherMonthlyIncome: this.motherMonthlyIncome,
          motherSourceOfIncome: this.motherSourceOfIncome,
          motherPhoneNumber: this.motherPhoneNumber,
          motherDateOfBrith: this.motherDateOfBrith,
          motherDateOfDeath: this.motherDateOfDeath,

          siblings: this.siblings,

          igaOwnershipStatus: this.igaOwnershipStatus,
          igaOtherProperty: this.igaOtherProperty
        });

        // porceed to the next section
        this.$root.$emit("bv::toggle::collapse", "accordion-5");
      } else this.setInvalidHouseholdForm(true);
    },

    // "Add sibling" form validation
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
        this.$bvModal.hide("modal-add-sibling");
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
