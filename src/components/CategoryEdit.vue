<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>
      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select>
            <option>Category</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            type="text"
            id="name"
            v-model="title"
            :class="{invalid: v$.title.error}">
          <label for="name">Название</label>
          <span v-if="!v$.title.required.$response && v$.title.$dirty" class="helper-text invalid">Название не может быть пустым</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model="limit"
            :class="{invalid: v$.limit.error}">
          <label for="limit">Лимит</label>
          <span
            v-if="!v$.limit.minValue.$response && v$.limit.$dirty"
            class="helper-text invalid">Минимальная величина {{v$.limit.minLength.$params.min}}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { minValue, required } from '@vuelidate/validators'
import M from 'materialize-css'

export default {
  data: () => ({
    v$: useVuelidate(),
    title: '',
    limit: 1
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(1) }
  },
  mounted () {
    M.updateTextFields()
  },
  methods: {
    submitHandler () {
      if (this.v$.$invalid) {
        this.v$.$touch()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
