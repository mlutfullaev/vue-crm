<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ $localize('exchangeRate') }}</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>{{ $localize('currency') }}</th>
            <th>{{ $localize('rate') }}</th>
            <th>{{ $localize('date') }}</th>
          </tr>
          </thead>

          <tbody>
            <tr v-for="cur of currencies" :key="cur">
              <td>{{cur}}</td>
              <td>{{rates[cur].toFixed(2)}}</td>
              <td>{{$dateCustom(date)}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['rates', 'date'],
  name: 'homeCurrency',
  data: () => ({
    currencies: ['RUB', 'EUR', 'USD']
  })
}
</script>
