<template>
  <b-form>
    <b-form-text class="text-left mb-3"
      >The inputs marked by * are all required</b-form-text
    >
    <b-form-row>
      <b-col class="text-left">
        <b-form-group
          label="First Name*"
          label-for="guardianFirstName"
          :state="guardianFirstNameState"
          invalid-feedback="First Name is required, must be more than 2 characters long and contain letters ONLY."
        >
          <b-form-input
            id="guardianFirstName"
            placeholder="First Name ..."
            v-model="guardianFirstName"
            :state="guardianFirstNameState"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col class="text-left">
        <b-form-group
          label="Middle Name*"
          label-for="guardianMiddleName"
          :state="guardianMiddleNameState"
          invalid-feedback="Middle Name is required, must be more than 2 characters long and contain letters ONLY."
        >
          <b-form-input
            id="guardianMiddleName"
            placeholder="Middle Name ..."
            v-model="guardianMiddleName"
            :state="guardianMiddleNameState"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col class="text-left">
        <b-form-group
          label="Last Name*"
          label-for="guardianLastName"
          :state="guardianLastNameState"
          invalid-feedback="Last Name is required, must be more than 2 characters long and contain letters ONLY."
        >
          <b-form-input
            id="guardianLastName"
            placeholder="Last Name ..."
            v-model="guardianLastName"
            :state="guardianLastNameState"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col class="text-left col-4">
        <b-form-group
          label="Gender*"
          label-for="guardianGender"
          :state="guardianGenderState"
          invalid-feedback="Gender is required"
        >
          <b-form-select
            id="guardianGender"
            :state="guardianGenderState"
            v-model="guardianGender"
          >
            <template #first>
              <b-form-select-option disabled value="">
                - Select Gender -
              </b-form-select-option>
            </template>
            <b-form-select-option value="M">Male</b-form-select-option>
            <b-form-select-option value="F">Female</b-form-select-option>
          </b-form-select>
        </b-form-group>
      </b-col>
      <b-col class="text-left">
        <b-form-group
          label="Relation to Orphan*"
          label-for="guardianRelationToOrphan"
          :state="guardianRelationToOrphanState"
          invalid-feedback="Relation is required"
        >
          <b-form-select
            id="guardianRelationToOrphan"
            :options="relationOptions"
            v-model="guardianRelationToOrphan"
            :state="guardianRelationToOrphanState"
          >
            <template #first>
              <b-form-select-option disabled value="">
                - Select Relation -
              </b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>
      </b-col>
      <b-col class="text-left">
        <b-form-group label="Job Title" label-for="guardianJobTitle">
          <b-form-input
            id="guardianJobTitle"
            placeholder="Job Title ..."
            v-model="guardianJobTitle"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col class="text-left col-3">
        <b-form-group
          label="Date of Birth*"
          label-for="guardianDateOfBirth"
          :state="tmpGuardianDateOfBirthState"
          invalid-feedback="Date Of Birth is required."
        >
          <b-form-input
            type="date"
            id="guardianDateOfBirth"
            placeholder="Select date ..."
            :state="tmpGuardianDateOfBirthState"
            v-model="tmpGuardianDateOfBirth"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col class="text-left col-3">
        <b-form-group label="Nationality" label-for="guardianNationality">
          <b-form-input
            id="guardianNationality"
            placeholder="Nationality  ..."
            v-model="guardianNationality"
            required
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col class="text-left">
        <b-form-group
          label="Address*"
          label-for="guardianAddress"
          description="Regional State, Zone, Woreda, Kebele"
          :state="guardianAddressState"
          invalid-feedback="Address is required in the format 'Regional State, Zone, Woreda, Kebele'"
        >
          <b-form-tags
            id="guardianAddress"
            separator=","
            :limit="addressTagLimit"
            placeholder="Address separated by a comma ..."
            :state="guardianAddressState"
            v-model="guardianAddress"
          >
          </b-form-tags>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col class="text-left">
        <b-form-group
          label="Telephone"
          label-for="guardianTelephone"
          invalid-feedback="Telephone must be 10 digit number."
          :state="guardianTelephoneState"
        >
          <b-form-input
            id="guardianTelephone"
            type="tel"
            placeholder="Telephone ..."
            :state="guardianTelephoneState"
            v-model="guardianTelephone"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col class="text-left">
        <b-form-group
          label="Mobile*"
          label-for="guardianMobile"
          :state="guardianMobileState"
          invalid-feedback="Mobile is required and must be 10 digit number."
        >
          <b-form-input
            id="guardianMobile"
            type="tel"
            placeholder="Mobile ..."
            :state="guardianMobileState"
            v-model="guardianMobile"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col class="text-left">
        <b-form-group label="P.O.Box" label-for="guardianPOBox">
          <b-form-input
            id="guardianPOBox"
            placeholder="P.O.Box ..."
            v-model="guardianPOBox"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col class="text-left">
        <b-form-group
          label="Email*"
          label-for="guardianEmail"
          :state="guardianEmailState"
          invalid-feedback="Email is required and must be in the form 'example@example.com'"
        >
          <b-form-input
            id="guardianEmail"
            type="email"
            placeholder="Email ..."
            :state="guardianEmailState"
            v-model="guardianEmail"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col class="text-left">
        <b-form-group
          label="Confirmation Letter (Upload)*"
          label-for="guardianConfirmationLetter"
          :state="guardianConfirmationLetterState"
          invalid-feedback="Confirmation Letter is required."
        >
          <b-form-file
            id="guardianConfirmationLetter"
            placeholder="Upload Confirmation Letter ..."
            accept="image/*"
            v-model="guardianConfirmationLetter"
            :state="guardianConfirmationLetterState"
          >
          </b-form-file>
        </b-form-group>
      </b-col>
      <b-col class="text-left">
        <b-form-group
          label="ID Card Photocopied (Upload)*"
          label-for="guardianIDCard"
          :state="guardianIDCardState"
          invalid-feedback="ID Card is required."
        >
          <b-form-file
            id="guardianIDCard"
            placeholder="Upload ID Card (Photocopied) ..."
            accept="image/*"
            v-model="guardianIDCard"
            :state="guardianIDCardState"
          >
          </b-form-file>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row align-h="start">
      <b-button
        align-h="start"
        variant="primary"
        @click.prevent="handleGuardianInfoSubmit"
        type="submit"
        >Submit</b-button
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
  numeric,
  decimal,
  email
} from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      guardianFirstName: "",
      guardianFirstNameState: null,
      guardianMiddleName: "",
      guardianMiddleNameState: null,
      guardianLastName: "",
      guardianLastNameState: null,
      guardianGender: "",
      guardianGenderState: null,
      relationOptions: [
        "Mother",
        "Grandmother",
        "Grandfather",
        "Sister",
        "Brother",
        "Uncle",
        "Aunt",
        "Cousin",
        "Niece",
        "Nephew"
      ],
      guardianNationality: "",
      guardianAddress: [],
      guardianAddressState: null,
      guardianRelationToOrphan: "",
      guardianRelationToOrphanState: null,
      guardianTelephone: "", // TODO:DONE add to schema
      guardianTelephoneState: null,
      guardianMobile: "", // TODO:DONE add to schema
      guardianMobileState: null,
      guardianPOBox: "", // TODO:DONE add to schema
      guardianEmail: "",
      guardianEmailState: null,
      guardianJobTitle: "",
      guardianMonthlyExpense: "",
      guardianMonthlyExpenseState: null,

      tmpGuardianDateOfBirth: "", // turned into computed props
      tmpGuardianDateOfBirthState: null,

      guardianConfirmationLetter: null,
      guardianConfirmationLetterUrl: null,
      guardianConfirmationLetterState: null,
      guardianIDCard: null,
      guardianIDCardUrl: null,
      guardianIDCardState: null,

      addressTagLimit: 4
    };
  },
  validations: {
    guardianFirstName: {
      required,
      alpha,
      minLength: minLength(3)
    },
    guardianMiddleName: {
      required,
      alpha,
      minLength: minLength(3)
    },
    guardianLastName: {
      required,
      alpha,
      minLength: minLength(3)
    },
    tmpGuardianDateOfBirth: {
      required
    },
    guardianTelephone: {
      minLength: minLength(10),
      maxLength: maxLength(10),
      numeric
    },
    guardianMobile: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(10),
      numeric
    },
    guardianEmail: {
      required,
      email
    },
    guardianMonthlyExpense: {
      decimal
    },
    guardianIDCard: {
      required
    },
    guardianConfirmationLetter: {
      required
    }
  },
  computed: {
    guadrianDateOfBrith: function() {
      return moment(this.tmpGuardianDateOfBrith).format();
    }
  },
  methods: {
    ...mapActions([
      "setInvalidGuardianForm"
    ]),
    checkGuardianFirstNameValidity: function() {
      const validGuardianFirstName = !this.$v.guardianFirstName.$invalid;
      this.guardianFirstNameState = validGuardianFirstName;
      return validGuardianFirstName;
    },
    checkGuardianMiddleNameValidity: function() {
      const validGuardianMiddleName = !this.$v.guardianMiddleName.$invalid;
      this.guardianMiddleNameState = validGuardianMiddleName;
      return validGuardianMiddleName;
    },
    checkGuardianLastNameValidity: function() {
      const validGuardianLastName = !this.$v.guardianLastName.$invalid;
      this.guardianLastNameState = validGuardianLastName;
      return validGuardianLastName;
    },
    checkGuardianGenderValidity: function() {
      if (this.guardianGender === "M" || this.guardianGender === "F") {
        this.guardianGenderState = true;
      } else {
        this.guardianGenderState = false;
      }
      return this.guardianGenderState;
    },
    checkGuardianRelationValidity: function() {
      if (
        this.guardianRelationToOrphan === "Mother" ||
        this.guardianRelationToOrphan === "Grandmother" ||
        this.guardianRelationToOrphan === "Grandfather" ||
        this.guardianRelationToOrphan === "Sister" ||
        this.guardianRelationToOrphan === "Brother" ||
        this.guardianRelationToOrphan === "Uncle" ||
        this.guardianRelationToOrphan === "Aunt" ||
        this.guardianRelationToOrphan === "Cousin" ||
        this.guardianRelationToOrphan === "Niece" ||
        this.guardianRelationToOrphan === "Nephew"
      ) {
        this.guardianRelationToOrphanState = true;
      } else {
        this.guardianRelationToOrphanState = false;
      }
      return this.guardianRelationToOrphanState;
    },
    checkGuardianAddressValidity: function() {
      if (this.guardianAddress.length < 4) {
        this.guardianAddressState = false;
      } else this.guardianAddressState = true;
      return this.guardianAddressState;
    },
    checkGuardianDateOfBirthValidity: function() {
      const validGuardianDateOfBirth = !this.$v.tmpGuardianDateOfBirth.$invalid;
      this.tmpGuardianDateOfBirthState = validGuardianDateOfBirth;
      return validGuardianDateOfBirth;
    },
    checkGuardianTelephoneValidity: function() {
      const validGuardianTelephone = !this.$v.guardianTelephone.$invalid;
      this.guardianTelephoneState = validGuardianTelephone;
      return validGuardianTelephone;
    },
    checkGuardianMobileValidity: function() {
      const validGuardianMobile = !this.$v.guardianMobile.$invalid;
      this.guardianMobileState = validGuardianMobile;
      return validGuardianMobile;
    },
    checkGuardianEmailValidity: function() {
      const validGuardianEmail = !this.$v.guardianEmail.$invalid;
      this.guardianEmailState = validGuardianEmail;
      return validGuardianEmail;
    },
    checkGuardianMonthlyExpenseValidity: function() {
      const validGuardianMonthlyExpense = !this.$v.guardianMonthlyExpense
        .$invalid;
      this.guardianMonthlyExpenseState = validGuardianMonthlyExpense;
      return validGuardianMonthlyExpense;
    },
    checkGuardianConfirmationLetterValidity: function() {
      const validGuardianConfirmationLetter = !this.$v
        .guardianConfirmationLetter.$invalid;
      this.guardianConfirmationLetterState = validGuardianConfirmationLetter;
      return validGuardianConfirmationLetter;
    },
    checkGuardianIDCardValidity: function() {
      const validGuardianIDCard = !this.$v.guardianIDCard.$invalid;
      this.guardianIDCardState = validGuardianIDCard;
      return validGuardianIDCard;
    },
    handleGuardianInfoSubmit: async function() {
      if (
        this.checkGuardianFirstNameValidity() &&
        this.checkGuardianMiddleNameValidity() &&
        this.checkGuardianLastNameValidity() &&
        this.checkGuardianGenderValidity() &&
        this.checkGuardianRelationValidity() &&
        this.checkGuardianDateOfBirthValidity() &&
        this.checkGuardianAddressValidity() &&
        this.checkGuardianTelephoneValidity() &&
        this.checkGuardianMobileValidity() &&
        this.checkGuardianEmailValidity() &&
        this.checkGuardianConfirmationLetterValidity() &&
        this.checkGuardianIDCardValidity()
      ) {
        // TODO:DONE Save images to the server and get the url for each
        const formdata_CL = new FormData();
        formdata_CL.append(
          "guardianConfirmationLetter",
          this.guardianConfirmationLetter,
          this.guardianConfirmationLetter.name
        );

        // save confirmation letter on server and
        // get the path then save it locally as a URI
        await axios
          .post(
            `${process.env.VUE_APP_BASE_URL}/public/images/guardianConfirmationLetter`,
            formdata_CL
          )
          .then(res => {
            const temp =
              process.env.VUE_APP_BASE_URL + res.data.replace(/\\/g, "/");
            this.guardianConfirmationLetterUrl = encodeURI(
              temp.replace("public", "")
            );
          });

        const formdata_IDC = new FormData();
        formdata_IDC.append(
          "guardianIDCard",
          this.guardianIDCard,
          this.guardianIDCard.name
        );

        // save ID card on server and
        // get the path then save it locally as a URI
        await axios
          .post(
            `${process.env.VUE_APP_BASE_URL}/public/images/guardianIDCard`,
            formdata_IDC
          )
          .then(res => {
            const temp =
              process.env.VUE_APP_BASE_URL + res.data.replace(/\\/g, "/");
            this.guardianIDCardUrl = encodeURI(temp.replace("public", ""));
          });

        // Set global form validity
        this.setInvalidGuardianForm(false);

        // emit `guardian-info-complete` event to send guardian info to addOrphan.vue
        this.$emit("guardian-info-complete", {
          guardianFirstName: this.guardianFirstName,
          guardianMiddleName: this.guardianMiddleName,
          guardianLastName: this.guardianLastName,
          guardianGender: this.guardianGender,
          guardianNationality: this.guardianNationality,
          guardianAddress: this.guardianAddress,
          guardianRelationToOrphan: this.guardianRelationToOrphan,
          guardianTelephone: this.guardianTelephone,
          guardianMobile: this.guardianMobile,
          guardianPOBox: this.guardianPOBox,
          guardianEmail: this.guardianEmail,
          guardianJobTitle: this.guardianJobTitle,
          guardianMonthlyExpense: this.guardianMonthlyExpense,
          guardianConfirmationLetterUrl: this.guardianConfirmationLetterUrl,
          guardianIDCardUrl: this.guardianIDCardUrl,
          guadrianDateOfBrith: this.guadrianDateOfBrith
        });
        // TODO:DONE Emit a "formComplete" event
        this.$emit("formComplete");
      } else this.setInvalidGuardianForm(true);
    }
  }
};
</script>

<style></style>
