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
      <HistoryTable :records="records" />
    </section>
  </div>
</template>

<script>

import HistoryTable from '@/components/HistoryTable.vue'

export default {
  name: 'History',
  components: { HistoryTable },
  data: () => ({
    records: [],
    categories: [],
    loading: true
  }),
  async mounted () {
    const records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')
    this.records = records.map(record => {
      return {
        ...record,
        categoryTitle: this.categories.find(c => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход'
      }
    })
    this.loading = false
  }
}
</script>
