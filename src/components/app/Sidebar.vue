<template>
  <ul class="sidenav app-sidenav" :class="{open: menuOpen}">
    <li
      v-for="link in links"
      :key="link.url"
      :class="link.url === $route.path ? 'active': ''"
    >
      <router-link
        :to="link.url"
        class="waves-effect waves-orange pointer">{{ link.title }}
      </router-link>
    </li>
  </ul>
</template>
<script>
export default {
  props: ['menuOpen'],
  data: () => ({
    links: [
      {
        title: 'Счет',
        url: '/'
      },
      {
        title: 'История',
        url: '/history'
      },
      {
        title: 'Планирование',
        url: '/planning'
      },
      {
        title: 'Новая запись',
        url: '/record'
      },
      {
        title: 'Категории',
        url: '/categories'
      }
    ]
  }),
  computed: {
  }
}
</script>
