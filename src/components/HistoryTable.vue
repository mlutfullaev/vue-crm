<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Сумма</th>
      <th>Дата</th>
      <th>Категория</th>
      <th>Тип</th>
      <th>Открыть</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(record, i) in records" :key="record.id">
      <td>{{i + 1}}</td>
      <td>{{ record.amount }}</td>
      <td>{{record.date}}</td>
      <td>{{record.categoryTitle}}</td>
      <td>
        <span class="white-text badge" :class="record.typeClass">{{record.typeText}}</span>
      </td>
      <td>
        <button
          v-tooltip="'Посмотреть подробнее'"
          class="btn-small btn" @click="$router.push(`/detail/${record.id}`)">
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import router from '@/router'

export default {
  methods: {
    router () {
      return router
    }
  },
  props: ['records']
}
</script>
