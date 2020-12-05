<template>
  <div>
    <top-menu></top-menu>

    <div class="btn-group week-days" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-secondary" :key="day.value"
              v-for="day in week"
              :class="{'active': day === currentDay}"
              @click="updateTables(day)">{{ day.value }}</button>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="panel panel-default" :key="order.companyName" v-if="order.order.length !== 0" v-for="order in filteredOrders">
            <div class="panel-heading">
              <h3 class="panel-title"><strong>{{order.companyName}}</strong></h3>
              <div>
                <span>Хлеб: белый - <strong>{{order.bread.white}}</strong> серый - <strong>{{order.bread.black}}</strong>  Л - <strong>{{order.spoons}}</strong>  В - <strong>{{order.forks}}</strong></span>
              </div>
            </div>
            <div class="panel-body">
              <div class="table-responsive">
                <table class="table table-condensed">
                  <thead>
                  <tr>
                    <td><strong>Имя</strong></td>
                    <td class="text-center"><strong>Салаты</strong></td>
                    <td class="text-center"><strong>Гарнир</strong></td>
                    <td class="text-center"><strong>Основное горячее</strong></td>
                    <td class="text-center"><strong>Первое</strong></td>
                    <td class="text-right"><strong>Сумма</strong></td>
                  </tr>
                  </thead>
                  <tbody>
                  <tr :key="index" v-for="(item, index) in order.order">
                    <td>{{item[0]}}</td>
                    <td class="text-center">{{item[1] || '---'}}</td>
                    <td class="text-center">{{item[2] || '---'}}</td>
                    <td class="text-center">{{item[3] || '---'}}</td>
                    <td class="text-center">{{item[4] || '---'}}</td>
                    <td class="text-right">{{item[6] || '---'}}</td>
                  </tr>
                  <tr>
                    <td class="thick-line"></td>
                    <td class="thick-line"></td>
                    <td class="thick-line"></td>
                    <td class="thick-line"></td>
                    <td class="thick-line text-center"><strong>Сумма</strong></td>
                    <td class="thick-line text-right">{{order.total}}грн</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import TABLES from '@/components/admin/components/tables'

export default {
  name: 'OrdersBilling',
  data () {
    return {
      week: [
        {
          value: 'ПН',
          title: 'Понедельник'
        },
        {
          value: 'ВТ',
          title: 'Вторник'
        },
        {
          value: 'СР',
          title: 'Среда'
        },
        {
          value: 'ЧТ',
          title: 'Четверг'
        },
        {
          value: 'ПТ',
          title: 'Пятница'
        }
      ],
      currentDay: '',
      userName: '',
      orders: [],
      clientTables: TABLES
    }
  },
  created: function () {
    const today = new Date().getDay() - 1
    this.currentDay = this.week[today] ? this.week[today] : this.week[0]
    this.updateTables(this.currentDay)
  },
  computed: {
    filteredOrders () {
      this.orders.map(company => {
        let total = 0
        let forks = 0
        let spoons = 0
        let bread = { white: 0, black: 0 }

        forks += company.order.length
        company.order.forEach(order => {
          if (order[4] !== '') {
            spoons++
          }
          if (order[5] !== '') {
            let breadCount = order[5].indexOf(1) !== -1 ? 1 : 2

            if (order[5].indexOf('белый') >= 0) {
              bread.white += breadCount
            } else {
              bread.black += breadCount
            }
          }
          total += parseInt(order[6])
        })
        company.total = total
        company.forks = forks
        company.spoons = spoons
        company.bread = bread

        return company
      })

      return this.orders
    }
  },
  methods: {
    updateTables (day) {
      this.currentDay = day
      this.orders = []
      this.$getGapiClient()
        .then(gapi => {
          this.clientTables.forEach(setting => {
            gapi.client.sheets.spreadsheets.values
              .get({
                spreadsheetId: setting.spreadsheetId,
                range: day.title + '!B3:H150'
              })
              .then(res => {
                if (res.result.values) {
                  this.orders.push({
                    companyName: setting.name,
                    order: res.result.values.filter(order => order[6] !== '0')
                  })
                }
              })
          })
        })
    }
  }
}
</script>

<style scoped>
  .invoice-title h2, .invoice-title h3 {
    display: inline-block;
  }

  .table > tbody > tr > .no-line {
    border-top: none;
    font-size: 14px;
  }

  .table > thead > tr {
    font-size: 14px;
  }

  .table > tbody > tr > .thick-line {
    border-top: 2px solid;
  }

  .panel {
    page-break-after: always;
    margin-top: 70px;
    padding: 0 30px;
  }

  .panel-heading span {
    float: right;
  }

  @media print
  {
    .week-days {
      display: none;
    }
  }
</style>
