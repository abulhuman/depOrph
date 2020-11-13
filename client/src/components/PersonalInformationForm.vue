<template>
  <b-form>
    <b-form-text class="text-left mb-3"
      >The inputs marked by * are all required</b-form-text
    >
    <b-form-row>
      <b-col class="text-left col-lg col-sm-auto col-md-auto col-auto">
        <b-form-group
          label="Child Name*"
          label-for="orphanFirstName"
          invalid-feedback="Child Name is required, must be more than 2 characters long and contain letters ONLY."
        >
          <b-form-input
            id="orphanFirstName"
            v-model.trim="orphanFirstName"
            :state="orphanFirstNameState"
            min="4"
            ref="orphanFirstName"
            placeholder="Child Name ... "
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col class="text-left col-lg col-sm-auto col-md-auto col-auto">
        <b-form-group
          label="Father Name*"
          label-for="fatherName"
          invalid-feedback="Father Name is required, must be more than 2 characters long and contain letters ONLY."
        >
          <b-form-input
            id="orphanFatherName"
            v-model.trim="orphanFatherName"
            :state="orphanFatherNameState"
            ref="orphanFatherName"
            placeholder="Father Name ... "
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col class="text-left col-lg col-sm-auto col-md-auto col-auto">
        <b-form-group
          label="Grandfather Name*"
          label-for="grandfatherName"
          invalid-feedback="Grandfather Name is required, must be more than 2 characters long and contain letters ONLY."
        >
          <b-form-input
            id="orphanGrandFatherName"
            v-model.trim="orphanGrandFatherName"
            :state="orphanGrandFatherNameState"
            ref="orphanGrandFatherName"
            placeholder="Grandfather Name ... "
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col class="text-left col-lg col-sm-auto col-md-auto col-auto">
        <b-form-group
          label="Great-Grandfather Name*"
          label-for="great-grandfatherName"
          invalid-feedback="Great-Grandfather Name is required, must be more than 2 characters long and contain letters ONLY."
        >
          <b-form-input
            id="orphanGreatGrandFatherName"
            v-model.trim="orphanGreatGrandFatherName"
            :state="orphanGreatGrandFatherNameState"
            ref="orphanGreatGrandFatherName"
            placeholder="Great-Grandfather Name ... "
          >
          </b-form-input>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col class="text-left col-sm-auto col-md-auto col-auto col-lg-2">
        <b-form-group
          label="Gender*"
          label-for="gender"
          invalid-feedback="Gender is required"
        >
          <b-form-select
            id="gender"
            :state="orphanGenderState"
            v-model.trim="orphanGender"
          >
            <template #first>
              <b-form-select-option disabled value="null">
                - Select Gender -
              </b-form-select-option>
            </template>
            <b-form-select-option value="M">Male</b-form-select-option>
            <b-form-select-option value="F">Female</b-form-select-option>
          </b-form-select>
        </b-form-group>
      </b-col>
      <b-col class="text-left col-lg col-sm-auto col-md-auto col-auto">
        <b-form-group
          label="Date of Birth*"
          label-for="dateOfBrith"
          invalid-feedback="Date of Birth is required"
        >
          <b-form-input
            type="date"
            id="dateOfBrith"
            v-model.trim="tmpOrphanDateOfBirth"
            :state="tmpOrphanDateOfBirthState"
            placeholder="Select date ..."
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col class="text-left col-lg col-sm-auto col-md-auto col-auto">
        <b-form-group
          label="Place of Birth*"
          label-for="placeOfBrith"
          invalid-feedback="Place of Birth is required"
        >
          <b-form-input
            id="placeOfBrith"
            v-model.trim="orphanPlaceOfBirth"
            :state="orphanPlaceOfBirthState"
            placeholder="Place of Birth ... "
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col class="text-left col-sm-auto col-md-auto col-auto col-lg">
        <b-form-group
          label="Clan"
          label-for="clan"
          invalid-feedback="Clan must be letters ONLY, and atleast 3 characters long."
        >
          <b-form-input
            id="clan"
            v-model.trim="orphanClan"
            :state="orphanClanSate"
            placeholder="Clan ... "
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col class="text-left col-sm-auto col-md-auto col-auto col-lg">
        <b-form-group
          label="Spoken language(s)"
          label-for="spokenLanguages"
          description="Enter languages separated by comma(,)"
        >
          <b-form-tags
            id="spokenLanguages"
            v-model.trim="orphanSpokenLanguagesInput"
            separator=","
            placeholder="Add Languages ..."
            tag-variant="success"
          >
          </b-form-tags>
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col class="text-left col-lg col-sm-auto col-md-auto col-auto">
        <b-form-group
          label="Birth Certificate (Upload)*"
          label-for="orphanBirthCertificate"
          invalid-feedback="Birth Certificate is required"
        >
          <b-form-file
            id="orphanBirthCertificate"
            placeholder="Upload Birth Certificate ..."
            accept="image/*"
            v-model="orphanBirthCertificate"
            :state="orphanBirthCertificateState"
          >
          </b-form-file>
        </b-form-group>
      </b-col>
      <b-col class="text-left col-lg col-sm-auto col-md-auto col-auto">
        <b-form-group
          label="Portrait photo (Upload)*"
          label-for="orphanPhotoPortrait"
          invalid-feedback="Portrait photo is required"
        >
          <b-form-file
            id="orphanPhotoPortrait"
            placeholder="Upload Portrait Photo ..."
            accept="image/*"
            v-model="orphanPhotoPortrait"
            :state="orphanPhotoPortraitState"
          >
          </b-form-file>
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row align-h="start">
      <b-button
        align-h="start"
        variant="primary"
        type="submit"
        class="ml-1"
        @click.prevent="handleOrphanPersonalSubmit"
        >Next</b-button
      ></b-form-row
    >
  </b-form>
</template>

<script>
import moment from "moment";
import { required, alpha, minLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      orphanFirstName: "",
      orphanFirstNameState: null,
      orphanFatherName: "",
      orphanFatherNameState: null,
      orphanGrandFatherName: "",
      orphanGrandFatherNameState: null,
      orphanGreatGrandFatherName: "",
      orphanGreatGrandFatherNameState: null,
      orphanGender: null,
      orphanGenderState: null,
      orphanPlaceOfBirth: "",
      orphanPlaceOfBirthState: null,
      orphanClan: "", // TODO:DONE add to schema
      orphanClanSate: null,
      orphanSpokenLanguagesInput: [], // TODO:DONE add to schema

      orphanBirthCertificate: null,
      orphanBirthCertificateState: null,
      orphanPhotoPortrait: null,
      orphanPhotoPortraitState: null,

      tmpOrphanDateOfBirth: "", // TODO:DONE formatted as ISO DateTime
      tmpOrphanDateOfBirthState: null
    };
  },
  validations: {
    orphanFirstName: {
      required,
      alpha,
      minLength: minLength(3)
    },
    orphanFatherName: {
      required,
      alpha,
      minLength: minLength(3)
    },
    orphanGrandFatherName: {
      required,
      alpha,
      minLength: minLength(3)
    },
    orphanGreatGrandFatherName: {
      required,
      alpha,
      minLength: minLength(3)
    },
    tmpOrphanDateOfBirth: {
      required
    },
    orphanPlaceOfBirth: {
      required,
      alpha
    },
    orphanBirthCertificate: {
      required
    },
    orphanPhotoPortrait: {
      required
    },
    orphanClan: {
      alpha,
      minLength: minLength(3)
    }
  },
  computed: {
    orphanDateOfBirth: function() {
      return moment(this.tmpOrphanDateOfBirth).format();
    }
  },
  methods: {
    // Orphan Personal Information validation
    checkOrphanFirstNameValidity: function() {
      const validOrphanFirstName = !this.$v.orphanFirstName.$invalid;
      this.orphanFirstNameState = validOrphanFirstName;
      return validOrphanFirstName;
    },
    checkOrphanFatherNameValidity: function() {
      const validOrphanFatherName = !this.$v.orphanFatherName.$invalid;
      this.orphanFatherNameState = validOrphanFatherName;
      return validOrphanFatherName;
    },
    checkOrphanGrandFatherNameValidity: function() {
      const validOrphanGrandFatherName = !this.$v.orphanGrandFatherName
        .$invalid;
      this.orphanGrandFatherNameState = validOrphanGrandFatherName;
      return validOrphanGrandFatherName;
    },
    checkOrphanGreatGrandFatherNameValidity: function() {
      const validOrphanGreatGrandFatherName = !this.$v
        .orphanGreatGrandFatherName.$invalid;
      this.orphanGreatGrandFatherNameState = validOrphanGreatGrandFatherName;
      return validOrphanGreatGrandFatherName;
    },
    checkOrphanGenderValidity: function() {
      if (this.orphanGender === "M" || this.orphanGender === "F") {
        this.orphanGenderState = true;
      } else {
        this.orphanGenderState = false;
      }
      return this.orphanGenderState;
    },
    checkOrphanDateOfBirthValidity: function() {
      const validDateOfBirth = !this.$v.tmpOrphanDateOfBirth.$invalid;
      this.tmpOrphanDateOfBirthState = validDateOfBirth;
      return validDateOfBirth;
    },
    checkOrphanPlaceOfBirthValidity: function() {
      const validPlaceOfBirth = !this.$v.orphanPlaceOfBirth.$invalid;
      this.orphanPlaceOfBirthState = validPlaceOfBirth;
      return validPlaceOfBirth;
    },
    checkOrphanBirthCertificateValidity: function() {
      const validOrphanBirthCertificate = !this.$v.orphanBirthCertificate
        .$invalid;
      this.orphanBirthCertificateState = validOrphanBirthCertificate;
      return validOrphanBirthCertificate;
    },
    checkOrphanPhotoPortraitValidity: function() {
      const validOrphanPhotoPortrait = !this.$v.orphanPhotoPortrait.$invalid;
      this.orphanPhotoPortraitState = validOrphanPhotoPortrait;
      return validOrphanPhotoPortrait;
    },
    checkOrphanClanValidity: function() {
      const validOrphanClan =
        this.$v.orphanClan.alpha && this.$v.orphanClan.minLength;
      this.orphanClanSate = validOrphanClan;
      return validOrphanClan;
    },

    handleOrphanPersonalSubmit: function() {
      if (
        this.checkOrphanFirstNameValidity() &&
        this.checkOrphanFatherNameValidity() &&
        this.checkOrphanGrandFatherNameValidity() &&
        this.checkOrphanGreatGrandFatherNameValidity() &&
        this.checkOrphanGenderValidity() &&
        this.checkOrphanDateOfBirthValidity() &&
        this.checkOrphanPlaceOfBirthValidity() &&
        this.checkOrphanClanValidity() &&
        this.checkOrphanBirthCertificateValidity() &&
        this.checkOrphanPhotoPortraitValidity()
      ) {
        this.$root.$emit("bv::toggle::collapse", "accordion-2");
      }
    }
  }
};
</script>

<style></style>
