<template>
  <div>
    <top-menu></top-menu>

    <div class="container">
      <b-row class="text-center">
        <b-col cols="12">
            <b-card no-body class="text-center">
              <b-list-group flush>
                <b-list-group-item>
                  <strong>САЛАТЫ</strong>
                </b-list-group-item>
                <b-list-group-item
                  :key="index"
                  v-for="(order, index) in OrderList.salads">
                  <span>{{order.dish}}</span>
                  <strong>{{order.qty}}</strong>
                </b-list-group-item>
              </b-list-group>
            </b-card>

            <b-card no-body class="text-center">
              <b-list-group flush>
                <b-list-group-item>
                  <strong>ГАРНИРЫ</strong>
                </b-list-group-item>
                <b-list-group-item
                  :key="index"
                  v-for="(order, index) in OrderList.garnish">
                  <span>{{order.dish}}</span>
                  <strong>{{order.qty}}</strong>
                </b-list-group-item>
              </b-list-group>
            </b-card>

            <b-card no-body class="text-center">
              <b-list-group flush>
                <b-list-group-item>
                  <strong>ОСНОВНОЕ ГОРЯЧЕЕ</strong>
                </b-list-group-item>
                <b-list-group-item
                  :key="index"
                  v-for="(order, index) in OrderList.main">
                  <span>{{order.dish}}</span>
                  <strong>{{order.qty}}</strong>
                </b-list-group-item>
              </b-list-group>
            </b-card>

            <b-card no-body class="text-center">
              <b-list-group flush>
                <b-list-group-item>
                  <strong>СОУС</strong>
                </b-list-group-item>
                <b-list-group-item
                  :key="index"
                  v-for="(order, index) in OrderList.souce">
                  <span>{{order.dish}}</span>
                  <strong>{{order.qty}}</strong>
                </b-list-group-item>
              </b-list-group>
            </b-card>

            <b-card no-body class="text-center">
              <b-list-group flush>
                <b-list-group-item>
                  <strong>ВЫПЕЧКА</strong>
                </b-list-group-item>
                <b-list-group-item
                  :key="order.dish"
                  v-for="order in OrderList.desert">
                  <span>{{order.dish}}</span>
                  <strong>{{order.qty}}</strong>
                </b-list-group-item>
              </b-list-group>
            </b-card>

          <b-card-group deck>
            <b-card no-body class="text-center"
                    :key="direction.directionName"
                    v-for="direction in OrderList.first"
                    v-if="direction.dishes.length > 0">
              <b-list-group flush>
                <b-list-group-item>
                  <strong>ПЕРВОЕ {{direction.directionName}}</strong>
                </b-list-group-item>
                <b-list-group-item
                  :key="order.dish"
                  v-for="order in direction.dishes">
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
import TABLES from '@/components/admin/components/metro-tables'

export default {
  name: 'GoogleTables',
  data () {
    return {
      orders: [],
      clientTables: TABLES
    }
  },
  created: function () {
    this.$getGapiClient()
      .then(gapi => {
        this.clientTables.forEach(setting => {
          gapi.client.sheets.spreadsheets.values
            .get({
              spreadsheetId: setting.spreadsheetId,
              range: setting.sheetName ? setting.sheetName + '!D3:J150' : 'C3:F50'
            })
            .then(res => {
              if (res.result.values) {
                this.orders.push(
                  {
                    companyName: setting.name,
                    order: res.result.values,
                    direction: setting.direction
                  }
                )
              }
            })
        })
      })
  },
  computed: {
    OrderList () {
      const orders = this.orders
        .flatMap(direction => direction.order.map(order => {
          return {
            salads: order[0] ? order[0].split('(')[0] : order[0],
            garnish: order[1] ? order[1].split('(')[0] : order[1],
            main: order[2] ? order[2].split('(')[0] : order[2],
            first: order[3] ? order[3].split('(')[0] : order[3],
            souce: order[4] ? order[4].split('(')[0] : order[4],
            desert: order[5] ? order[5].split('(')[0] : order[5]
          }
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
      let main = orders.map(order => order.main)
      let souce = orders.map(order => order.souce)
      let desert = orders.map(order => order.desert)

      const computedFirstDishes = [
        {
          directionName: 'I',
          dishes: []
        },
        {
          directionName: 'II',
          dishes: []

        },
        {
          directionName: 'III',
          dishes: []

        },
        {
          directionName: 'IV',
          dishes: []
        }
      ]

      this.orders.map(direction => {
        const dishes = direction.order.map(order => order[3]).filter(item => item && item !== '').map(item => item.split('(')[0])
        computedFirstDishes.find(dishes => dishes.directionName === direction.direction).dishes.push(...dishes)
      })

      computedFirstDishes.map(direction => { direction.dishes = countDishes(direction.dishes) })

      return {
        salads: countDishes(salads),
        garnish: countDishes(garnish),
        main: countDishes(main),
        souce: countDishes(souce),
        desert: countDishes(desert),
        first: computedFirstDishes
      }
    }
  }
}
</script>

<style scoped>
  .card-deck {
    padding: 10px;
    page-break-before: always;
  }
</style>
