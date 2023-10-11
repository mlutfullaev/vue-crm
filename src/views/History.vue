<template>
  <div>
    <div class="page-title">
      <h3>{{$localize('historyRecord')}}</h3>
    </div>

    <div class="history-chart">
      <Pie
        :data="chartData"
      />
    </div>
    <Loader v-if="loading" />
    <p class="center" v-else-if="!records.length">{{$localize('recordsEmpty')}}</p>
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
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
ChartJS.register(ArcElement, Tooltip, Legend)
export default {
  name: 'History',
  mixins: [paginationMixin],
  components: { Pie, HistoryTable },
  data: () => ({
    records: [],
    categories: [],
    chartData: {
      labels: [],
      datasets: [
        {
          backgroundColor: [],
          data: []
        }
      ]
    },
    loading: true
  }),
  async mounted () {
    this.records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')

    this.chartData = {
      labels: this.categories.map(c => c.title),
      datasets: [{
        label: 'Расходы по категориям',
        data: this.categories.map(c => {
          let total = 0
          this.records.forEach(record => {
            if (record.categoryId === c.id && record.type === 'outcome') {
              total += +record.amount
            }
          })
          return total
        }),
        backgroundColor: this.categories.map(c => '#' + Math.floor(Math.random() * 16777215).toString(16))
      }]
    }

    this.setup()

    this.loading = false
  },
  methods: {
    setup () {
      this.setupPagination(this.records.map(record => {
        return {
          ...record,
          categoryTitle: this.categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход'
        }
      }))
    }
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
