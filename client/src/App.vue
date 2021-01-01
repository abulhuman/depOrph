<template>
  <v-app class="overflow-hidden">
    <!-- <v-app-bar app color="primary" dark> </v-app-bar> -->

    <v-main>
      <OrphanTable />
      <!-- <Test /> -->
    </v-main>
  </v-app>
</template>

<script>
import OrphanTable from "@/components/tables/OrphanTable.vue";
// import Test from "@/components/tables/test.vue";

export default {
  name: "App",

  components: {
    OrphanTable,
    // Test,
  },

  data: () => ({
    //
  }),
};
</script>
