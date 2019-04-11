<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">NavBar</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item href="/admin">Меню</b-nav-item>
          <b-nav-item href="/orders">Заказы</b-nav-item>
          <b-nav-item href='/tables'>На печать</b-nav-item>
          <b-nav-item href='/bills'>Чеки</b-nav-item>
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
    <b-container fluid>
      <b-row class="filter">
        <b-col md="6" class="my-1">
          <b-form-group label-cols-sm="3" label="Фильтр" class="mb-0">
            <b-input-group>
              <b-form-input v-model="filter.name" placeholder="По названию" />
              <b-input-group-append>
                <b-button :disabled="!filter.name" @click="filter.name = ''">Отчистить</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col md="6" class="my-1">
          <b-form-group label-cols-sm="3" label="Тип" class="mb-0">
            <b-input-group>
              <b-form-select v-model="filter.type" :options="menuTypes">
              </b-form-select>
            </b-input-group>
          </b-form-group>
        </b-col>

      </b-row>

      <b-row>
        <b-col cols="12">
          <b-card-group deck class="mb-3">
            <b-card
              v-for="dish in filteredMenu"
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
      <b-modal id="modal1" size="lg" @ok="saveDish(currentDish)" :title="currentDish.name">

        <b-form-group label-cols="4" label-cols-lg="2" label="Название" label-for="name">
          <b-form-input id="name" v-model="currentDish.name" />
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label="Ингредиенты" label-for="ingredients">
          <b-form-input id="ingredients" v-model="currentDish.ingredients" />
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label="Описание" label-for="description">
          <b-form-input id="description" v-model="currentDish.description" />
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label="Цена" label-for="price">
          <b-form-input id="price" v-model="currentDish.price" />
        </b-form-group>

        <b-form-group label="Дни недели">
          <b-form-checkbox-group
            id="week"
            name="week"
            v-model="currentDish.week"
            :options="week"
          />
        </b-form-group>

        <b-form-checkbox
          id="forStalkanat"
          v-model="currentDish.forStalkanat"
          name="forStalkanat"
        >
          Для СтальканатART
        </b-form-checkbox>

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
      week: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ'],
      menuTypes: [
        { id: 1, text: 'Первые Блюда', value: 'first_dishes' },
        { id: 2, text: 'Салаты', value: 'salads' },
        { id: 3, text: 'Основное Горячее', value: 'main_dishes' },
        { id: 4, text: 'Гарниры', value: 'garnishes' }
      ],
      filter: {
        name: '',
        day: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ'],
        type: 'first_dishes'
      }
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
    saveDish (dish) {
      axios.put(`/api/dish/` + dish._id, dish)
        .then(response => {
          console.log('updated')
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  },
  computed: {
    filteredMenu () {
      return this.dishes.filter(
        dish => {
          return dish.name.toLowerCase().search(this.filter.name.toLowerCase() >= 0) &&
            dish.type === this.filter.type
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

  .filter {
    padding: 20px;
  }
</style>
