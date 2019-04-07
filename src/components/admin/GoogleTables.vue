<template>
  <div>
    <b-navbar toggleable='md' type='dark' variant='info'>

      <b-navbar-toggle target='nav_collapse'></b-navbar-toggle>

      <b-navbar-brand href='#'>NavBar</b-navbar-brand>

      <b-collapse is-nav id='nav_collapse'>

        <b-navbar-nav>
          <b-nav-item href='/admin'>Меню</b-nav-item>
          <b-nav-item href='/orders'>Заказы</b-nav-item>
          <b-nav-item href='/tables'>На печать</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class='ml-auto'>
          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot='button-content'>
              <em>{{userName}}</em>
            </template>
            <b-dropdown-item @click.prevent='logout()'>Выйти</b-dropdown-item>
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

              <b-card-header class="bg-primary text-white">
                Первое Направление
              </b-card-header>

              <b-list-group flush>
                <b-list-group-item
                  :key="order.dish"
                  v-for="order in OrderListFirst"><strong>{{order.dish}} -- {{order.qty}}</strong></b-list-group-item>
              </b-list-group>

            </b-card>

            <b-card no-body class="text-center">

              <b-card-header class="bg-primary text-white">
                Второе направление
              </b-card-header>

              <b-list-group flush>
                <b-list-group-item
                  :key="order.dish"
                  v-for="order in OrderListSecond"><strong>{{order.dish}} -- {{order.qty}}</strong></b-list-group-item>
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

function mapOrder (order) {
  let dishes = order.map(order => order.order)

  function onlyUnique (value, index, self) {
    return self.indexOf(value) === index && value !== ''
  }
  dishes = dishes.flat().flatMap(order => {
    order.shift()
    order.pop()
    return order
  })
  let disdinctDishes = dishes.filter(onlyUnique)

  disdinctDishes.forEach((currentDish, i) => {
    let quantity = 0
    dishes.forEach(dish => {
      if (currentDish === dish) {
        quantity++
      }
    })
    disdinctDishes[i] = {dish: currentDish, qty: quantity}
  })

  return disdinctDishes
}

export default {
  name: 'GoogleTables',
  data () {
    return {
      userName: '',
      orders: {
        firstDir: [],
        secondDir: []
      },
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
    const firsDirection = ['CallStar', 'CallStar 19b', 'Варамар', 'Стоматология', 'DataArt', 'ШитоКрыто', 'Armeyskaya']

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
                if (firsDirection.includes(setting.name)) {
                  this.orders.firstDir.push(
                    {
                      companyName: setting.name,
                      order: res.result.values
                    }
                  )
                } else {
                  this.orders.secondDir.push(
                    {
                      companyName: setting.name,
                      order: res.result.values
                    }
                  )
                }
              }
            })
        })
      })
  },
  computed: {
    OrderListFirst () {
      let dishes = this.orders.firstDir.map(order => order.order)

      function onlyUnique (value, index, self) {
        return self.indexOf(value) === index && value !== ''
      }

      let disdinctDishes = dishes.flat(2).filter(onlyUnique)
      disdinctDishes.forEach((currentDish, i) => {
        let quantity = 0
        dishes.flat(2).forEach(dish => {
          if (currentDish === dish) {
            quantity++
          }
        })
        disdinctDishes[i] = {dish: currentDish, qty: quantity}
      })

      return disdinctDishes
    },
    OrderListSecond () {
      let dishes = this.orders.secondDir.map(order => order.order)

      function onlyUnique (value, index, self) {
        return self.indexOf(value) === index && value !== ''
      }

      let disdinctDishes = dishes.flat(2).filter(onlyUnique)
      disdinctDishes.forEach((currentDish, i) => {
        let quantity = 0
        dishes.flat(2).forEach(dish => {
          if (currentDish === dish) {
            quantity++
          }
        })
        disdinctDishes[i] = {dish: currentDish, qty: quantity}
      })

      return disdinctDishes
    }
  }
}
</script>

<style scoped>

</style>
