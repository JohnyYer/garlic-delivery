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
    <div class="container">
      <b-row class="text-center">
        <b-col cols="12">
          <b-button-group>
            <b-button @click="dayForOrder = 'SAT'" :variant="dayForOrder === 'SAT' ? 'success' : ''">СБ</b-button>
            <b-button @click="dayForOrder = 'SUN'" :variant="dayForOrder === 'SUN' ? 'success' : ''">ВС</b-button>
          </b-button-group>

          <b-card-group deck
                        class="mb-3">

            <b-card no-body
                    :key="item._id"
                    v-for="item in orderDetails"
                    class="text-center">

              <b-card-header class="bg-primary text-white">
                {{item.name ? item.name : 'ВАЛЕРЧИК'}}
                <input type="checkbox" :checked="item.seen" @click="checkIfSeen(item, item.seen)">
              </b-card-header>

              <b-list-group flush>
                <b-list-group-item><strong>Тел: </strong>{{item.phone}}</b-list-group-item>
                <b-list-group-item><strong>Адрес: </strong>{{item.street}}</b-list-group-item>
                <b-list-group-item><strong>Комментарий: </strong>{{item.comment}}</b-list-group-item>
              </b-list-group>

              <b-card-body>
                <ol>
                  <li v-if="detectDishByDat(dish)" :key="index" v-for="(dish, index) in item.order">
                    <p class="card-text">{{dish.name}}</p>
                  </li>
                </ol>
              </b-card-body>

              <b-card-footer><strong>{{dayForOrder === 'SAT' ? 'Суббота' : 'Воскресенье'}}</strong></b-card-footer>

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
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Dashboard',
  data () {
    return {
      orderDetails: [],
      userName: '',
      errors: [],
      dayForOrder: 'SAT'
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
    },
    detectDishByDat (dish) {
      return dish.stalkanatWeek.includes(this.dayForOrder)
    },
    checkIfSeen (order, seen) {
      order.seen = !seen

      axios.put(`/api/order/` + order._id, order)
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

<style lang="scss" scoped>
  .container {
    margin-top: 50px;
  }
  li {
    text-align: left;
  }
  .card-header {
    input {
      float: right;
      height: 24px;
    }
  }
  .btn-group {
    margin-bottom: 20px;
  }
</style>
