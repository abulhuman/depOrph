<template>
  <div>
    <Header />
    <el-container class="row">
      <el-aside style="height: 100vh;" class="bg-light col-2 p-0"
        ><b-list-group class="text-left mt-3 ml-2 rounded-0">
          <b-list-group-item variant="secondary" button @click="showAdd"
            >Add new site</b-list-group-item
          >
          <b-list-group-item variant="secondary" button
            >View Sites</b-list-group-item
          >
          <b-list-group-item variant="secondary" button
            >View Social-workers</b-list-group-item
          >
        </b-list-group></el-aside
      >
      <el-container class="col-9 mt-3">
        <el-main>
          <!-- <AddOrphan v-if="Add" /> -->
          <OrphanTable />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Header";
// import AddOrphan from "@/components/AddOrphan";
import OrphanTable from "@/components/tables/OrphanTable.vue";
export default {
  data() {
    return {
      Add: true,
    };
  },
  components: {
    Header,
    // AddOrphan,
    OrphanTable,
  },
  methods: {
    showAdd: function() {
      this.Add = true;
    },
  },
};
</script>

<style></style>
