<template>
  <div class="complexSection defaultSection largeBottomPadding">
    <div class="container">
      <div class="deliveryWrapper">
        <div class="deliveryPart">
          <div class="deliveryTitle">
            оплата и доставка
          </div>
          <div class="deliveryPrice">
            <table>
              <tr>
                <td>Итого: </td>
                <td>{{ total }} грн</td>
              </tr>
            </table>
          </div>
          <div class="deliveryInfo">
              <div class="deliverySubTitle">Время доставки</div>
              <div class="inlineBlock mr70">
                <div class="customCheckbox">
                  <input type="radio" id="cache" name="time" value="13" v-model="orderDetails.time">
                  <label for="cache">13:00</label>
                </div>
              </div>
              <div class="inlineBlock">
                <div class="customCheckbox">
                  <input type="radio" id="card" name="time" value="16" v-model="orderDetails.time">
                  <label for="card">16:00</label>
                </div>
              </div>
              <div class="deliverySubTitle">Ваш номер телефона</div>
              <div class="customInput largeInput">
                <input type="tel" placeholder="" v-model="orderDetails.phone">
              </div>
              <div class="deliverySubTitle">Ваш адрес</div>
              <div class="customInput mediumInput">
                <label>Улица</label>
                <input type="text" placeholder="" v-model="orderDetails.street" disabled>
              </div>
              <div class="deliverySubTitle">Комментарий</div>
              <div class="customInput largeInput">
                <input type="text" placeholder="" v-model="orderDetails.comment">
              </div>
              <div class="floatLeft fullWidth mt30">
                <a href="" @click.prevent="makeOrder()" class="customBtn blueBtn">оформить заказ</a>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Order',
  props: ['order'],
  data () {
    return {
      orderDetails: {
        street: 'Стальканат ART'
      }
    }
  },
  methods: {
    makeOrder () {
      console.log(this.orderDetails)
      this.orderDetails.order = this.order

      axios.post(`/api/order`, this.orderDetails)
        .then(response => {
          localStorage.setItem('order', JSON.stringify([]))
          alert('Заказ успешно оформлен')
          this.$router.push({
            name: 'Stalkanat'
          })
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  computed: {
    total () {
      let total = 0
      this.order.forEach(item => {
        total += parseInt(item.price)
      })
      return total
    }
  }
}
</script>

<style scoped>

</style>
