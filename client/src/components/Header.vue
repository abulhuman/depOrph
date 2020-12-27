<template>
  <div>
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
</template>

<script>
export default {};
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
