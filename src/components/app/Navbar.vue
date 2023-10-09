<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('menuBtn')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{date}}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{name}}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link
                to="/profile"
                href="#"
                class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import M from 'materialize-css'
import router from '@/router'

export default {
  data: () => ({
    date: new Date().toLocaleString(),
    interval: null,
    dropdown: null
  }),
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    }
  },
  computed: {
    name () {
      if (this.$store.getters.info) {
        return this.$store.getters.info.name
      } else {
        router.push('/login?message=authdelay')
        return 'No User'
      }
    }
  },
  mounted () {
    this.interval = setInterval(() => {
      this.date = new Date().toLocaleString()
    }, 1000)
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, { constrainWidth: true })
  },
  beforeUnmount () {
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  }
}
</script>
