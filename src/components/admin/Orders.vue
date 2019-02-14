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
      <b-table responsive striped hover :items="orderDetails" :fields="fields">
        <template slot="order" slot-scope="row">
          <p :key="index" v-for="(dish, index) in row.item.order">{{dish.name}}</p>
        </template>
        <template slot="row-details" slot-scope="row">
          <b-card>
            <ul>
              <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value}}</li>
            </ul>
          </b-card>
        </template>
      </b-table>
      <b-card-group deck
                    class="mb-3">
        <b-card :key="item._id" v-for="item in orderDetails"
                :header="item.phone"
                class="text-center">
          <ol>
            <li :key="index" v-for="(dish, index) in item.order">
              <p class="card-text">{{dish.name}}</p>
            </li>
          </ol>
        </b-card>
      </b-card-group>
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
