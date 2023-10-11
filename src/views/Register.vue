<template>
<form class="card auth-card" @submit.prevent="submitHandler">
  <div class="card-content">
    <span class="card-title">{{ $localize('loginName') }}</span>
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
        {{ $localize('emailEmpty') }}
      </small>
      <small
        v-else-if="!v$.email.email.$response && v$.email.$dirty"
        class="helper-text invalid">
        {{ $localize('enterCorrectEmail') }}
      </small>
    </div>
    <div class="input-field">
      <input
        v-model.trim="password"
        id="password"
        type="password"
        class="validate"
        :class="{invalid: v$.password.$error}">
      <label for="password">{{ $localize('password') }}</label>
      <small
        v-if="!v$.password.required.$response && v$.password.$dirty"
        class="helper-text invalid">
        {{ $localize('enterPassword') }}
      </small>
      <small
        v-else-if="!v$.password.minLength.$response && v$.password.$dirty"
        class="helper-text invalid">
        {{ $localize('minLength') }} {{v$.password.minLength.$params.min}}
      </small>
    </div>
    <div class="input-field">
      <input
        id="name"
        type="text"
        v-model="name"
        :class="{invalid: v$.name.$error}">
      <label for="name">{{ $localize('yourName') }}</label>
      <small
        v-if="!v$.name.required.$response && v$.name.$dirty"
        class="helper-text invalid">
        {{ $localize('enterName') }}
      </small>
    </div>
    <p>
      <label>
        <input
          type="checkbox"
          v-model="agree"
          :class="{invalid: v$.agree.$error}"/>
        <span>{{ $localize('acceptedRules') }}</span>
      </label>
    </p>
  </div>
  <div class="card-action">
    <div>
      <button class="btn waves-effect waves-light auth-submit" type="submit">
        {{ $localize('register') }}
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      {{ $localize('alreadyLogged') }}
      <router-link to="/login">{{ $localize('login') }}</router-link>
    </p>
  </div>
</form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { email, minLength, required } from '@vuelidate/validators'

export default {
  name: 'register',
  data: () => ({
    v$: useVuelidate(),
    email: '',
    password: '',
    name: '',
    agree: false
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(7) },
    name: { required },
    agree: { checked: v => v }
  },
  methods: {
    async submitHandler () {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }
      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch (e) {
        console.error(e.message)
      }
    }
  }
}
</script>
