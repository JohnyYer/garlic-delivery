<template>
  <div>
    <top-menu></top-menu>

    <div class="btn-group week-days" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-secondary" :key="direction.value"
              v-for="direction in directions"
              :class="{'active': direction.value === selectedDirection}"
              @click="updateTables(direction)">{{ direction.value }}</button>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="panel panel-default" v-if="orders.length !== 0">
            <div class="panel-heading">
              <h3 class="panel-title"><strong>{{selectedDirection}} направление</strong></h3>
              <div>
                <span>Л - <strong>{{countMisc.spoons}}</strong>  В - <strong>{{countMisc.forks}}</strong></span>
              </div>
            </div>
            <div class="panel-body">
              <div class="table-responsive">
                <table class="table table-condensed">
                  <thead>
                  <tr>
                    <td><strong>КТО</strong></td>
                    <td class="text-center"><strong>Салаты</strong></td>
                    <td class="text-center"><strong>Гарнир</strong></td>
                    <td class="text-center"><strong>Основное горячее</strong></td>
                    <td class="text-center"><strong>Первое</strong></td>
                    <td class="text-center"><strong>Cоус</strong></td>
                    <td class="text-center"><strong>Выпечка</strong></td>
                    <td class="text-right"><strong>Сумма</strong></td>
                  </tr>
                  </thead>
                  <tbody>
                  <tr :key="index" v-for="(item, index) in orders">
                    <td>{{item[0]}}</td>
                    <td class="text-center">{{item[1] || '---'}}</td>
                    <td class="text-center">{{item[2] || '---'}}</td>
                    <td class="text-center">{{item[3] || '---'}}</td>
                    <td class="text-center">{{item[4] || '---'}}</td>
                    <td class="text-center">{{item[5] || '---'}}</td>
                    <td class="text-center">{{item[6] || '---'}}</td>
                    <td class="text-right">{{item[7] || '---'}}</td>
                  </tr>
                  <tr>
                    <td class="thick-line"></td>
                    <td class="thick-line"></td>
                    <td class="thick-line"></td>
                    <td class="thick-line"></td>
                    <td class="thick-line"></td>
                    <td class="thick-line"></td>
                    <td class="thick-line text-center"><strong>Сумма</strong></td>
                    <td class="thick-line text-right">{{countMisc.total}}грн</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="panel panel-default" v-if="orders.length <= 0">
            <div class="panel-heading">
              <h3 class="panel-title"><strong>На это направление нет заказов</strong></h3>
            </div>
          </div>

        </div>
      </div>

    </div>

  </div>
</template>

<script>
import TABLES from '@/components/admin/components/metro-tables'

export default {
  name: 'OrdersBilling',
  data () {
    return {
      directions: [
        {
          value: 'I',
          title: 'I'
        },
        {
          value: 'II',
          title: 'II'
        },
        {
          value: 'III',
          title: 'III'
        },
        {
          value: 'IV',
          title: 'IV'
        }
      ],
      selectedDirection: {
        value: 'I',
        title: 'I'
      },
      orders: [],
      clientTables: TABLES
    }
  },
  created: function () {
    this.updateTables(this.selectedDirection)
  },
  computed: {
    countMisc () {
      const misc = {
        total: 0,
        forks: this.orders.length,
        spoons: 0
      }
      this.orders.forEach(order => {
        if (order[4] !== '') {
          misc.spoons++
        }
        misc.total += parseInt(order[7])
      })

      return misc
    }
  },
  methods: {
    updateTables (direction) {
      this.selectedDirection = direction.value
      this.orders = []
      this.$getGapiClient()
        .then(gapi => {
          gapi.client.sheets.spreadsheets.values
            .get({
              spreadsheetId: this.clientTables[0].spreadsheetId,
              range: this.selectedDirection + '!C3:J150'
            })
            .then(res => {
              if (res.result.values) {
                this.orders = res.result.values.filter(order => order[7] !== '0'
                )
              }
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
