<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading" />
    <p class="center" v-else-if="!records.length">Записей еще нет</p>
    <section v-else >
      <HistoryTable :page="page" :records="items" />

      <vue-awesome-paginate
        :total-items="records.length"
        :items-per-page="pageSize"
        :max-pages-shown="5"
        :on-click="pageChangeHandler"
        v-model="page"
      />
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable.vue'
import paginationMixin from '@/mixins/pagination.mixin'

export default {
  name: 'History',
  mixins: [paginationMixin],
  components: { HistoryTable },
  data: () => ({
    records: [],
    loading: true
  }),
  async mounted () {
    this.records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.setupPagination(this.records.map(record => {
      return {
        ...record,
        categoryTitle: categories.find(c => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход'
      }
    }))
    this.loading = false
  }
}
</script>

<style>
.pagination-container {
  display: flex;
  column-gap: 10px;
}
.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 5px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}
.paginate-buttons:hover {
  background-color: #d8d8d8;
}
.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}
.active-page:hover {
  background-color: #2988c8;
}
</style>
