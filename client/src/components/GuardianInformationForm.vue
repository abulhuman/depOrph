<template>
  <b-form>
    <b-form-row>
      <b-col class="text-left">
        <b-form-group label="First Name" label-for="guardianFirstName">
          <b-form-input
            id="guardianFirstName"
            placeholder="First Name ..."
            v-model="guardianFirstName"
            required
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col class="text-left">
        <b-form-group label="Middle Name" label-for="guardianMiddleName">
          <b-form-input
            id="guardianMiddleName"
            placeholder="Middle Name ..."
            v-model="guardianMiddleName"
            required
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col class="text-left">
        <b-form-group label="Last Name" label-for="guardianLastName">
          <b-form-input
            id="guardianLastName"
            placeholder="Last Name ..."
            v-model="guardianLastName"
            required
          >
          </b-form-input>
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col class="text-left col-4">
        <b-form-group label="Gender" label-for="guardianGender">
          <b-form-select id="guardianGender" required v-model="guardianGender">
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
          label="Relation to Orphan"
          label-for="guardianRelationToOrphan"
        >
          <b-form-input
            id="guardianRelationToOrphan"
            placeholder="Relation to Orphan ..."
            v-model="guardianRelationToOrphan"
            required
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col class="text-left">
        <b-form-group label="Job Title" label-for="guardianJobTitle">
          <b-form-input
            id="guardianJobTitle"
            placeholder="Job Title ..."
            v-model="guardianJob"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col class="text-left col-3">
        <b-form-group label="Date of Birth" label-for="guardianDateOfBirth">
          <b-form-input
            type="date"
            required
            id="guardianDateOfBirth"
            placeholder="Select date ..."
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
          label="Address"
          label-for="guardianAddress"
          description="Regional State, Zone, Woreda, Kebele"
        >
          <b-form-tags
            id="guardianAddress"
            separator=","
            :limit="addressTagLimit"
            placeholder="Address separated by a comma ..."
            required
          >
          </b-form-tags>
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col class="text-left">
        <b-form-group label="Telephone" label-for="guardianTelephone">
          <b-form-input
            id="guardianTelephone"
            type="tel"
            placeholder="Telephone ..."
            v-model="guardianTelephone"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col class="text-left">
        <b-form-group label="Mobile" label-for="guardianMobile">
          <b-form-input
            id="guardianMobile"
            type="tel"
            placeholder="Mobile ..."
            v-model="guardianMobile"
            required
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
          label="Email"
          label-for="guardianEmail"
          v-model="guardianEmail"
        >
          <b-form-input
            id="guardianEmail"
            type="email"
            placeholder="Email ..."
            required
          >
          </b-form-input>
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col class="text-left">
        <b-form-group
          label="Confirmation Letter (Upload)"
          label-for="guardianConfirmationLetter"
        >
          <b-form-file
            id="guardianConfirmationLetter"
            placeholder="Upload Confirmation Letter ..."
            accept="image/*"
            required
          >
          </b-form-file>
        </b-form-group>
      </b-col>
      <b-col class="text-left">
        <b-form-group
          label="ID Card Photocopied (Upload)"
          label-for="guardianIDCard"
        >
          <b-form-file
            id="guardianIDCard"
            placeholder="Upload ID Card (Photocopied) ..."
            accept="image/*"
            required
          >
          </b-form-file>
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row align-h="start">
      <b-col cols="1">
        <b-button
          align-h="start"
          variant="primary"
          @click.prevent=""
          type="submit"
          >Submit</b-button
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
      guardianFirstName: "",
      guardianMiddleName: "",
      guardianLastName: "",
      guardianGender: "",
      guardianNationality: "",
      guardianState: "",
      guardianZone: "",
      guardianDistrict: "",
      guardianKebele: "",
      guardianRelationToOrphan: "",
      guardianTelephone: "", // TODO:DONE add to schema
      guardianMobile: "", // TODO:DONE add to schema
      guardianPOBox: "", // TODO:DONE add to schema
      guardianEmail: "",
      guardianJob: "",
      guardianMonthlyExpense: "",

      tmpGuardianDateOfBirth: "", // turned into computed props

      addressTagLimit: 4
    };
  },
  computed: {
    guadrianDateOfBrith: function() {
      return moment(this.tmpGuardianDateOfBrith).format();
    }
  }
};
</script>

<style></style>
