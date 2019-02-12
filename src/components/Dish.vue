<template>
  <div class="singleItem">
    <div class="container">
      <a href="/menu" class="backButton">Назад</a>
      <div class="singleProduct storeItem">
        <div class="productSlider">
          <slick class="productSlider" v-if="dish.sliderImages">
            <div :key="slide" class="slick-slide" v-for="slide in dish.sliderImages" v-bind:style="{'background-image': 'url(\'/static'+slide+'\')'}">
              <img src="../assets/img/product-mask.png" />
            </div>
          </slick>
        </div>
        <div class="productData storeContent">
          <div class="storeTitle">{{ dish.name }}</div>
          <div class="storePrice">{{ dish.price }} грн.</div>
          <div class="storeInfo">
            <!--
                      <div class="weight">250 гр.</div>
            -->
            <div class="description">
              {{ dish.ingredients }}
            </div>
            <div class="description">
              {{ dish.description }}
            </div>
          </div>
          <!--<div class="storeBottom">
            <a href="" class="customBtn blueBtn" @click.prevent="addToCart(dish)">в корзину</a>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Slick from 'vue-slick'

export default {
  name: 'Dish',
  props: ['id', 'order'],
  data () {
    return {
      dish: {}
    }
  },
  created () {
    axios.get(`/api/dish/` + this.id)
      .then(response => {
        this.dish = response.data
      })
      .catch(e => {
        this.errors.push(e)
        if (e.response.status === 401) {
          this.$router.push({
            name: 'Menu'
          })
        }
      })
  },
  components: {
    Slick
  },
  methods: {
    addToCart (dish) {
      let oldItems = JSON.parse(localStorage.getItem('order')) || []
      oldItems.push(dish)
      this.order.push(dish)
      localStorage.setItem('order', JSON.stringify(oldItems))
    }
  }
}
</script>

<style scoped>
  .slick-slide {
    background-size: 165%;
    background-repeat: no-repeat;
    background-position: center;
  }
</style>
