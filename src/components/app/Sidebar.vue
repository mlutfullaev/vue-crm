<template>
  <ul class="sidenav app-sidenav" :class="{open: menuOpen}">
    <li
      v-for="link in links"
      :key="link.url"
      :class="link.url === $route.path ? 'active': ''"
    >
      <router-link
        :to="link.url"
        class="waves-effect waves-orange pointer">{{ $localize(link.title) }}
      </router-link>
    </li>
  </ul>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props: ['menuOpen'],
  data: () => ({
    links: [
      {
        title: 'menuMain',
        url: '/'
      },
      {
        title: 'menuHistory',
        url: '/history'
      },
      {
        title: 'menuPlanning',
        url: '/planning'
      },
      {
        title: 'menuRecord',
        url: '/record'
      },
      {
        title: 'menuCategories',
        url: '/categories'
      }
    ]
  }),
  computed: {
    ...mapGetters(['info'])
  }
}
</script>
