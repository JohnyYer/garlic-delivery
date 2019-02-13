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
               :key="day.label"
               v-for="day in week"
               :class="{'active': day.value === currentDay}"
               @click="selectMenuByDay(day.value)">
            <div>{{ day.label }}</div>
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
  name: 'CustomMenu',
  props: ['order', 'scrollHeader'],
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
      currentDay: 'SAT',
      week: [
        {label: 'СБ', value: 'SAT'},
        {label: 'ВС', value: 'SUN'}
      ],
      someProp: false
    }
  },
  created () {
    axios.get(`/api/dish`)
      .then(response => {
        this.dishes = response.data
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
        return (dish.type === this.selectedMenuType.state) && dish.forStalkanat && dish.stalkanatWeek.includes(this.currentDay)
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
      this.order.push(dish)
      localStorage.setItem('order', JSON.stringify(this.order))
    },
    handleScroll () {
      let isScrolable = window.scrollY >= 120
      this.$emit('scroll-header', isScrolable)
    }
  },
  beforeMount () {
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped>

</style>
