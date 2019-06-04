<template>
  <div>
    <top-menu></top-menu>

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
              range: setting.range
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
