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
        <div class="col" :key="i" v-if="sticker" v-for="(sticker, i) in stickers">
          <span>{{sticker.companyName}}</span>
          <span>{{sticker.name}}</span>
          <span>{{sticker.dish}}</span>
        </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Stickers',
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
              range: 'B3:H30'
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
        return dish !== '' ? {
          companyName: companyName,
          name: name,
          dish: dish
        } : false
      }

      this.orders.flat().forEach(order => {
        stickers.push(formSticker(order[7], order[0], order[1]))
        stickers.push(formSticker(order[7], order[0], order[2]))
        stickers.push(formSticker(order[7], order[0], order[3]))
        stickers.push(formSticker(order[7], order[0], order[4]))
      })

      return stickers
    }
  }
}
</script>

<style scoped>
  @page {
    margin: 0;
    padding: 0;
  }

  .col {
    height: 2.97cm;
    width: 7cm;
    padding: 14px;
    text-align: center;
    float: left;
  }

  .col span {
    display: flex;
    flex-direction: column;
  }
</style>
