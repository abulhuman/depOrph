<template>
  <div class="accordion" role="tablist">
    <!-- PERSONAL INFORMATION -->
    <b-card no-body>
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-1 variant="info" class="text-left"
          >1. Personal Inforamtion</b-button
        >
      </b-card-header>
      <b-collapse
        id="accordion-1"
        accordion="add-orphan-form-accordion"
        role="tabpanel"
      >
        <b-card-body>
          <b-form>
            <b-form-row>
              <b-col class="text-left">
                <b-form-group label="Child Name" label-for="childName">
                  <b-form-input
                    id="childName"
                    required
                    v-model="orphanFirstName"
                    placeholder="Child Name ... "
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col class="text-left">
                <b-form-group label="Father Name" label-for="fatherName">
                  <b-form-input
                    required
                    id="fatherName"
                    v-model="orphanFatherName"
                    placeholder="Father Name ... "
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col class="text-left">
                <b-form-group
                  label="Grandfather Name"
                  label-for="grandfatherName"
                >
                  <b-form-input
                    id="grandfatherName"
                    required
                    v-model="orphanGrandFatherName"
                    placeholder="Grandfather Name ... "
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col class="text-left">
                <b-form-group
                  label="Great-Grandfather Name"
                  label-for="great-grandfatherName"
                >
                  <b-form-input
                    id="great-grandfatherName"
                    required
                    v-model="orphanGreatGrandFatherName"
                    placeholder="Great-Grandfather Name ... "
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-form-row>

            <b-form-row>
              <b-col class="text-left col-5">
                <b-form-group label="Clan" label-for="clan">
                  <b-form-input
                    id="clan"
                    v-model="orphanClan"
                    placeholder="Clan ... "
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col class="text-left col-2">
                <b-form-group label="Gender" label-for="gender">
                  <b-form-select id="gender" required v-model="orphanGender">
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
              <b-col class="text-left col-5">
                <b-form-group
                  label="Spoken language(s)"
                  label-for="spokenLanguages"
                  description="Enter languages separated by comma(,)"
                >
                  <b-form-tags
                    id="spokenLanguages"
                    v-model="orphanSpokenLanguages"
                    separator=","
                    placeholder="Add Languages ..."
                    tag-variant="info"
                  >
                  </b-form-tags>
                </b-form-group>
              </b-col>
            </b-form-row>

            <b-form-row>
              <b-col class="text-left">
                <b-form-group label="Date of Birth" label-for="dateOfBrith">
                  <b-form-input
                    type="date"
                    id="dateOfBrith"
                    required
                    v-model="tmpOrphanDateOfBirth"
                    placeholder="Select date ..."
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col class="text-left">
                <b-form-group label="Place of Birth" label-for="placeOfBrith">
                  <b-form-input
                    id="placeOfBrith"
                    v-model="orphanPlaceOfBirth"
                    placeholder="Place of Birth ... "
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-form-row>
            <b-form-row>
              <b-col class="text-left">
                <b-form-group
                  label="Birth Certificate (Upload)"
                  label-for="orphanBirthCertificate"
                >
                  <b-form-file
                    id="orphanBirthCertificate"
                    placeholder="Upload Birth Certificate ..."
                    accept="image/*"
                  >
                  </b-form-file>
                </b-form-group>
              </b-col>
              <b-col class="text-left">
                <b-form-group
                  label="Portrait photo (Upload)"
                  label-for="orphanPhotoPortrait"
                >
                  <b-form-file
                    id="orphanPhotoPortrait"
                    placeholder="Upload Portrait Photo ..."
                    accept="image/*"
                  >
                  </b-form-file>
                </b-form-group>
              </b-col>
            </b-form-row>
            <b-form-row align-h="start">
              <b-col cols="1">
                <b-button
                  v-b-toggle.accordion-2
                  align-h="start"
                  variant="primary"
                  >Next</b-button
                ></b-col
              ></b-form-row
            >
          </b-form>
        </b-card-body>
      </b-collapse>
    </b-card>
    <!-- HEALTH INFORMATION -->
    <b-card no-body>
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-2 variant="info" class="text-left"
          >2. Health Inforamtion</b-button
        >
      </b-card-header>
      <b-collapse
        id="accordion-2"
        accordion="add-orphan-form-accordion"
        role="tabpanel"
      >
        <b-card-body>
          <b-form>
            <b-form-row>
              <b-col class="text-left">
                <b-form-group label="Physical Health">
                  <b-form-radio
                    name="physicalHealthRadios"
                    size="sm"
                    plain
                    class="ml-2"
                    value="Healthy"
                    v-model="tmpOrphanPhysicalHealthRadio"
                    >Healthy</b-form-radio
                  ><b-input-group class="mt-2">
                    <b-input-group-prepend is-text>
                      <b-form-radio
                        name="physicalHealthRadios"
                        size="sm"
                        plain
                        class="pl-2 ml-1"
                        required
                        value="Disabled"
                        v-model="tmpOrphanPhysicalHealthRadio"
                      />
                      <label
                        class="form-check-label mb-0 ml-1"
                        for="physicalHealth-disabledRadio"
                        >Disabled</label
                      >
                    </b-input-group-prepend>
                    <b-form-input
                      for="physicalHealth-disabledRadio"
                      placeholder="Mention disability ... "
                      required
                      v-model="tmpOrphanDisability"
                    ></b-form-input>
                    <!-- 🔼:✅ TODO:DONE format the disabled as "disabled:disability" 🔼 -->
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-form-row>

            <b-form-row>
              <b-col class="text-left">
                <b-form-group label="Psychological Health">
                  <b-form-radio
                    name="psychologicalHealthRadios"
                    size="sm"
                    plain
                    required
                    v-model="orphanPsychologicalHealthStatus"
                    >Extrovert / Sociable</b-form-radio
                  >
                  <b-form-radio
                    name="psychologicalHealthRadios"
                    size="sm"
                    plain
                    required
                    v-model="orphanPsychologicalHealthStatus"
                    >Introvert / Not Sociable</b-form-radio
                  >
                </b-form-group></b-col
              >
            </b-form-row>
            <b-form-row>
              <b-col class="text-left">
                <b-form-group
                  label-for="other-health-issues-textarea"
                  label="Other Health Issues"
                >
                  <b-textarea
                    id="other-health-issues-textarea"
                    class="mt-2"
                    placeholder="Mention ..."
                    no-resize
                    rows="3"
                    v-model="orphanOtherHealthIssues"
                  ></b-textarea
                ></b-form-group>
              </b-col>
            </b-form-row>
            <b-form-row align-h="start">
              <b-col cols="1">
                <b-button
                  v-b-toggle.accordion-3
                  align-h="start"
                  variant="primary"
                  >Next</b-button
                >
              </b-col>
            </b-form-row>
          </b-form>
        </b-card-body>
      </b-collapse>
    </b-card>
    <!-- EDUCATION INFORMATION -->
    <b-card no-body>
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-3 variant="info" class="text-left"
          >3. Education Information</b-button
        >
      </b-card-header>
      <b-collapse
        id="accordion-3"
        accordion="add-orphan-form-accordion"
        role="tabpanel"
      >
        <b-card-body>
          <b-form>
            <b-form-row>
              <b-col class="text-left col-6">
                <b-form-group
                  label="Enrollment Status"
                  label-for="educationEnrollmentStatus"
                >
                  <b-form-select
                    id="educationEnrollmentStatus"
                    required
                    v-model="educationEnrollmentStatus"
                  >
                    <template #first>
                      <b-form-select-option disabled value="">
                        - Select Status -
                      </b-form-select-option>
                    </template>
                    <b-form-select-option value="Enrolled"
                      >Enrolled</b-form-select-option
                    >
                    <b-form-select-option value="Droppped-out"
                      >Droppped-out</b-form-select-option
                    >
                    <b-form-select-option value="Un-Enrolled"
                      >Un-Enrolled</b-form-select-option
                    >
                  </b-form-select>
                </b-form-group>
              </b-col>
            </b-form-row>
            <!-- Enrolled container -->
            <b-container
              class="p-0"
              v-if="educationEnrollmentStatus === 'Enrolled'"
            >
              <!-- Enrolled school type -->
              <b-form-row>
                <b-col>
                  <b-form-group class="text-left" label="School Type">
                    <div
                      class="custom-control custom-radio custom-control-inline"
                    >
                      <input
                        type="radio"
                        id="publicSchoolTypeRadio"
                        name="SchoolTypeRadios"
                        class="custom-control-input"
                        checked
                      />
                      <label
                        class="custom-control-label"
                        for="publicSchoolTypeRadio"
                        >Public</label
                      >
                    </div>
                    <div
                      class="custom-control custom-radio custom-control-inline"
                    >
                      <input
                        type="radio"
                        id="privateSchoolTypeRadio"
                        name="SchoolTypeRadios"
                        class="custom-control-input"
                      />
                      <label
                        class="custom-control-label"
                        for="privateSchoolTypeRadio"
                        >Private</label
                      >
                    </div>
                  </b-form-group>
                </b-col>
              </b-form-row>
              <!-- Enrolled school grade & school name -->
              <b-form-row>
                <b-col class="text-left col-4">
                  <b-form-group label="Grade" label-for="grade">
                    <b-form-input
                      id="grade"
                      type="number"
                      max="12"
                      min="1"
                      placeholder="Select school grade ..."
                    >
                    </b-form-input>
                  </b-form-group>
                </b-col>
                <b-col class="text-left">
                  <b-form-group label="School Name" label-for="schoolName">
                    <b-form-input
                      id="schoolName"
                      placeholder="School Name ... "
                    >
                    </b-form-input>
                  </b-form-group>
                </b-col>
              </b-form-row>
            </b-container>
            <!-- Droppped-out container -->
            <b-container
              class="p-0"
              v-if="educationEnrollmentStatus === 'Droppped-out'"
            >
              <!-- Droppped-out school grade & reason -->
              <b-form-row>
                <b-col class="text-left col-4">
                  <b-form-group label="Grade" label-for="drop-out-grade">
                    <b-form-input
                      id="drop-out-grade"
                      type="number"
                      max="12"
                      min="1"
                      placeholder="Select school grade ..."
                    >
                    </b-form-input>
                  </b-form-group>
                </b-col>
                <b-col class="text-left">
                  <b-form-group
                    label="Reason"
                    label-for="drop-out-reason"
                    description="State the reason why the child dropped out of school."
                  >
                    <b-form-input
                      id="drop-out-reason"
                      placeholder="Reason ... "
                    >
                    </b-form-input>
                  </b-form-group>
                </b-col>
              </b-form-row>
            </b-container>
            <!-- Un-Enrolled container -->
            <b-container
              class="p-0"
              v-if="educationEnrollmentStatus === 'Un-Enrolled'"
            >
              <!-- Un-Enrolled reason -->
              <b-from-row>
                <b-col class="text-left">
                  <b-form-group
                    label="Reason"
                    label-for="un-enrolled-reason"
                    description="State the reason why the child is not in school."
                  >
                    <b-form-input
                      id="un-enrolled-reason"
                      placeholder="Reason ... "
                    >
                    </b-form-input>
                  </b-form-group>
                </b-col>
              </b-from-row>
            </b-container>

            <b-form-row>
              <b-col class="text-left">
                <b-form-group
                  label-for="hobbies"
                  label="Hobbies &amp; Ambitions"
                >
                  <b-textarea
                    id="hobbies"
                    class="mt-2"
                    placeholder="Mention ..."
                    no-resize
                    rows="3"
                    v-model="orphanHobbies"
                  ></b-textarea
                ></b-form-group>
              </b-col>
            </b-form-row>
            <b-form-row align-h="start">
              <b-col cols="1">
                <b-button
                  v-b-toggle.accordion-4
                  align-h="start"
                  variant="primary"
                  >Next</b-button
                >
              </b-col>
            </b-form-row>
          </b-form>
        </b-card-body>
      </b-collapse>
    </b-card>
    <!-- HOUSEHOLD INFORMATION -->
    <b-card no-body>
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-4 variant="info" class="text-left"
          >4. Household Information</b-button
        >
      </b-card-header>
      <b-collapse
        id="accordion-4"
        visible
        accordion="add-orphan-form-accordion"
        role="tabpanel"
      >
        <b-card-body>
          <b-form>
            <h5 class="text-left">Father</h5>
            <b-form-row>
              <b-col class="text-left">
                <b-form-group
                  label="Date of Birth"
                  label-for="fatherDateOfBrith"
                >
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
                <b-form-group
                  label="Date of Death"
                  label-for="fatherDateOfDeath"
                >
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
                <b-form-group
                  label="Cause of Death"
                  label-for="fatherCauseOfDeath"
                >
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
                <b-form-group
                  label="Monthly Income"
                  label-for="fatherMonthlyIncome"
                >
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
                <b-form-group
                  label="Date of Birth"
                  label-for="motherDateOfBrith"
                >
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
                <b-form-group
                  label="Vital Status"
                  label-for="motherVitalStatus"
                >
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
                    <b-form-select-option value="Alive"
                      >Alive</b-form-select-option
                    >
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
                  <b-form-group
                    label="Monthly Income"
                    label-for="motherMonthlyIncome"
                  >
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
                  <b-form-group
                    label="Phone Number"
                    label-for="motherPhoneNumber"
                  >
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
                  <b-form-group
                    label="Cause of Death"
                    label-for="motherCauseOfDeath"
                  >
                    <b-form-input
                      id="motherCauseOfDeath"
                      placeholder="Cause of Death ..."
                      v-model="motherCauseOfDeath"
                    >
                    </b-form-input> </b-form-group
                ></b-col>
                <b-col class="text-left col-4">
                  <b-form-group
                    label="Date of Death"
                    label-for="motherDateOfDeath"
                  >
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
                  @ok.prevent="handleSubmit"
                  @cancel.prevent="handleCancel"
                >
                  <form ref="form" @submit.stop.prevent="handleSubmit">
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
                            <b-form-select-option value="M"
                              >Male</b-form-select-option
                            >
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
                            @input="
                              update(newSibling, 'EducationLevel', $event)
                            "
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
                <b-button
                  v-b-toggle.accordion-5
                  align-h="start"
                  variant="primary"
                  >Next</b-button
                >
              </b-col>
            </b-form-row>
          </b-form>
        </b-card-body>
      </b-collapse>
    </b-card>
    <!-- GUARDIAN INFORMATION -->
    <b-card no-body>
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-5 variant="info" class="text-left"
          >5. Guardian Information</b-button
        >
      </b-card-header>
      <b-collapse
        id="accordion-5"
        accordion="add-orphan-form-accordion"
        role="tabpanel"
      >
        <b-card-body>
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
                <b-form-group
                  label="Middle Name"
                  label-for="guardianMiddleName"
                >
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
                  <b-form-select
                    id="guardianGender"
                    required
                    v-model="guardianGender"
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
                <b-form-group
                  label="Date of Birth"
                  label-for="guardianDateOfBirth"
                >
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
                <b-form-group
                  label="Nationality"
                  label-for="guardianNationality"
                >
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
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      orphanFirstName: "",
      orphanFatherName: "",
      orphanGrandFatherName: "",
      orphanGreatGrandFatherName: "",
      orphanGender: "",
      orphanPlaceOfBirth: "",
      orphanClan: "", // TODO:DONE add to schema
      orphanSpokenLanguages: [], // TODO:DONE add to schema
      orphanNumberOfSponserdSiblings: "",
      orphanPsychologicalHealthStatus: "",
      orphanOtherHealthIssues: "",
      orphanHobbies: "",
      tmpOrphanPhysicalHealthRadio: "",
      tmpOrphanDisability: "",
      //   orphanPhysicalHealthStatus: computed prop, doesn't exist in data(){}, // TODO:DONE format the disabled as "disabled:disability"
      tmpOrphanDateOfBirth: "", // TODO:DONE formatted as ISO DateTime

      educationEnrollmentStatus: "",
      educationSchoolName: "",
      educationTypeOfSchool: "",
      educationGrade: "", // edd checker
      educationYear: "",
      educationLevel: "",
      educationReason: "",

      fatherCauseOfDeath: "",
      fatherJobTitle: "",
      fatherMonthlyIncome: "",
      tmpFatherDateOfBrith: "", // turned into computed props
      tmpFatherDateOfDeath: "", // turned into computed props

      motherFirstName: "",
      motherMiddleName: "",
      motherLastName: "",
      motherVitalStatus: "", // add to UI
      motherCauseOfDeath: "", // TODO:DONE add to schema
      motherMaritalStatus: "",
      motherJobTitle: "",
      motherMonthlyExpense: "",
      motherMonthlyIncome: "",
      motherSourceOfIncome: [],
      motherPhoneNumber: "",
      tmpMotherDateOfBirth: "", // add to UI, turned into computed props
      tmpMotherDateOfDeath: "", // TODO:DONE add to schema, turned into computed props

      newSibling: {
        // siblingFullName: " ",
        // siblingGender: " ",
        // siblingAge: " ",
        // siblingSchoolGrade: " ",
        // siblingJob: " ",
        // siblingMaritalStatus: " "
      },

      siblingFullNameState: null,
      siblingGenderState: null,
      siblingAgeState: null,
      siblingMaritalStatusState: null,
      siblings: [],

      igaOwnershipStatus: "",
      igaOtherProperty: "",

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
      tmpGuardianDateOfBirth: "" // turned into computed props
    };
  },
  computed: {
    orphanPhysicalHealthStatus: function() {
      console.log(this.tmpOrphanPhysicalHealthRadio);
      if (this.tmpOrphanPhysicalHealthRadio === "Disabled") {
        return `Disabled: ${this.tmpOrphanDisability}`;
      } else {
        return "Healthy";
      }
    },
    orphanDateOfBirth: function() {
      return moment(this.tmpOrphanDateOfBirth).format();
    },
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
    },
    guadrianDateOfBrith: function() {
      return moment(this.tmpGuardianDateOfBrith).format();
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

    // checkFromValidity: function() {
    //   const valid = this.$refs.form.checkValidity();
    //   console.log(this.$refs.siblingFullName);
    //   const validSiblingFullName = this.$refs.siblingFullName.checkValidity();
    //   const validSiblingGender = this.$refs.siblingGender.checkValidity();
    //   const validSiblingAge = this.$refs.siblingAge.checkValidity();
    //   const validSiblingMaritalStatus = this.$refs.siblingMaritalStatus.checkValidity();
    //   this.siblingFullNameState = valid;
    //   this.siblingGenderState = valid;
    //   this.siblingAgeState = valid;
    //   this.siblingMaritalStatusState = valid;
    //   return { valid, validSiblingFullName };
    // },
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
    // resetModal: function(){
    //   this.name = "";
    //   this.nameState = null;
    // },
    // handleOk: function(bvModalEvt){
    //   bvModalEvt.preventDefault();

    //   this.handleSubmit();
    // },
    handleSubmit: function() {
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
      console.log("🦆®");
    },
    handleCancel() {
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
