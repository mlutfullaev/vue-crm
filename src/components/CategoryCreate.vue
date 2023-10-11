<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ $localize('create') }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            type="text"
            id="name"
            v-model="title"
            :class="{invalid: v$.title.error}">
          <label for="name">{{ $localize('name') }}</label>
          <span
            v-if="!v$.title.required.$response && v$.title.$dirty"
            class="helper-text invalid"
          >{{ $localize('nameEmpty') }}</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: v$.limit.error}">
          <label for="limit">{{ $localize('limit') }}</label>
          <span
            v-if="!v$.limit.minValue.$response && v$.limit.$dirty"
            class="helper-text invalid"
          >{{ $localize('minLength') }} {{v$.limit.minValue.$params.min}}</span>
          <span
            v-if="!v$.limit.required.$response && v$.limit.$dirty"
            class="helper-text invalid">{{ $localize('limitEmpty') }}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ $localize('create') }}Создать
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
    limit: 100
  }),
  validations: {
    title: { required },
    limit: { required, minValue: minValue(100) }
  },
  mounted () {
    M.updateTextFields()
  },
  methods: {
    async submitHandler () {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }

      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        })
        this.title = ''
        this.limit = 100
        this.v$.$reset()
        this.$message('Категория было создана')
        this.$emit('created', category)
      } catch (e) {
        console.error(e.message)
      }
    }
  }
}
</script>

<style>

</style>
