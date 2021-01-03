<template>
  <b-container>
    <b-table
      class="rounded-3 text-left"
      hover
      striped
      bordered
      small
      responsive
      table-variant="light"
      head-variant="dark"
      sticky-header="800px"
      :items="orphans"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
    >
      <template #cell(show_details)="row">
        <b-button pill size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? "Hide" : "Show" }} Details
        </b-button>
      </template>

      <template #row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>ID:</b></b-col>
            <b-col class="p-0">{{ row.item.id }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Mother Name:</b></b-col>
            <b-col class="p-0">{{ row.item.MotherName }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Guardian Name:</b></b-col>
            <b-col class="p-0">{{ row.item.GuardianName }}</b-col>
          </b-row>
          <b-button pill class="float-right" size="sm" @click="row.toggleDetails"
            >View Profile</b-button
          >
        </b-card>
      </template>
    </b-table>
    <b-row>
      <b-col sm="5" md="6" class="my-1">
        <b-form-group
          label="Items per page"
          label-for="per-page-select"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>
      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      orphans: [],
      fields: [
        { key: "Name", sortable: true },
        { key: "Age", sortable: true },
        { key: "Gender", sortable: true },
        { key: "SponsorshipStatus", sortable: true },
        { key: "Show_details", sortable: false }
      ],
      pageOptions: [10, 15, 20, 25, 50, 100],
      perPage: 20,
      currentPage: 1
    };
  },
  computed: {
    totalRows() {
      return this.orphans.length
    }
  },
  async created() {
    await axios
      .post("/", {
        query: `{
                allOrphans(take: 59){
                    id
                    firstName
                    fatherName
                    grandFatherName
                    greatGrandFatherName
                    gender
                    dateOfBirth
                    sponsorshipStatus
                    mother{
                      firstName
                      middleName
                      lastName
                    }
                    guardian{
                      firstName
                      middleName
                      lastName
                    }
                }
            }`
      })
      .then(
        (res) =>
          (this.orphans = res.data.data.allOrphans.map((val) => ({
            id: val.id,
            Name: `${val.firstName} ${val.fatherName} ${val.grandFatherName} ${val.greatGrandFatherName}`,
            Age:
              moment().diff(val.dateOfBirth, "years") > 0
                ? `${moment().diff(val.dateOfBirth, "years")} years`
                : `${moment().diff(val.dateOfBirth, "months")} months` > 0
                ? moment().diff(val.dateOfBirth, "months")
                : `${moment().diff(val.dateOfBirth, "days")} days`,
            Gender: val.gender,
            SponsorshipStatus: val.sponsorshipStatus,
            MotherName: val.mother
              ? `${val.mother.firstName} ${val.mother.middleName} ${val.mother.lastName}`
              : "",
            GuardianName: val.guardian
              ? `${val.guardian.firstName} ${val.guardian.middleName} ${val.guardian.lastName}`
              : "",
            _cellVariants: {
              SponsorshipStatus:
                val.sponsorshipStatus == "inProgress"
                  ? "warning"
                  : val.sponsorshipStatus == "active"
                  ? "info"
                  : val.sponsorshipStatus == "suspended"
                  ? "danger"
                  : "success"
            }
          })))
      );
  }
};
</script>

<style></style>
