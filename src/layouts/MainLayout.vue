<template>
  <div>
    <Loader v-if="loading" />
    <div v-else class="app-main-layout">
      <Navbar @menuBtn="menuOpen = !menuOpen" />

      <Sidebar :menuOpen="menuOpen" />

      <main class="app-content" :class="{full: !menuOpen}">
        <div class="app-page">
          <router-view/>
        </div>
      </main>

      <div class="fixed-action-btn" v-tooltip="'Создать новую запись'">
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar.vue'
import Sidebar from '@/components/app/Sidebar.vue'

export default {
  name: 'main-layout',
  data: () => ({
    menuOpen: true,
    loading: true
  }),
  async mounted () {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }

    this.loading = false
  },
  components: {
    Navbar,
    Sidebar
  }
}
</script>
