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
                <td>Итого</td>
                <td>306 грн</td>
              </tr>
            </table>
          </div>
          <div class="deliveryInfo">
            <div class="deliverySubTitle">Ваш номер телефона</div>
            <div class="customInput largeInput">
              <input type="text" placeholder="">
            </div>
            <div class="deliverySubTitle">Ваш адрес</div>
            <div class="customInput mediumInput">
              <label>Улица</label>
              <input type="text" placeholder="">
            </div>
            <div class="customInput smallInput">
              <label>Дом</label>
              <input type="text" placeholder="">
            </div>
            <div class="customInput smallInput">
              <label>Корпус</label>
              <input type="text" placeholder="">
            </div>
            <div class="customInput smallInput">
              <label>Квартира</label>
              <input type="text" placeholder="">
            </div>
            <div class="deliverySubTitle">Комментарий</div>
            <div class="customInput largeInput">
              <input type="text" placeholder="">
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
export default {
  name: 'Order',
  props: ['order'],
  methods: {
    makeOrder () {
      this.order = []
      localStorage.setItem('order', JSON.stringify(this.order))
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
