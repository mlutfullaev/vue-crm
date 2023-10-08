<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p
          class="currency-line"
          v-for="cur of currencies"
          :key="cur">
          <span>{{currencySymbol(cur)}}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['rates'],
  name: 'homeBill',
  data: () => ({
    currencies: ['RUB', 'EUR', 'USD']
  }),
  computed: {
    base () {
      return this.$store.getters.info.bill / (this.rates.RUB / this.rates.EUR)
    }
  },
  methods: {
    getCurrency (currency) {
      return Math.floor(this.base * this.rates[currency])
    },
    currencySymbol (currency) {
      return Intl.NumberFormat('ru-RU', { style: 'currency', currency }).format(this.getCurrency(currency))
    }
  }
}
</script>
