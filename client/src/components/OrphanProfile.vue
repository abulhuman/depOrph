<template>
  <div>
    <!-- this div is entirely copied from the Header Component except
     for the seach part -->
    <div class="header">
      <b-navbar toggleable="lg" type="light">
        <b-navbar-brand href="#" class="nav-bar-brand"
          >CDA <em>|</em> ORPHAN DEPARTMENT</b-navbar-brand
        >

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content> User </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <!-- this jumbotron(an oversized card) contains alot of 
      <p> data label: {{data value to be displayed}} </p>
      this is to say that I wont be trying to comment on 
      every thing that is being displayed, its all self-evident -->
    <b-jumbotron class="m-3 pt-3 text-left">
      <b-row>
        <b-button
          variant="outline-success"
          class="float-left"
          size="sm"
          @click="goBack"
          >Back</b-button
        ></b-row
      >
      <b-container class="mt-3">
        <b-row>
          <b-col cols="3" class="mr-3"
            ><b-img-lazy
              v-bind="imageMainProps"
              rounded="circle"
              alt="Profile image"
              center
              :src="
                orphanDetails.officialdocuments
                  ? orphanDetails.officialdocuments.photoPortraitUrl
                  : 'https://via.placeholder.com/200/200?text=Profile+image'
              "
            ></b-img-lazy
          ></b-col>
          <b-col cols="7">
            <p class="my-2">
              <b>Name:</b> {{ orphanDetails.firstName }}
              {{ orphanDetails.fatherName }}
              {{ orphanDetails.grandFatherName }}
              {{ orphanDetails.greatGrandFatherName }}
            </p>
            <p class="my-2"><b>Gender:</b> {{ orphanDetails.gender }}</p>
            <p class="my-2">
              <b>Age:</b>
              {{ moment().diff(orphanDetails.dateOfBirth, "years") }}
            </p>
            <p class="my-2">
              <b>Place of birth:</b> {{ orphanDetails.placeOfBirth }}
            </p>
            <p class="my-2"><b>Clan:</b> {{ orphanDetails.clan }}</p>
            <p class="my-2">
              <b>Spoken languages:</b> {{ orphanDetails.spokenLanguages }}
            </p>
            <p class="my-2">
              <b>Sponsorship status:</b>
              {{
                orphanDetails.sponsorshipStatus == "inProgress"
                  ? "In-Progress"
                  : orphanDetails.sponsorshipStatus.charAt(0).toUpperCase() +
                    orphanDetails.sponsorshipStatus.slice(1)
              }}
              <b class="ml-2">Sponsored date:</b>
              {{
                orphanDetails.sponsoredDate
                  ? moment(orphanDetails.sponsoredDate).format("DD-MM-YYYY")
                  : "N/A"
              }}
            </p>
          </b-col>
        </b-row>

        <hr class="my-4" />
        <p class="lead font-weight-bolder text-muted">Health</p>
        <b-row>
          <b-col>
            <p class="my-2">
              <b>Physical Health:</b> {{ orphanDetails.physicalHealthStatus }}
            </p>
            <p class="my-2">
              <b>Psychological Health:</b>
              {{ orphanDetails.psychologicalHealthStatus }}
            </p>
            <p class="my-2">
              <b>Other Health Issues:</b>
              {{
                orphanDetails.otherHealthIssues
                  ? orphanDetails.otherHealthIssues
                  : "None"
              }}
            </p>
          </b-col>
        </b-row>

        <hr class="my-4" />
        <p class="lead my-2 font-weight-bolder text-muted">Education</p>
        <b-row>
          <b-col>
            <p class="my-2">
              <b>Enrollment Status:</b>
              {{ orphanDetails.education.enrollmentStatus }}
            </p>
          </b-col>
        </b-row>
        <b-row v-if="orphanDetails.education.enrollmentStatus == 'enrolled'">
          <b-col>
            <p class="my-2">
              <b>School Name:</b> {{ orphanDetails.education.schoolName }}
            </p>
            <p class="my-2">
              <b>Education Level:</b>
              {{
                orphanDetails.education.level == "gradeSchool"
                  ? "Grade School ( 1 ➡ 12 )"
                  : orphanDetails.education.level == "preSchool"
                  ? "Kindergarten ( KG )"
                  : orphanDetails.education.level == "underGraduate"
                  ? "University Under-Graduate"
                  : orphanDetails.education.level == "postGraduate"
              }}
            </p>
            <p class="my-2"><b>Year:</b> {{ orphanDetails.education.year }}</p>
          </b-col>
        </b-row>
        <b-row v-if="orphanDetails.education.enrollmentStatus == 'unenrolled'">
          <b-col>
            <p class="my-2">
              <b>Reason:</b> {{ orphanDetails.education.reason }}
            </p>
          </b-col>
        </b-row>
        <b-row v-if="orphanDetails.education.enrollmentStatus == 'droppedout'">
          <b-col>
            <p class="my-2">
              <b>Dropped out grade:</b> {{ orphanDetails.education.year }}
            </p>
            <p class="my-2">
              <b>Reason:</b> {{ orphanDetails.education.reason }}
            </p>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <p class="my-2">
              <b>Hobbies and Ambitions:</b> {{ orphanDetails.hobbies }}
            </p>
          </b-col>
        </b-row>

        <hr class="my-4" />
        <p class="lead my-2 font-weight-bolder text-muted">Household</p>
        <b-row>
          <b-col cols="4">
            <b-card no-body class="overflow-hidden">
              <b-row no-gutters>
                <b-col>
                  <b-card-body title="Father">
                    <b-card-text>
                      <p class="my-2">
                        <b>Name:</b> {{ orphanDetails.fatherName }}
                        {{ orphanDetails.grandFatherName }}
                        {{ orphanDetails.greatGrandFatherName }}
                      </p>
                      <p class="my-2">
                        <b>Date of birth:</b>
                        {{
                          moment(orphanDetails.father.dateOfBirth).format(
                            "DD-MM-YYYY"
                          )
                        }}
                      </p>
                      <p class="my-2">
                        <b>Date of death:</b>
                        {{
                          moment(orphanDetails.father.dateOfDeath).format(
                            "DD-MM-YYYY"
                          )
                        }}
                      </p>
                      <p class="my-2">
                        <b>Cause of death:</b>
                        {{ orphanDetails.father.causeOfDeath }}
                      </p>
                      <p class="my-2">
                        <b>Job:</b>
                        {{
                          orphanDetails.father.job
                            ? orphanDetails.father.job
                            : "Unemployed"
                        }}
                      </p>
                      <p class="my-2">
                        <b>Monthly Income:</b>
                        {{
                          orphanDetails.father.monthlyIncome
                            ? orphanDetails.father.monthlyIncome
                            : "None"
                        }}
                      </p>
                    </b-card-text>
                  </b-card-body>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
          <b-col
            ><b-card no-body class="overflow-hidden">
              <b-row no-gutters>
                <b-col>
                  <b-card-body title="Mother">
                    <b-card-text>
                      <p class="my-2">
                        <b>Name:</b> {{ orphanDetails.mother.firstName }}
                        {{ orphanDetails.mother.middleName }}
                        {{ orphanDetails.mother.lastName }}
                      </p>
                      <p class="my-2">
                        <b>Date of birth:</b>
                        {{
                          moment(orphanDetails.mother.dateOfBirth).format(
                            "DD-MM-YYYY"
                          )
                        }}
                      </p>
                      <p class="my-2">
                        <b>Vital status:</b>
                        {{
                          orphanDetails.mother.vitalStatus == "passed"
                            ? orphanDetails.mother.vitalStatus + " away"
                            : orphanDetails.mother.vitalStatus
                        }}
                      </p>
                      <p
                        class="my-2"
                        v-if="orphanDetails.mother.vitalStatus == 'passed'"
                      >
                        <b>Date of death:</b>
                        {{
                          moment(orphanDetails.mother.dateOfDeath).format(
                            "DD-MM-YYYY"
                          )
                        }}
                      </p>
                      <p
                        class="my-2"
                        v-if="orphanDetails.mother.vitalStatus == 'passed'"
                      >
                        <b>Cause of death:</b>
                        {{ orphanDetails.mother.causeOfDeath }}
                      </p>
                      <div v-if="orphanDetails.mother.vitalStatus == 'alive'">
                        <p class="my-2">
                          <b>Phone Number:</b>
                          {{ orphanDetails.mother.phoneNumber }}
                        </p>
                        <p class="my-2">
                          <b>Marital status:</b>
                          {{ orphanDetails.mother.maritalStatus }}
                        </p>
                        <p class="my-2">
                          <b>Monthly Expense:</b>
                          {{ orphanDetails.mother.monthlyExpense }}
                        </p>
                        <div v-if="orphanDetails.mother.motherjob">
                          <b-table
                            :items="orphanDetails.mother.motherjob"
                            :fields="motherjobFields"
                            small
                            bordered
                          >
                            <template #cell(name)="data">
                              {{ data }}
                            </template>
                            <template #cell(initDate)="data">
                              {{
                                moment(data.item.initDate).format("DD-MM-YYYY")
                              }}
                            </template>
                            <template #cell(termDate)="data">
                              {{
                                data.item.termDate
                                  ? moment(data.item.termDate).format(
                                      "DD-MM-YYYY"
                                    )
                                  : "Now"
                              }}
                            </template>
                          </b-table>
                        </div>
                      </div>
                    </b-card-text>
                  </b-card-body>
                </b-col>
              </b-row>
            </b-card></b-col
          >
        </b-row>
        <b-row class="mt-3">
          <b-col cols="8">
            <b-card no-body>
              <b-row no-gutters>
                <b-col>
                  <b-card-body title="Siblings">
                    <p class="my-2">
                      <b>Number of brothers:</b> {{ numberOfBrothers }}
                    </p>
                    <p class="my-2">
                      <b>Number of sisters:</b> {{ numberOfSisters }}
                    </p>
                    <p class="my-2">
                      <b>Number of sponsored siblings:</b>
                      {{ orphanDetails.numberOfSponserdSiblings }}
                    </p>
                    <b-table
                      :items="orphanDetails.siblings"
                      bordered
                      small
                    ></b-table>
                  </b-card-body>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
          <b-col cols="4">
            <b-card no-body>
              <b-row no-gutters>
                <b-col>
                  <b-card-body title="IGA and Family Property">
                    <p class="my-2">
                      <b>House ownership:</b>
                      {{ orphanDetails.iga_property.ownershipStatus }}
                    </p>
                    <p class="my-2">
                      <b>Other properties:</b>
                      {{
                        orphanDetails.iga_property.otherProperty
                          ? orphanDetails.iga_property.otherProperty
                          : "None"
                      }}
                    </p>
                  </b-card-body>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
        <hr class="my-4" />
        <p class="lead my-2 font-weight-bolder text-muted">Guardian</p>
        <b-row>
          <b-col>
            <p class="my-2">
              <b>Name:</b> {{ orphanDetails.guardian.firstName }}
              {{ orphanDetails.guardian.middleName }}
              {{ orphanDetails.guardian.lastName }}
            </p>
            <p class="my-2">
              <b>Date of birth:</b>
              {{
                moment(orphanDetails.guardian.dateOfBirth).format("DD-MM-YYYY")
              }}
            </p>
            <p class="my-2">
              <b>Gender:</b> {{ orphanDetails.guardian.gender }}
            </p>
            <p class="my-2">
              <b>Relation to orphan:</b>
              {{ orphanDetails.guardian.relationToOrphan }}
            </p>
            <p class="my-2">
              <b>Nationality:</b>
              {{
                orphanDetails.guardian.nationality
                  ? orphanDetails.guardian.nationality
                  : "Ethiopian"
              }}
              <b class="ml-2">Address:</b> {{ orphanDetails.guardian.state }}
              {{ orphanDetails.guardian.zone }}
              {{ orphanDetails.guardian.district }}
              {{ orphanDetails.guardian.kebele }}
              <b class="ml-2">P.O.Box:</b> {{ orphanDetails.guardian.POBox }}
            </p>
            <p class="my-2">
              <b>Email:</b> {{ orphanDetails.guardian.email }}
              <b class="ml-2">Mobile:</b> {{ orphanDetails.guardian.mobile }}
              <b class="ml-2">Telephone:</b>
              {{ orphanDetails.guardian.telephone }}
            </p>
            <p class="my-2">
              <b>Job:</b> {{ orphanDetails.guardian.job }}
              <b class="ml-2">Monthly Expense:</b>
              {{ orphanDetails.guardian.monthlyExpense }}
            </p>
          </b-col>
        </b-row>
      </b-container>
    </b-jumbotron>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { ORPHAN_FULL_INFORMATION_QUERY } from "../graphql/Queries";
export default {
  data() {
    return {
      moment,
      orphanId: this.$route.params.id,
      orphanDetails: {},
      imageMainProps: {
        blank: false,
        blankColor: "#777",
        width: 200,
        height: 200
      },
      motherjobFields: [
        { key: "currentJobTitle", label: "Job Title" },
        { key: "initDate", label: "Starting Date" },
        { key: "monthlyIncome", label: "Monthly Income" },
        { key: "termDate", label: "Ending Date" }
      ]
    };
  },
  computed: {
    numberOfBrothers() {
      let maleCounter = 0;
      this.orphanDetails.siblings.forEach(sibling => {
        if (sibling.gender == "M") maleCounter++;
      });
      return maleCounter;
    },
    numberOfSisters() {
      let femaleCounter = 0;
      this.orphanDetails.siblings.forEach(sibling => {
        if (sibling.gender == "F") femaleCounter++;
      });
      return femaleCounter;
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async getImgUri() {
      // i dont know why I made it wait 1 second
      // before proceeding but i dont recommend changing it
      setTimeout(() => {}, 1000);
      return this.orphanDetails.officialdocuments.photoPortraitUrl;
    }
  },
  async beforeMount() {
    // before mount hook is used instead of
    // the created hook like the other components to
    // ensure access to the router and the data[this.orphanId]
    await axios
      .post("/graphql/", {
        query: ORPHAN_FULL_INFORMATION_QUERY,
        variables: { id: this.orphanId }
      })
      .then(res => {
        console.log(res.data.data.orphan);
        this.orphanDetails = res.data.data.orphan;
      });
  }
};
</script>

<style scoped>
nav {
  background-color: darkgrey !important;
}
.nav-bar-brand {
  font-family: "porter_sans";
}

@media only screen and (max-width: 600px) {
  .nav-bar-brand {
    font-family: "porter_sans";
    font-size: 70%;
  }
}
</style>
