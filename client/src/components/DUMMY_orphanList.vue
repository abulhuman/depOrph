<template>
  <div>
    <b-card header="ORPHAN LIST PLACEHOLDER COMPONENT">
      <b-skeleton-table
        :rows="10"
        :columns="6"
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
