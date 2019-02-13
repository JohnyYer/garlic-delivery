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
      <b-table striped hover :items="books" :fields="fields">
        <template slot="stalcanatArt" slot-scope="row">
          <input type="checkbox" :checked="row.item.forStalkanat" @click="addToCastomMenu(row.item, row.item.forStalkanat)">
        </template>
        <template slot="stalcanatArtDay" slot-scope="row">
          <input type="checkbox" :id="row.item._id+'sat'" :checked="row.item.stalkanatWeek && row.item.stalkanatWeek.includes('SAT')" @click="addDay(row.item, 'SAT')">
          <label :for="row.item._id + 'sat'">CБ</label>
          <input type="checkbox" :id="row.item._id+'sun'" :checked="row.item.stalkanatWeek && row.item.stalkanatWeek.includes('SUN')" @click="addDay(row.item, 'SUN')">
          <label :for="row.item._id + 'sun'">ВС</label>
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
        name: { label: 'Название', sortable: true, 'class': 'text-center' },
        type: { label: 'Тип', sortable: true },
        ingredients: { label: 'Ингридиенты', sortable: false },
        stalcanatArt: { label: 'Для stalcanatArt', 'class': 'text-center' },
        stalcanatArtDay: { label: 'День', 'class': 'text-center' }
      },
      books: [],
      errors: [],
      userName: '',
      status: 'not_accepted',
      users: []
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

    axios.get(`/api/dish`)
      .then(response => {
        this.books = response.data
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
    },
    addToCastomMenu (menuItem, stalkanatVal) {
      menuItem.forStalkanat = !stalkanatVal

      axios.put(`/api/dish/` + menuItem._id, menuItem)
        .then(response => {
          console.log('updated')
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    addDay (item, day) {
      item.stalkanatWeek = item.stalkanatWeek ? item.stalkanatWeek : []
      if (item.stalkanatWeek && item.stalkanatWeek.includes(day)) {
        item.stalkanatWeek = item.stalkanatWeek.filter(e => e !== day)
      } else {
        item.stalkanatWeek.push(day)
      }
      axios.put(`/api/dish/` + item._id, item)
        .then(response => {
          console.log('updated')
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>

<style scoped>

</style>
