<template>
  <div>
    <top-menu></top-menu>
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
import TABLES from '@/components/admin/components/tables'

export default {
  name: 'Stickers',
  data () {
    return {
      userName: '',
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
              range: 'B3:H50'
            })
            .then(res => {
              if (res.result.values) {
                this.orders.push(res.result.values.filter(order => order[6] !== '0')
                  .map(order => {
                    order.push(setting.name)
                    return order
                  }))
              }
            })
        })
      })
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

      this.orders.flat().forEach((order, index) => {
        const name = order[0] !== '' ? order[0] : this.orders.flat()[index - 1][0]
        stickers.push(formSticker(order[7], name, order[1]))
        stickers.push(formSticker(order[7], name, order[2] + '<br>' + order[3]))
        stickers.push(formSticker(order[7], name, order[4]))
      }, this)

      return stickers
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
