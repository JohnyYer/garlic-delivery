<template>
  <div class="complexSection defaultSection largeBottomPadding">
    <div class="container">
      <div class="menuSideBar" v-bind:class="{'openSideBar' : openMobileMenu}">
        <div class="openMenu mobileView" @click="openMenuTypes()" :class="{'active' : openMobileMenu}">меню</div>
        <div class="customTitle">
          меню
        </div>
        <ul>
          <li :key="item.id" v-for="item in menuTypes">
            <a :class="{'active' : selectedMenuType.state === item.state}"
               @click.prevent="onMenuTypeSelect(item)" href="javascript:">{{ item.name }}</a>
          </li>
        </ul>
      </div>
      <div class="menuWrapper">
        <div class="customTitle">
          {{ selectedMenuType.name }}
        </div>

        <div class="daysItems">
          <div class="dayItem"
               :key="day"
               v-for="day in week"
               :class="{'active': day === currentDay}"
               @click="selectMenuByDay(day)">
            <div>{{ day }}</div>
          </div>
        </div>

        <div class="menuItems">
          <div class="menuItem" v-for="dish in filteredMenu" :key="dish.id">
            <div class="storeItem textCenter">
            <div class="storePhoto backgroundImage" v-bind:style="{'background-image': 'url(\'/static/'+dish.image+'\')'}">
                <img src="../assets/img/store-mask.png" alt="" title="">
                <div class="storeInfo">
                  <div class="tableDiv">
                    <div class="tableCell">
                      {{ dish.ingredients }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="storeContent">
                <router-link :to="'/dish/'+dish._id" class="storeTitle">{{ dish.name }}</router-link>

                <div class="storePrice">{{ dish.price }} грн.</div>
                <div class="storeBottom">
                  <a href="" @click.prevent="addToCart(dish)" class="storeBuy">в корзину</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--      <div class="moreLink">
                <a href="">
                  Посмотреть еще
                </a>
              </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Menu',
  props: ['order'],
  data () {
    return {
      dishes: [],
      openMobileMenu: false,
      menuTypes: [
        { id: 1, name: 'Первые Блюда', state: 'first_dishes' },
        { id: 2, name: 'Салаты', state: 'salads' },
        { id: 3, name: 'Основное Горячее', state: 'main_dishes' },
        { id: 4, name: 'Гарниры', state: 'garnishes' }
      ],
      selectedMenuType: { id: 1, name: 'Первые Блюда', state: 'first_dishes' },
      currentDay: '',
      week: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ']
    }
  },
  created () {
    axios.get(`/api/dish`)
      .then(response => {
        this.dishes = response.data
        const today = new Date().getDay()
        this.currentDay = this.week[today] ? this.week[today] : this.week[0]
      })
      .catch(e => {
        this.errors.push(e)
        if (e.response.status === 401) {
          this.$router.push({
            name: 'Index'
          })
        }
      })
  },
  computed: {
    filteredMenu () {
      return this.dishes.filter(dish => {
        return (dish.type === this.selectedMenuType.state) && dish.week.includes(this.currentDay)
      })
    }
  },
  methods: {
    openMenuTypes () {
      this.openMobileMenu = !this.openMobileMenu
    },
    onMenuTypeSelect (item) {
      this.openMobileMenu = false
      this.selectedMenuType = item
    },
    selectMenuByDay (day) {
      this.currentDay = day
    },
    addToCart (dish) {
      let oldItems = JSON.parse(localStorage.getItem('order')) || []
      this.order.push(dish)
      oldItems.push(dish)
      localStorage.setItem('order', JSON.stringify(oldItems))
    }
  }
}
</script>

<style scoped>

</style>
