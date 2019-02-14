<template>
  <div class="complexSection defaultSection largeBottomPadding">
    <div class="container">
      <div class="menuSideBar noMargin shopSideBar" style="z-index: 0;">
        <div class="customTitle">
          корзина
        </div>
        <div class="menuText">
          <p>Обеды доставляются на ваше мероприятие к <b>16:00</b></p>
          <p>Заказ можно оформить до <b>13:00</b> текущего дня</p>
        </div>
      </div>
      <div class="menuWrapper">
        <div class="basketDataInfo">
          <div class="priceVal">
            <div class="line">
              <span class="text">Итого</span>
              <span class="price">{{ total }} грн</span>
            </div>
          </div>
          <div class="processedBtn">
            <a v-if="total > 0" href="/order" class="customBtn blueBtn">Оформить</a>
          </div>
        </div>
        <div class="basketDataInfo" v-if="satOrder.order.length > 0">
          <div class="priceVal">
            <div class="line">
              <span class="text">Суббота:</span>
              <span class="price">{{ satOrder.total }} грн</span>
            </div>
          </div>
        </div>
        <div class="menuItems">
          <div class="menuItem" :key="index" v-for="(item, index) in satOrder.order">
            <span class="removeItem" @click="removeItem(index, 'SAT')">X</span>
            <div class="storeItem textCenter">
              <div class="storePhoto backgroundImage" v-bind:style="{'background-image': 'url(\'/static/'+item.image+'\')'}">
                <img src="../assets/img/store-mask.png" alt="" title="">
                <div class="storeInfo">
                  <div class="tableDiv">
                    <div class="tableCell">
                      {{item.ingredients}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="storeContent">
                <a href="" class="storeTitle">{{item.name}}</a>
                <div class="storePrice">{{item.price}} грн.</div>
                <!--<div class="storeBottom">
                  <div class="storeNum">
                    <span class="minus"></span>
                    <input type="text" value="1" min="0">
                    <span class="plus"></span>
                  </div>
                </div>-->
              </div>
            </div>
          </div>
        </div>
        <div class="basketDataInfo" v-if="sunOrder.order.length > 0">
          <div class="priceVal">
            <div class="line">
              <span class="text">Воскресенье:</span>
              <span class="price">{{ sunOrder.total }} грн</span>
            </div>
          </div>
        </div>
        <div class="menuItems">
          <div class="menuItem" :key="index" v-for="(item, index) in sunOrder.order">
            <span class="removeItem" @click="removeItem(index, 'SUN')">X</span>
            <div class="storeItem textCenter">
              <div class="storePhoto backgroundImage" v-bind:style="{'background-image': 'url(\'/static/'+item.image+'\')'}">
                <img src="../assets/img/store-mask.png" alt="" title="">
                <div class="storeInfo">
                  <div class="tableDiv">
                    <div class="tableCell">
                      {{item.ingredients}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="storeContent">
                <a href="" class="storeTitle">{{item.name}}</a>
                <div class="storePrice">{{item.price}} грн.</div>
                <!--<div class="storeBottom">
                  <div class="storeNum">
                    <span class="minus"></span>
                    <input type="text" value="1" min="0">
                    <span class="plus"></span>
                  </div>
                </div>-->
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  props: ['order'],
  computed: {
    total () {
      let total = 0
      this.order.forEach(item => {
        total += parseInt(item.price)
      })
      return total
    },
    sunOrder () {
      let sunOrder = this.order.filter(item => item.stalkanatWeek.includes('SUN'))
      let sunTotal = 0

      sunOrder.forEach(item => {
        sunTotal += parseInt(item.price)
      })

      return {order: sunOrder, total: sunTotal}
    },
    satOrder () {
      let satOrder = this.order.filter(item => item.stalkanatWeek.includes('SAT'))
      let satTotal = 0

      satOrder.forEach(item => {
        satTotal += parseInt(item.price)
      })

      return {order: satOrder, total: satTotal}
    }
  },
  methods: {
    removeItem (index, day) {
      if (day === 'SAT') {
        this.satOrder.order.splice(index, 1)
      } else {
        this.sunOrder.order.splice(index, 1)
      }

      this.order = this.satOrder.order.concat(this.sunOrder.order)
      localStorage.setItem('order', JSON.stringify(this.order))
    }
  }
}
</script>

<style scoped>
.menuText {
  text-align: center;
}
</style>
