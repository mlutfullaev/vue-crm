<template>
  <div>
    <div class="page-title">
      <h3>{{$localize('menuPlanning')}}</h3>
      <h4>{{ $currency(info.bill) }}</h4>
    </div>

    <Loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">{{$localize('noCategories')}}<router-link to="/categories">{{$localize('addCategory')}}</router-link></p>
    <section v-else>
      <div v-for="cat in categories" :key="cat.id" >
        <p>
          <strong>{{ cat.title }}:</strong>
          {{ $currency(cat.spend) }} из {{ $currency(cat.limit) }}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div class="determinate" :class="[cat.progressColor]" :style="{width: cat.progressPercent + '%'}"></div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    categories: [],
    loading: true
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted () {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.categories = categories.map(cat => {
      const spend = records
        .filter(r => r.categoryId === cat.id)
        .filter(r => r.type === 'outcome')
        .reduce((total, record) => {
          const all = total + +record.amount
          return all
        }, 0)

      const percent = 100 * spend / cat.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60 ? 'green' : percent < 90 ? 'yellow' : 'red'
      const tooltipValue = cat.limit - spend
      const tooltip = `${tooltipValue < 0 ? 'Првышение на' : 'Осталось'}: ${Math.abs(tooltipValue)}`

      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip
      }
    })
    this.loading = false
  }
}
</script>
