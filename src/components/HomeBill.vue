<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{ $localize('currencyAccount') }}</span>

        <Loader v-if="loading" />
        <p
          v-else
          class="currency-line"
          v-for="cur of currencies"
          :key="cur">
          <span>{{$currency(getCurrency(cur), cur)}}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props: ['rates'],
  name: 'homeBill',
  data: () => ({
    loading: true,
    currencies: ['RUB', 'EUR', 'USD']
  }),
  mounted () {
    if (this.info.bill) {
      this.loading = false
    }
  },
  computed: {
    ...mapGetters(['info']),
    base () {
      return this.info.bill / (this.rates.RUB / this.rates.EUR)
    }
  },
  methods: {
    getCurrency (currency) {
      return Math.floor(this.base * this.rates[currency])
    }
  },
  watch: {
    info () {
      if (this.info.bill) {
        this.loading = false
      }
    }
  }
}
</script>
