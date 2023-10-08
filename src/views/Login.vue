<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          v-model.trim="email"
          id="email"
          type="text"
          :class="{invalid: v$.email.$error}">
        <label for="email">Email</label>
        <small
          v-if="!v$.email.required.$response && v$.email.$dirty"
          class="helper-text invalid">
          Поле Email не должно быть пустым
        </small>
        <small
          v-else-if="!v$.email.email.$response && v$.email.$dirty"
          class="helper-text invalid">
          Введите корректный Email
        </small>
      </div>
      <div class="input-field">
        <input
          v-model.trim="password"
          id="password"
          type="password"
          class="validate"
          :class="{invalid: v$.password.$error}">
        <label for="password">Пароль</label>
        <small
          v-if="!v$.password.required.$response && v$.password.$dirty"
          class="helper-text invalid">
          Введите пароль
        </small>
        <small
          v-else-if="!v$.password.minLength.$response && v$.password.$dirty"
          class="helper-text invalid">
          Пароль должен быть больше {{v$.password.minLength.$params.min}} символов
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength } from '@vuelidate/validators'
import messages from '@/utils/messages'

export default {
  name: 'login',
  data: () => ({
    v$: useVuelidate(),
    email: '',
    password: ''
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(7) }
  },
  mounted () {
    if (messages[this.$router.currentRoute.value.query.message]) {
      this.$message(messages[this.$router.currentRoute.value.query.message])
    }
  },
  methods: {
    async submitHandler () {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch (e) {}
    }
  }
}
</script>
