<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">Garlic Admin</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item href="/admin">Меню</b-nav-item>
          <b-nav-item href='/tables'>Бегунки</b-nav-item>
          <b-nav-item href='/bills'>Чеки</b-nav-item>
          <b-nav-item href='/stickers'>Наклейки</b-nav-item>
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

          <b-card-group deck
                        class="mb-3">

            <b-card no-body class="text-center">

              <b-list-group flush>
                <b-list-group-item>
                  <strong>САЛАТЫ</strong>
                </b-list-group-item>
                <b-list-group-item
                  :key="order.dish"
                  v-for="order in OrderList.salads">
                  <span>{{order.dish}}</span>
                  <strong>{{order.qty}}</strong>
                </b-list-group-item>
                <b-list-group-item>
                  <strong>МЯСО</strong>
                </b-list-group-item>
                <b-list-group-item
                  :key="order.dish"
                  v-for="order in OrderList.meat">
                  <span>{{order.dish}}</span>
                  <strong>{{order.qty}}</strong>
                </b-list-group-item>
                <b-list-group-item>
                  <strong>ГАРНИР</strong>
                </b-list-group-item>
                <b-list-group-item
                  :key="order.dish"
                  v-for="order in OrderList.garnish">
                  <span>{{order.dish}}</span>
                  <strong>{{order.qty}}</strong>
                </b-list-group-item>
                <b-list-group-item>
                  <strong>ВТОРОЕ</strong>
                </b-list-group-item>
                <b-list-group-item
                  :key="order.dish"
                  v-for="order in OrderList.second">
                  <span>{{order.dish}}</span>
                  <strong>{{order.qty}}</strong>
                </b-list-group-item>
              </b-list-group>

            </b-card>

          </b-card-group>

        </b-col>
      </b-row>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'GoogleTables',
  data () {
    return {
      userName: '',
      orders: [],
      clientTables: [
        {
          name: 'CallStar',
          spreadsheetId: '1zN3l9Tr_g61G4sdE66uMyflASnEEG6bO69_KIITNpcw'
        },
        {
          name: 'CallStar 19b',
          spreadsheetId: '1_UK5QfAtHP2-1w4Dd70IBuPAKOf2IftIE_aatULxvlI'
        },
        {
          name: 'Варамар',
          spreadsheetId: '1nifWFxerRXWZFtUCeXKgF0OBXK07bnyiheGo1_IRSNw'
        },
        {
          name: 'Стоматология',
          spreadsheetId: '13KQwINnab4WeQ-ktRqLUBLCLr8YHMuz8lPJSBpFi5io'
        },
        {
          name: 'DataArt',
          spreadsheetId: '1QN1HADHAB-KuBhndAMrJijj1g6w6SV471-qJn6oPVwA'
        },
        {
          name: 'ШитоКрыто',
          spreadsheetId: '1mtLEEgx7xbkabUHfACWehXy0nYAu-1EM3KRTrAoqK44'
        },
        {
          name: 'Capital',
          spreadsheetId: '1hMm3o7qflBIfk8qqFI09ecIWDngwUAVuyqj7L_tC6FA'
        },
        {
          name: 'SFM',
          spreadsheetId: '1nvn2enDBzc1I2_1QKiejTOHroOVSUkHUInGTkHraPQU'
        },
        {
          name: 'Armeyskaya',
          spreadsheetId: '1897CojJfjMfLLTIhiDy3oXGrSlaO__-5M1UXg6RXK50'
        },
        {
          name: 'Обсерваторный',
          spreadsheetId: '1ubYj8k2zFszjxU2-6YpufI_Cjf6AOEQY-iev0e0OJn0'
        }
      ]
    }
  },
  created: function () {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    axios.get('/api/auth/users')
      .then(response => {
        this.users = response.data
        this.userName = localStorage.getItem('userName')
      })
      .catch(e => {
        if (e.response.status === 401) {
          this.$router.push({
            name: 'Login'
          })
        }
      })

    this.$getGapiClient()
      .then(gapi => {
        this.clientTables.forEach(setting => {
          gapi.client.sheets.spreadsheets.values
            .get({
              spreadsheetId: setting.spreadsheetId,
              range: 'C3:F30'
            })
            .then(res => {
              if (res.result.values) {
                this.orders.push(
                  {
                    companyName: setting.name,
                    order: res.result.values
                  }
                )
              }
            })
        })
      })
  },
  computed: {
    OrderList () {
      let orders = this.orders.flatMap(order => order.order.map(order => {
        return {salads: order[0], garnish: order[1], meat: order[2], second: order[3]}
      }))

      function onlyUnique (value, index, self) {
        return self.indexOf(value) === index && value && value !== '' && value !== 'САЛАТЫ' && value !== 'ОСНОВНОЕ ГОРЯЧЕЕ'
      }

      function countDishes (dishes) {
        const uniqueDishes = dishes.filter(onlyUnique)
        let countedDishes = []

        uniqueDishes.forEach(dishUnique => {
          let qty = 0

          dishes.forEach(dish => {
            if (dish === dishUnique) {
              qty++
            }
          })
          countedDishes.push({dish: dishUnique ? dishUnique.split('(')[0] : dishUnique, qty: qty})
        })

        return countedDishes
      }

      let salads = orders.map(order => order.salads)
      let garnish = orders.map(order => order.garnish)
      let meat = orders.map(order => order.meat)
      let second = orders.map(order => order.second)

      return {
        salads: countDishes(salads),
        garnish: countDishes(garnish),
        meat: countDishes(meat),
        second: countDishes(second)
      }
    }
  }
}
</script>

<style scoped>

</style>
