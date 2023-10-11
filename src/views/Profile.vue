<template>
  <div>
    <div class="page-title">
      <h3>{{ $localize('profileTitle') }}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{invalid: v$.name.$error}">
        <label for="description">Имя</label>
        <small
          v-if="!v$.name.required.$response && v$.name.$dirty"
          class="helper-text invalid">
          Имя не может быть пустым
        </small>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale">
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{$localize('update')}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required } from '@vuelidate/validators'
import M from 'materialize-css'
import { mapActions, mapGetters } from 'vuex'
import { useVuelidate } from '@vuelidate/core'
export default {
  data () {
    return {
      v$: useVuelidate(),
      name: '',
      isRuLocale: true
    }
  },
  validations: {
    name: { required }
  },
  computed: {
    ...mapGetters(['info'])
  },
  mounted () {
    this.name = this.info.name
    this.isRuLocale = this.info.locale === 'ru-RU'
    setTimeout(() => {
      M.updateTextFields()
    }, 0)
  },
  watch: {
    info () {
      this.name = this.info.name
      this.isRuLocale = this.info.locale === 'ru-RU'
      setTimeout(() => {
        M.updateTextFields()
      }, 0)
    }
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler () {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        })
      } catch (e) {}
    }
  }
}
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
