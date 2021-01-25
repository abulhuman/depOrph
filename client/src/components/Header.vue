<template>
  <div>
    <b-navbar toggleable="lg" type="light">
      <b-navbar-brand href="#" class="nav-bar-brand"
        >CDA <em>|</em> ORPHAN DEPARTMENT</b-navbar-brand
      >

      <!-- navbar links change into button with three lines on smaller screens -->
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- orphan search (db search) input box -->
          <b-nav-form class="w-300-px" @submit.prevent="onSubmit">
            <b-form-input
              size="sm"
              class="mr-sm-2 w-220-px"
              placeholder="Search by full name or part of it..."
              v-model="searchTerm"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Search</b-button
            >
          </b-nav-form>

          <!-- dummy content with no functionality -->
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
</template>

<script>
export default {
  data() {
    return {
      searchTerm: null
    };
  },
  methods: {
    onSubmit: function() {
      // emit `searchSubmit` event to send seatchTerm info to Staff.vue
      this.$emit("searchSubmit", { searchTerm: this.searchTerm });

      // clear the input
      this.searchTerm = null;
    }
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

.w-300-px {
  width: 300px;
}

.w-220-px {
  width: 220px !important;
}
</style>
