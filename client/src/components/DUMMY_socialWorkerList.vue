<template>
  <div>
    <b-card header="SOCIAL WORKER LIST PLACEHOLDER COMPONENT">
      <!-- using a loading skeleton table until the requirements
          for social workers is identified and modeled in the database -->
      <b-skeleton-table
        :rows="7"
        :columns="4"
        :table-props="{ bordered: false, striped: true }"
      >
      </b-skeleton-table>
    </b-card>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.card-body {
  padding: 0px;
}
.table {
  margin: 0px;
}
</style>
