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
    <!-- Main container -->
    <b-container>
      <b-row>
        <b-col cols="12">
          <b-card-group deck class="mb-3">
            <b-card
              v-for="dish in dishes"
              :key="dish._id"
              no-body
              :img-src="'/static'+dish.image"
              img-alt="Image"
              img-top
            >
              <h4 slot="header">{{dish.name}}</h4>

              <b-card-body>{{dish.ingredients}}</b-card-body>

              <b-card-body>
                <b-button class="card-link" @click="editDish(dish)" v-b-modal.modal1>Редактировать</b-button>
              </b-card-body>

            </b-card>
          </b-card-group>
          <ul v-if="errors && errors.length">
            <li v-for="error of errors" v-bind:key="error.message">
              {{error.message}}
            </li>
          </ul>
        </b-col>
      </b-row>

      <!-- Modal Component -->
      <b-modal id="modal1" :title="currentDish.name">
        <label class="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0">
          <input type="checkbox" class="custom-control-input">
          <span class="custom-control-indicator"></span>
          <span class="custom-control-description">Remember my preference</span>
        </label>

        <b-form-group label-cols="4" label-cols-lg="2" label="Название" label-for="name">
          <b-form-input id="name" v-model="currentDish.name" />
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label="Ингридиенты" label-for="ingredients">
          <b-form-input id="ingredients" v-model="currentDish.ingredients" />
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label="Описание" label-for="description">
          <b-form-input id="description" v-model="currentDish.description" />
        </b-form-group>
        <div class="custom-control custom-checkbox custom-control-inline">
          <input type="checkbox" class="custom-control-input" id="1">
          <label class="custom-control-label" for="1">1</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
          <label class="form-check-label" for="defaultCheck1">
            Default checkbox
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="defaultCheck2" disabled>
          <label class="form-check-label" for="defaultCheck2">
            Disabled checkbox
          </label>
        </div>
        <div>
          <b-form-group label="Дни недели">
            <b-form-checkbox-group
              id="week"
              name="week"
              v-model="errors"
              :options="currentDish.week"
            />
          </b-form-group>
        </div>

      </b-modal>
    </b-container>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Dashboard',
  data () {
    return {
      dishes: [],
      errors: [],
      userName: '',
      users: [],
      currentDish: {},
      selected: [], // Must be an array reference!
      options: [
        { text: 'Orange', value: 'orange' },
        { text: 'Apple', value: 'apple' },
        { text: 'Pineapple', value: 'pineapple' },
        { text: 'Grape', value: 'grape' }
      ]
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
        this.dishes = response.data
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
    editDish (dish) {
      this.currentDish = dish
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
.container {
  margin-top: 20px;
}
.card {
    min-width: 20rem;
    margin-bottom: 20px;
}
</style>
