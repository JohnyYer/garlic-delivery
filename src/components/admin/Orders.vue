<template>
  <div>
  <b-navbar toggleable="md" type="dark" variant="info">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#">NavBar</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item href="/admin">Меню</b-nav-item>
        <b-nav-item href="/orders">Заказы</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            <em>{{userName}}</em>
          </template>
          <b-dropdown-item @click.prevent="logout()">Выйти</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
  <b-row>
    <b-col cols="12">
      <b-table striped hover :items="orderDetails" :fields="fields">
        <template slot="order" slot-scope="row">
          <p :key="index" v-for="(dish, index) in row.item.order">{{dish.name}}</p>
        </template>
      </b-table>
      <ul v-if="errors && errors.length">
        <li v-for="error of errors" v-bind:key="error.message">
          {{error.message}}
        </li>
      </ul>
    </b-col>
  </b-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Dashboard',
  data () {
    return {
      fields: {
        street: { label: 'Адресс', sortable: true, 'class': 'text-center' },
        time: { label: 'Время', sortable: true },
        phone: { label: 'Номер телефона', sortable: false },
        comment: { label: 'Комментарий', 'class': 'text-center' },
        order: { label: 'Блюда', 'class': 'text-center' }
      },
      orderDetails: [],
      userName: '',
      errors: []
    }
  },
  created () {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    axios.get('/api/auth/users')
      .then(response => {
        this.users = response.data
      })
      .catch(e => {
        if (e.response.status === 401) {
          this.$router.push({
            name: 'Login'
          })
        }
      })

    axios.get(`/api/order`)
      .then(response => {
        this.orderDetails = response.data
        this.userName = localStorage.getItem('userName')
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  methods: {
    logout () {
      localStorage.removeItem('jwtToken')
      localStorage.removeItem('userName')
      this.$router.push({
        name: 'Index'
      })
    }
  }
}
</script>

<style scoped>

</style>
