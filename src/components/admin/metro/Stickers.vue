<template>
  <div>
    <top-menu></top-menu>
    <div class="btn-group week-days" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-secondary" :key="direction.value"
              v-for="direction in directions"
              :class="{'active': direction.value === selectedDirection}"
              @click="updateTables(direction)">{{ direction.value }}</button>
    </div>
    <div class="page">
          <div class="col" :key="i" v-if="sticker" v-for="(sticker, i) in stickers">
            <span class="company">{{sticker.companyName}}</span>
            <strong>{{sticker.name}}</strong>
            <div v-html="sticker.dish"></div>
          </div>
      </div>

  </div>
</template>

<script>
import TABLES from '@/components/admin/components/metro-tables'

export default {
  name: 'Stickers',
  data () {
    return {
      orders: [],
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
      clientTables: TABLES
    }
  },
  created: function () {
    this.updateTables(this.selectedDirection)
  },
  computed: {
    stickers () {
      let stickers = []

      let formSticker = function (companyName, name, dish) {
        return dish !== '' && dish !== '<br>' ? {
          companyName: companyName,
          name: name,
          dish: dish
        } : false
      }

      this.orders.forEach((order, index) => {
        const name = order[0] + '/' + order[1]
        stickers.push(formSticker(order[2], name, order[3]))
        stickers.push(formSticker(order[2], name, order[4] + '<br>' + order[5]))
        stickers.push(formSticker(order[2], name, order[6]))
        stickers.push(formSticker(order[2], name, order[7]))
        stickers.push(formSticker(order[2], name, order[8]))
      }, this)

      return stickers
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
              range: this.selectedDirection + '!A3:J150'
            })
            .then(res => {
              if (res.result.values) {
                this.orders = res.result.values.filter(order => order[9] !== '0'
                )
              }
            })
        })
    }
  }
}
</script>

<style scoped>
  body {
    margin: 0;
    padding: 0;
  }
  * {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
  }
  .page {
    width: 21cm;
    min-height: 29.7cm;
    margin: 1cm auto;
    border: 1px #D3D3D3 solid;
    border-radius: 5px;
    background: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }

  @page {
    size: A4;
    margin: 0;
  }
  @media print {
    .page {
      margin: 0;
      border: initial;
      border-radius: initial;
      width: initial;
      min-height: initial;
      box-shadow: initial;
      background: initial;
      page-break-after: always;
    }
  }

  .col {
    height: 140px;
    width: 25%;
    padding: 14px;
    text-align: center;
    float: left;
    font-size: 14px;
  }

  .company {
    font-size: 15px;
    text-decoration: underline;
    text-align: right;
    margin-right: 10px;
  }

  .col span {
    display: flex;
    flex-direction: column;
  }
</style>
