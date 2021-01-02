<template>
  <v-app class="overflow-hidden">
    <!-- <v-app-bar app color="primary" dark> </v-app-bar> -->

    <v-main>
      <Staff />
      <!-- <OrphanTable /> -->
      <!-- <Test /> -->
    </v-main>
  </v-app>
</template>

<style>
@font-face {
  font-family: "porter_sans";
  src: url("./fonts/porter-sans-inline-block-webfont.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "fredoka_one";
  src: url("./fonts/FredokaOne-Regular.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "red_hat_dispaly";
  src: url("./fonts/RedHatDisplay-Regular.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

#app {
  font-family: "red_hat_dispaly", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  margin: 0;
}
</style>

<script>
import Staff from "@/views/Staff.vue";
// import OrphanTable from "@/components/tables/OrphanTable.vue";
// import Test from "@/components/tables/test.vue";

export default {
  name: "App",

  components: {
    Staff,
    // OrphanTable,
    // Test,
  },

  data: () => ({
    //
  }),
};
</script>
