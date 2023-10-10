<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>
      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="categorySelect" v-model="current">
            <option
                v-for="c of categories"
                :key="c.id"
                :value="c.id"
            >
              {{ c.title }}
            </option>
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
          <span
            v-if="!v$.title.required.$response && v$.title.$dirty"
            class="helper-text invalid">Название не может быть пустым</span>
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
            class="helper-text invalid">Минимальная величина {{ v$.limit.minLength.$params.min }}</span>
          <span
            v-if="!v$.limit.required.$response && v$.limit.$dirty"
            class="helper-text invalid">Лимит не может быть пустым</span>
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
  props: ['categories'],
  data: () => ({
    v$: useVuelidate(),
    title: '',
    limit: 1,
    current: null,
    select: null
  }),
  validations: {
    title: { required },
    limit: { required, minValue: minValue(1) }
  },
  async mounted () {
    this.select = M.FormSelect.init(this.$refs.categorySelect)
    M.updateTextFields()
  },
  created () {
    const { id, title, limit } = this.categories[0]
    this.title = title
    this.limit = limit
    this.current = id
  },
  watch: {
    current (newCurrent) {
      const { title, limit } = this.categories.find(c => c.id === newCurrent)
      this.title = title
      this.limit = limit
    }
  },
  destroy () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  methods: {
    async submitHandler () {
      if (this.v$.$invalid) {
        this.v$.$touch()
      }

      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$emit('updateCategory', categoryData)
        this.$message('Категория успешно обнавлено!')
      } catch (e) {
        console.error(e.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
