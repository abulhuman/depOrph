<template>
  <b-container>
    <b-row>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''"
                >Clear</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          v-model="sortDirection"
          label="Filter By"
          label-cols-sm="2"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
          v-slot="{ ariaDescribedby }"
        >
          <b-form-checkbox-group
            v-model="filterOn"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
          >
            <b-form-checkbox value="Name">Name</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-card class="b-table-card-body mb-3">
      <b-table
        hover
        striped
        bordered
        small
        responsive
        sticky-header="800px"
        show-empty
        :items="socialWorkers"
        :fields="fields"
        :filter="filter"
        :filter-included-fields="filterOn"
        :sort-desc.sync="sortDesc"
        :current-page="currentPage"
        :per-page="perPage"
        @filtered="onFiltered"
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
              <b-col class="p-0 text-left">{{ row.item.id }}</b-col>
            </b-row>
            <p class="work-in-progress">WORK IN PROGRESS</p>
          </b-card>
        </template>
      </b-table>
      <b-row>
        <b-col sm="5" md="6" class="mt-1">
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
        <b-col sm="7" md="5" class="mt-1">
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
    </b-card>
  </b-container>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      socialWorkers: [],
      fields: [
        { key: "Name", label: "Name", sortable: true, class: "text-left" },
        { key: "PhoneNumber", label: "Phone Number", sortable: false },
        { key: "Email", label: "Email", sortable: false },
        { key: "Show_details", label: "Show Details", sortable: false }
      ],
      pageOptions: [5, 10, 15, 20],
      perPage: 5,
      currentPage: 1,
      filter: null,
      filterOn: [],
      sortDirection: "asc",
      sortDesc: false
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
    totalRows() {
      return this.orphans.length;
    }
  },
  mounted() {
    this.totalRows = this.orphans.length;
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  },
  async created() {
    await axios
      .post("/", {
        query: `{
                    allSocialWorkers(take: 20) {
                        id
                        fullName
                        phoneNumber
                        email
                    }
                }`
      })
      .then(
        (res) =>
          (this.orphans = res.data.data.allSocialWorkers.map((val) => ({
            id: val.id,
            Name: val.fullName,
            PhoneNumber: val.phoneNumber,
            Email: val.email
          })))
      );
  }
};
</script>

<style scoped>
.b-table-card-body > .card-body {
  padding: 0px;
}
</style>
