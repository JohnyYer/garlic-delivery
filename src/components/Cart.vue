<template>
  <div class="complexSection defaultSection largeBottomPadding">
    <div class="container">
      <div class="menuSideBar noMargin shopSideBar">
        <div class="customTitle">
          корзина
        </div>
        <div class="menuText">
          <p>Обеды доставляются на ваше мероприятие к <b>13:00 и 16:00</b>.
            </p>
          <p>Не забудьте выбрать оптимальное для вас время при дальнейшем оформлении заказа.</p>
        </div>
      </div>
      <div class="menuWrapper">
        <div class="basketDataInfo">
          <div class="priceVal">
            <div class="line">
              <span class="text">Итого</span>
              <span class="price">758 грн</span>
            </div>
          </div>
          <div class="processedBtn">
            <a href="/order" class="customBtn blueBtn">Оформить</a>
          </div>
        </div>
        <div class="menuItems">
          <div class="menuItem" :key="item._id" v-for="item in order">
            <span class="removeItem" @click="removeItem(item._id)">X</span>
            <div class="storeItem textCenter">
              <div class="storePhoto backgroundImage" v-bind:style="{'background-image': 'url(\'/static/'+item.image+'\')'}">
                <img src="../assets/img/store-mask.png" alt="" title="">
                <div class="storeInfo">
                  <div class="tableDiv">
                    <div class="tableCell">
                      {{item.description}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="storeContent">
                <a href="" class="storeTitle">{{item.name}}</a>
                <div class="storePrice">{{item.price}} грн.</div>
                <div class="storeBottom">
                  <div class="storeNum">
                    <span class="minus"></span>
                    <input type="text" value="1" min="0">
                    <span class="plus"></span>
                  </div>
                </div>
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
  props: ['order']
}
</script>

<style scoped>
.menuText {
  text-align: center;
}
</style>
