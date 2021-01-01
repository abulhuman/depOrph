<template>
  <v-card>
    <v-app-bar
      absolute
      color="#fcb69f"
      dark
      shrink-on-scroll
      elevate-on-scroll
      scroll-target="#scrolling-techniques-3"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>SiteName's Site Orphans</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Search -->
      <!-- <v-btn icon> <v-icon>mdi-magnify</v-icon> </v-btn> -->
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search (Full Name Only)"
        single-line
        class="pt-5"
      ></v-text-field>

      <template v-slot:extension>
        <v-tabs v-model="tab" optional hide-slider fixed-tabs>
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <!-- Full Name filter -->
          <v-menu bottom offset-y>
            <template v-slot:activator="{ on: menu, attrs }">
              <v-tooltip top>
                <template v-slot:activator="{ on: tooltip }">
                  <v-tab
                    v-bind="attrs"
                    v-on="{ ...tooltip, ...menu }"
                    style="padding: 0px; max-width: 150px;"
                  >
                    Full Name
                  </v-tab>
                </template>
                <span>Filter Full Name</span>
              </v-tooltip>
            </template>

            <v-list style="margin-top: 5px; padding-bottom: 0px" height="400">
              <v-list-item
                v-for="(firstLetter, idx) in firstLettersInName"
                :key="idx"
              >
                <v-checkbox
                  v-model="selectedFirstLetter"
                  :label="firstLetter.label"
                  :value="firstLetter.value"
                  style="margin-bottom: 0px;"
                ></v-checkbox>
              </v-list-item>
            </v-list>
          </v-menu>
          <!-- Age filter -->
          <v-menu bottom offset-y>
            <template v-slot:activator="{ on: menu, attrs }">
              <v-tooltip top>
                <template v-slot:activator="{ on: tooltip }">
                  <v-tab
                    v-bind="attrs"
                    v-on="{ ...tooltip, ...menu }"
                    style="padding: 0px; min-width:70px; max-width: 140px;"
                  >
                    Age
                  </v-tab>
                </template>
                <span>Filter Age</span>
              </v-tooltip>
            </template>

            <v-list style="padding-bottom: 0px;">
              <v-list-item v-for="(ageRange, idx) in ageRanges" :key="idx">
                <v-checkbox
                  v-model="selectedAgeRanges"
                  :label="ageRange.label"
                  :value="ageRange.value"
                ></v-checkbox>
              </v-list-item>
            </v-list>
          </v-menu>
          <!-- Gender filter -->
          <v-menu bottom offset-y>
            <template v-slot:activator="{ on: menu, attrs }">
              <v-tooltip top>
                <template v-slot:activator="{ on: tooltip }">
                  <v-tab
                    v-bind="attrs"
                    v-on="{ ...tooltip, ...menu }"
                    style="padding: 0px; max-width: 140px;"
                  >
                    Gender
                  </v-tab>
                </template>
                <span>Filter Gender</span>
              </v-tooltip>
            </template>

            <v-list dense style="padding-bottom: 0px;">
              <v-list-item v-for="(gender, idx) in genders" :key="idx" dense>
                <v-checkbox
                  v-model="selectedGenders"
                  :label="gender.label"
                  :value="gender.value"
                ></v-checkbox>
              </v-list-item>
            </v-list>
          </v-menu>
          <!-- Sponsership Status filter -->
          <v-menu bottom offset-y>
            <template v-slot:activator="{ on: menu, attrs }">
              <v-tooltip top>
                <template v-slot:activator="{ on: tooltip }">
                  <v-tab
                    v-bind="attrs"
                    v-on="{ ...tooltip, ...menu }"
                    style="padding: 0px; max-width: 200px;"
                  >
                    Sponsorship Status
                  </v-tab>
                </template>
                <span>Filter Sponsorship Status</span>
              </v-tooltip>
            </template>

            <v-list style="padding-bottom: 0px;">
              <v-list-item
                v-for="(sponsorshipStatus, idx) in sponsorshipStatuses"
                :key="idx"
              >
                <v-checkbox
                  v-model="selectedSponsorshipStatuses"
                  :label="sponsorshipStatus.label"
                  :value="sponsorshipStatus.value"
                ></v-checkbox>
              </v-list-item>
            </v-list>
          </v-menu>
          <!-- Reset filter -->
          <v-menu bottom offset-y>
            <template v-slot:activator="{ on: menu, attrs }">
              <v-tooltip top>
                <template v-slot:activator="{ on: tooltip }">
                  <v-tab
                    v-bind="attrs"
                    v-on="{ ...tooltip, ...menu }"
                    style="padding: 0px; max-width: 50px;"
                  >
                    <v-icon @click="resetAllFilters">mdi-refresh</v-icon>
                  </v-tab>
                </template>
                <!-- <span>Reset All Fiters</span> -->
                <span
                  >what do u think of this functionality to reset all
                  filters?</span
                >
              </v-tooltip>
            </template>
          </v-menu>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <!-- Table -->
    <v-sheet
      id="scrolling-techniques-3"
      class="overflow-y-auto"
      max-height="100vh"
    >
      <v-data-table
        :headers="headers"
        :items="desserts"
        item-key="id"
        :search="search"
        :custom-filter="searchFilter"
        multi-sort
        class="elevation-1"
        style="margin-top: 14rem;"
      >
        <template v-slot:item.firstName="{ item }">
          {{ getFullName(item) }}
        </template>
        <template v-slot:item.dateOfBirth="{ item }">
          {{ getAge(item) }}
        </template>
      </v-data-table>
    </v-sheet>
  </v-card>
</template>

<style scoped>
.v-label.theme--light {
  margin-bottom: 0rem;
}
.v-input--selection-controls {
  margin-top: 0px;
  padding-top: 0px;
}
.v-input__slot {
  margin-bottom: 0px;
}
</style>

<script>
export default {
  data() {
    return {
      search: "",
      tab: null,
      checkbox: "",
      drawer: false,
      group: null,
      selectedFirstLetter: [],
      selectedAgeRanges: [],
      selectedGenders: [],
      selectedSponsorshipStatuses: [],
      firstLettersInName: [
        { label: "A", value: "a" },
        { label: "B", value: "b" },
        { label: "C", value: "c" },
        { label: "D", value: "d" },
        { label: "E", value: "e" },
        { label: "F", value: "f" },
        { label: "G", value: "g" },
        { label: "H", value: "h" },
        { label: "I", value: "i" },
        { label: "J", value: "j" },
        { label: "K", value: "k" },
        { label: "L", value: "l" },
        { label: "M", value: "m" },
        { label: "N", value: "n" },
        { label: "O", value: "o" },
        { label: "P", value: "p" },
        { label: "Q", value: "q" },
        { label: "R", value: "r" },
        { label: "S", value: "s" },
        { label: "T", value: "t" },
        { label: "U", value: "u" },
        { label: "V", value: "v" },
        { label: "W", value: "w" },
        { label: "X", value: "x" },
        { label: "Y", value: "y" },
        { label: "Z", value: "z" },
      ],
      ageRanges: [
        { label: "less than 5", value: [0, 1, 2, 3, 4, 5] },
        { label: "6 - 10", value: [6, 7, 8, 9, 10] },
        { label: "11 - 15", value: [11, 12, 13, 14, 15] },
        { label: "16 - 20", value: [16, 17, 18, 19, 20] },
        { label: "21 - 25", value: [21, 22, 23, 24, 25] },
      ],
      genders: [
        { label: "Male", value: "M" },
        { label: "Female", value: "F" },
      ],
      sponsorshipStatuses: [
        { label: "Active", value: "active" },
        { label: "InProgress", value: "inProgress" },
        { label: "Suspended", value: "suspended" },
        { label: "Graduated", value: "graduated" },
      ],
      headers: [
        { text: "Id", value: "id" },
        {
          text: "Full Name",
          align: "start",
          value: "firstName",
          filter: (value) => {
            // console.log(this.selectedFirstLetter);
            if (this.selectedFirstLetter.length < 1) return true;
            let select = this.selectedFirstLetter.filter((val) => {
              return val !== undefined;
            });
            console.log(select);
            for (let i = 0; i < select.length; i++) {
              if (value[0].toLowerCase() === select[i]) return true;
            }
          },
        },
        {
          text: "Age",
          value: "dateOfBirth",
          filter: (value, search, item) => {
            if (this.selectedAgeRanges < 1) return true;
            console.log(this.selectedAgeRanges);
            console.log(item);
            for (let i = 0; i < this.selectedAgeRanges.length; i++) {
              for (let j = 0; j < this.selectedAgeRanges[i].length; j++) {
                if (this.selectedAgeRanges[i][j] === this.getAge(item))
                  return true;
              }
            }
          },
        },
        {
          text: "Gender",
          value: "gender",
          filter: (value) => {
            if (this.selectedGenders < 1) return true;
            console.log("value: " + value);
            console.log(this.selectedGenders);
            for (let i = 0; i < this.selectedGenders.length; i++) {
              if (this.selectedGenders[i] === value) return true;
            }
          },
        },
        {
          text: "Sponsoreship Status",
          value: "sponsorshipStatus",
          filter: (value) => {
            if (this.selectedSponsorshipStatuses < 1) return true;
            for (let i = 0; i < this.selectedSponsorshipStatuses.length; i++) {
              if (this.selectedSponsorshipStatuses[i] === value) return true;
            }
          },
        },
        { text: "Sponsored Date", value: "sponsoredDate" },
      ],
      desserts: [
        {
          id: "001",
          firstName: "Eyob",
          fatherName: "Aschenaki",
          grandFatherName: "Lema",
          greatGrandFatherName: "arugb",
          gender: "M",
          dateOfBirth: "2008-09-02",
          sponsorshipStatus: "active",
          sponsoredDate: "2017-08-11",
          site: {
            id: "000",
            siteName: "siteName1",
          },
          guardian: {
            id: "000",
            firstName: "String",
            middleName: "String",
            lastName: "String",
            email: "String",
            mobile: "String",
            guardianRelationToOrphan: "String",
            guardianIDCardUrl: "String",
          },
          mother: {
            id: "000",
            firstName: "String",
            middleName: "String",
            lastName: "String",
            vitalStatus: "alive/passed",
            dateOfDeath: "DateTime",
          },
        },
        {
          id: "002",
          firstName: "Aeyob",
          fatherName: "Aschenaki",
          grandFatherName: "Lema",
          greatGrandFatherName: "arugb",
          gender: "M",
          dateOfBirth: "2010-09-02",
          sponsorshipStatus: "suspended",
          sponsoredDate: "2017-08-11",
          site: {
            id: "000",
            siteName: "siteName1",
          },
          guardian: {
            id: "000",
            firstName: "String",
            middleName: "String",
            lastName: "String",
            email: "String",
            mobile: "String",
            guardianRelationToOrphan: "String",
            guardianIDCardUrl: "String",
          },
          mother: {
            id: "000",
            firstName: "String",
            middleName: "String",
            lastName: "String",
            vitalStatus: "alive/passed",
            dateOfDeath: "DateTime",
          },
        },
        {
          id: "003",
          firstName: "Beyob",
          fatherName: "Aschenaki",
          grandFatherName: "Lema",
          greatGrandFatherName: "arugb",
          gender: "M",
          dateOfBirth: "2010-09-02",
          sponsorshipStatus: "inProgress",
          sponsoredDate: "2017-08-11",
          site: {
            id: "000",
            siteName: "siteName1",
          },
          guardian: {
            id: "000",
            firstName: "String",
            middleName: "String",
            lastName: "String",
            email: "String",
            mobile: "String",
            guardianRelationToOrphan: "String",
            guardianIDCardUrl: "String",
          },
          mother: {
            id: "000",
            firstName: "String",
            middleName: "String",
            lastName: "String",
            vitalStatus: "alive/passed",
            dateOfDeath: "DateTime",
          },
        },
        {
          id: "004",
          firstName: "Ceyob",
          fatherName: "Aschenaki",
          grandFatherName: "Lema",
          greatGrandFatherName: "arugb",
          gender: "M",
          dateOfBirth: "2010-09-02",
          sponsorshipStatus: "graduated",
          sponsoredDate: "2017-08-11",
          site: {
            id: "000",
            siteName: "siteName1",
          },
          guardian: {
            id: "000",
            firstName: "String",
            middleName: "String",
            lastName: "String",
            email: "String",
            mobile: "String",
            guardianRelationToOrphan: "String",
            guardianIDCardUrl: "String",
          },
          mother: {
            id: "000",
            firstName: "String",
            middleName: "String",
            lastName: "String",
            vitalStatus: "alive/passed",
            dateOfDeath: "DateTime",
          },
        },
        {
          id: "005",
          firstName: "Feyob",
          fatherName: "Aschenaki",
          grandFatherName: "Lema",
          greatGrandFatherName: "arugb",
          gender: "F",
          dateOfBirth: "2001-09-02",
          sponsorshipStatus: "active",
          sponsoredDate: "2017-08-11",
          site: {
            id: "000",
            siteName: "siteName1",
          },
          guardian: {
            id: "000",
            firstName: "String",
            middleName: "String",
            lastName: "String",
            email: "String",
            mobile: "String",
            guardianRelationToOrphan: "String",
            guardianIDCardUrl: "String",
          },
          mother: {
            id: "000",
            firstName: "String",
            middleName: "String",
            lastName: "String",
            vitalStatus: "alive/passed",
            dateOfDeath: "DateTime",
          },
        },
        {
          id: "006",
          firstName: "Eyob",
          fatherName: "Aschenaki",
          grandFatherName: "Lema",
          greatGrandFatherName: "arugb",
          gender: "M",
          dateOfBirth: "2008-09-02",
          sponsorshipStatus: "active",
          sponsoredDate: "2017-08-11",
          site: {
            id: "000",
            siteName: "siteName1",
          },
          guardian: {
            id: "000",
            firstName: "String",
            middleName: "String",
            lastName: "String",
            email: "String",
            mobile: "String",
            guardianRelationToOrphan: "String",
            guardianIDCardUrl: "String",
          },
          mother: {
            id: "000",
            firstName: "String",
            middleName: "String",
            lastName: "String",
            vitalStatus: "alive/passed",
            dateOfDeath: "DateTime",
          },
        },
        {
          id: "007",
          firstName: "Aeyob",
          fatherName: "Aschenaki",
          grandFatherName: "Lema",
          greatGrandFatherName: "arugb",
          gender: "M",
          dateOfBirth: "2010-09-02",
          sponsorshipStatus: "suspended",
          sponsoredDate: "2017-08-11",
          site: {
            id: "000",
            siteName: "siteName1",
          },
          guardian: {
            id: "000",
            firstName: "String",
            middleName: "String",
            lastName: "String",
            email: "String",
            mobile: "String",
            guardianRelationToOrphan: "String",
            guardianIDCardUrl: "String",
          },
          mother: {
            id: "000",
            firstName: "String",
            middleName: "String",
            lastName: "String",
            vitalStatus: "alive/passed",
            dateOfDeath: "DateTime",
          },
        },
        {
          id: "008",
          firstName: "Beyob",
          fatherName: "Aschenaki",
          grandFatherName: "Lema",
          greatGrandFatherName: "arugb",
          gender: "M",
          dateOfBirth: "2010-09-02",
          sponsorshipStatus: "inProgress",
          sponsoredDate: "2017-08-11",
          site: {
            id: "000",
            siteName: "siteName1",
          },
          guardian: {
            id: "000",
            firstName: "String",
            middleName: "String",
            lastName: "String",
            email: "String",
            mobile: "String",
            guardianRelationToOrphan: "String",
            guardianIDCardUrl: "String",
          },
          mother: {
            id: "000",
            firstName: "String",
            middleName: "String",
            lastName: "String",
            vitalStatus: "alive/passed",
            dateOfDeath: "DateTime",
          },
        },
        {
          id: "009",
          firstName: "Ceyob",
          fatherName: "Aschenaki",
          grandFatherName: "Lema",
          greatGrandFatherName: "arugb",
          gender: "M",
          dateOfBirth: "2010-09-02",
          sponsorshipStatus: "graduated",
          sponsoredDate: "2017-08-11",
          site: {
            id: "000",
            siteName: "siteName1",
          },
          guardian: {
            id: "000",
            firstName: "String",
            middleName: "String",
            lastName: "String",
            email: "String",
            mobile: "String",
            guardianRelationToOrphan: "String",
            guardianIDCardUrl: "String",
          },
          mother: {
            id: "000",
            firstName: "String",
            middleName: "String",
            lastName: "String",
            vitalStatus: "alive/passed",
            dateOfDeath: "DateTime",
          },
        },
        {
          id: "010",
          firstName: "Feyob",
          fatherName: "Aschenaki",
          grandFatherName: "Lema",
          greatGrandFatherName: "arugb",
          gender: "F",
          dateOfBirth: "2001-09-02",
          sponsorshipStatus: "active",
          sponsoredDate: "2017-08-11",
          site: {
            id: "000",
            siteName: "siteName1",
          },
          guardian: {
            id: "000",
            firstName: "String",
            middleName: "String",
            lastName: "String",
            email: "String",
            mobile: "String",
            guardianRelationToOrphan: "String",
            guardianIDCardUrl: "String",
          },
          mother: {
            id: "000",
            firstName: "String",
            middleName: "String",
            lastName: "String",
            vitalStatus: "alive/passed",
            dateOfDeath: "DateTime",
          },
        },
        {
          id: "011",
          firstName: "Eyob",
          fatherName: "Aschenaki",
          grandFatherName: "Lema",
          greatGrandFatherName: "arugb",
          gender: "M",
          dateOfBirth: "2008-09-02",
          sponsorshipStatus: "active",
          sponsoredDate: "2017-08-11",
          site: {
            id: "000",
            siteName: "siteName1",
          },
          guardian: {
            id: "000",
            firstName: "String",
            middleName: "String",
            lastName: "String",
            email: "String",
            mobile: "String",
            guardianRelationToOrphan: "String",
            guardianIDCardUrl: "String",
          },
          mother: {
            id: "000",
            firstName: "String",
            middleName: "String",
            lastName: "String",
            vitalStatus: "alive/passed",
            dateOfDeath: "DateTime",
          },
        },
        {
          id: "012",
          firstName: "Aeyob",
          fatherName: "Aschenaki",
          grandFatherName: "Lema",
          greatGrandFatherName: "arugb",
          gender: "M",
          dateOfBirth: "2010-09-02",
          sponsorshipStatus: "suspended",
          sponsoredDate: "2017-08-11",
          site: {
            id: "000",
            siteName: "siteName1",
          },
          guardian: {
            id: "000",
            firstName: "String",
            middleName: "String",
            lastName: "String",
            email: "String",
            mobile: "String",
            guardianRelationToOrphan: "String",
            guardianIDCardUrl: "String",
          },
          mother: {
            id: "000",
            firstName: "String",
            middleName: "String",
            lastName: "String",
            vitalStatus: "alive/passed",
            dateOfDeath: "DateTime",
          },
        },
        {
          id: "013",
          firstName: "Beyob",
          fatherName: "Aschenaki",
          grandFatherName: "Lema",
          greatGrandFatherName: "arugb",
          gender: "M",
          dateOfBirth: "2010-09-02",
          sponsorshipStatus: "inProgress",
          sponsoredDate: "2017-08-11",
          site: {
            id: "000",
            siteName: "siteName1",
          },
          guardian: {
            id: "000",
            firstName: "String",
            middleName: "String",
            lastName: "String",
            email: "String",
            mobile: "String",
            guardianRelationToOrphan: "String",
            guardianIDCardUrl: "String",
          },
          mother: {
            id: "000",
            firstName: "String",
            middleName: "String",
            lastName: "String",
            vitalStatus: "alive/passed",
            dateOfDeath: "DateTime",
          },
        },
        {
          id: "014",
          firstName: "Ceyob",
          fatherName: "Aschenaki",
          grandFatherName: "Lema",
          greatGrandFatherName: "arugb",
          gender: "M",
          dateOfBirth: "2010-09-02",
          sponsorshipStatus: "graduated",
          sponsoredDate: "2017-08-11",
          site: {
            id: "000",
            siteName: "siteName1",
          },
          guardian: {
            id: "000",
            firstName: "String",
            middleName: "String",
            lastName: "String",
            email: "String",
            mobile: "String",
            guardianRelationToOrphan: "String",
            guardianIDCardUrl: "String",
          },
          mother: {
            id: "000",
            firstName: "String",
            middleName: "String",
            lastName: "String",
            vitalStatus: "alive/passed",
            dateOfDeath: "DateTime",
          },
        },
        {
          id: "015",
          firstName: "Feyob",
          fatherName: "Aschenaki",
          grandFatherName: "Lema",
          greatGrandFatherName: "arugb",
          gender: "F",
          dateOfBirth: "2001-09-02",
          sponsorshipStatus: "active",
          sponsoredDate: "2017-08-11",
          site: {
            id: "000",
            siteName: "siteName1",
          },
          guardian: {
            id: "000",
            firstName: "String",
            middleName: "String",
            lastName: "String",
            email: "String",
            mobile: "String",
            guardianRelationToOrphan: "String",
            guardianIDCardUrl: "String",
          },
          mother: {
            id: "000",
            firstName: "String",
            middleName: "String",
            lastName: "String",
            vitalStatus: "alive/passed",
            dateOfDeath: "DateTime",
          },
        },
      ],
    };
  },
  methods: {
    // ------------------ Formatters ------------------
    getFullName(item) {
      return `${item.firstName} ${item.fatherName} ${item.grandFatherName} ${item.greatGrandFatherName}`;
    },
    getAge(item) {
      let currentDate = Math.floor(
        Date.now() / (1000 * 60 * 60 * 24 * 30 * 12)
      );
      let birthDate = Math.floor(
        new Date(`"${item.dateOfBirth}"`).getTime() /
          (1000 * 60 * 60 * 24 * 30 * 12)
      );
      return currentDate - birthDate;
      // return (new Date().getFullYear() - new Date(`"${item.dateOfBirth}"`).getFullYear());
    },
    // custom search filter
    searchFilter(value, search, item) {
      console.log("Value: " + value);
      // console.log(item);
      return this.getFullName(item).indexOf(search) !== -1;
    },
    resetAllFilters() {
      this.selectedFirstLetter.length = 0;
      this.selectedAgeRanges.length = 0;
      this.selectedGenders.length = 0;
      this.selectedSponsorshipStatuses.length = 0;
    },
  },
};
</script>
