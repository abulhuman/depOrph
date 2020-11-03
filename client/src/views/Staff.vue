<template>
  <div>
    <Header />
    <el-container class="row">
      <el-aside style="height: 100vh;" class="bg-light col-2 p-0"
        ><b-list-group class="text-left mt-3 ml-2 rounded-0">
          <b-list-group-item variant="info" button @click="addSts = !addSts"
            >Add new site</b-list-group-item
          >
          <b-list-group-item variant="primary" button
            >View Sites</b-list-group-item
          >
          <b-list-group-item variant="info" button
            >View Social-workers</b-list-group-item
          >
        </b-list-group></el-aside
      >
      <el-container class="col-9 mt-3">
        <el-main>
          <AddOrphan v-if="addSts" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Header";
import AddOrphan from "@/components/AddOrphan";
export default {
  data() {
    return {
      addSts: true
    };
  },
  components: {
    Header,
    AddOrphan
  }
};
</script>

<style></style>
