<template>

  <div>
    <div class="page-title">
      <h3>{{ $localize('menuCategories') }}</h3>
    </div>
    <section>
      <loader v-if="loading"/>
      <div v-else class="row">
        <CategoryCreate @created="addNewCategory"/>
        <CategoryEdit
          v-if="categories.length"
          :key="updatedCount"
          @updateCategory="updateCategory"
          :categories="categories"/>
        <p v-else class="center">{{ $localize('noCategories') }}</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate.vue'
import CategoryEdit from '@/components/CategoryEdit.vue'

export default {
  name: 'category',
  data: () => ({
    categories: [],
    loading: true,
    updatedCount: 0
  }),
  components: {
    CategoryCreate,
    CategoryEdit
  },
  mounted () {
    this.$store.dispatch('fetchCategories').then((res) => {
      this.categories = res
      this.loading = false
    })
  },
  methods: {
    addNewCategory (category) {
      const newCategory = [...this.categories, category]
      console.log(newCategory)
      this.categories = newCategory
      this.updatedCount++
    },
    updateCategory (count) {
      const idx = this.categories.findIndex(c => c.id === count.id)
      this.categories[idx].title = count.title
      this.categories[idx].limit = count.limit
      this.updatedCount++
    }
  }
}
</script>
