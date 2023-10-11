<template>
  <div>
    <div class="page-title">
      <h3>{{$localize('menuRecord')}}</h3>
    </div>

    <Loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">{{$localize('noCategories')}}<router-link to="/categories">{{$localize('addCategory')}}</router-link></p>
    <form v-else class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <select
          ref="categorySelect"
          v-model="category">
          <option
            v-for="c of categories"
            :key="c.id"
            :value="c.id"
          >
            {{ c.title }}
          </option>
        </select>
        <label>{{$localize('chooseCategory')}}</label>
      </div>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income" v-model="type" />
          <span>{{$localize('income')}}</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" v-model="type"/>
          <span>{{$localize('outcome')}}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: v$.amount.error}">
        <label for="amount">{{$localize('amount')}}</label>
        <span
          v-if="!v$.amount.minValue.$response && v$.amount.$dirty"
          class="helper-text invalid">{{$localize('minLength')}} {{ v$.limit.minLength.$params.min }}</span>
        <span
          v-if="!v$.amount.required.$response && v$.amount.$dirty"
          class="helper-text invalid">{{$localize('amountEmpty')}}</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{invalid: v$.description.error}">
        <label for="description">{{$localize('description')}}</label>
        <span
          v-if="!v$.description.required.$response && v$.description.$dirty"
          class="helper-text invalid">{{$localize('descriptionEmpty')}}</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{$localize('create')}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import M from 'materialize-css'
import Loader from '@/components/app/Loader.vue'
import { minValue, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { mapGetters } from 'vuex'

export default {
  name: 'record',
  components: { Loader },
  data: () => ({
    v$: useVuelidate(),
    loading: true,
    categories: [],
    select: null,
    category: null,
    type: 'income',
    amount: 1,
    description: ''
  }),
  async mounted () {
    this.$store.dispatch('fetchCategories').then(res => {
      this.categories = res
      this.loading = false

      if (res.length) {
        this.category = res[0].id
      }

      setTimeout(() => {
        this.select = M.FormSelect.init(this.$refs.categorySelect)
        M.updateTextFields()
      }, 0)
    })
  },
  destroy () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  validations: {
    description: { required },
    amount: { required, minValue: minValue(1) }
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord () {
      if (this.type === 'income') return true

      return this.info.bill >= this.amount
    }
  },
  methods: {
    async submitHandler () {
      if (this.v$.$invalid) {
        this.v$.$touch()
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })

          const bill = this.type === 'income' ? this.info.bill + this.amount : this.info.bill - this.amount
          await this.$store.dispatch('updateInfo', { bill })
          this.$message('Запись успешно создана!')
          this.v$.$reset()
          this.amount = 1
          this.description = ''
          this.type = 'income'
        } catch (e) {
          console.error(e.message)
        }
      } else {
        this.$message(`Недостаточно средств на счете, ${this.amount - this.info.bill}`)
      }
    }
  }
}
</script>
