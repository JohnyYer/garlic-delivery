<template>
<div>
  <div class="header" v-bind:class="{'noSlider': $route.name !== 'Index', 'scrolledHeader': isScrolable}">
    <div class="headerNav">
      <div class="container">
        <div class="menu__burger">
          <span></span>
        </div>
        <a href="/" class="headerLogo">
          <img src="../assets/img/header-logo.png" alt="" title="">
        </a>
        <ul>
          <li>
            <a href="/" v-bind:class="{'active': $route.name === 'Index'}" >
              главная
            </a>
          </li>
          <li>
            <a href="/menu" v-bind:class="{'active': $route.name === 'Menu'}">
              меню
            </a>
          </li>
          <li>
            <a href="/delivery" v-bind:class="{'active': $route.name === 'Delivery'}">
              Доставка и оплата
            </a>
          </li>
          <li>
            <a href="/contact" v-bind:class="{'active': $route.name === 'Contact'}">
              контакты
            </a>
          </li>
          <li class="mobileView">
            <a href="tel:+380631112132">
              +38(063) 11-12-13-2
            </a>
          </li>
        </ul>
        <a v-if="$route.name === 'Stalkanat'" href="/cart" class="headerShop headerLink">
          <img src="../assets/img/shop-ico.png" alt="">
          <span>{{order.length}}</span>
        </a>
        <a href="" class="headerPhone headerLink desktopView">
          +38(063) 11-12-13-2
        </a>
      </div>
    </div>
    <slick class="headerSlider" :options="slickOptions" >
      <div class="slide">
        <div class="slideTitle">
          Лучшая доставка по версии
          <p>НАШЕЙ МАМЫ*</p>
          <span class="quot">*Одессы Мамы=)</span>
        </div>
      </div>
      <div class="slide">
        <div class="slideTitle">
          Лучшая доставка по версии
          <p>НАШЕЙ МАМЫ*</p>
          <span class="quot">*Одессы Мамы=)</span>
        </div>
      </div>
      <div class="slide">
        <div class="slideTitle">
          Лучшая доставка по версии
          <p>НАШЕЙ МАМЫ*</p>
          <span class="quot">*Одессы Мамы=)</span>
        </div>
      </div>
    </slick>
  </div>
  <router-view v-bind:order="order" v-on:scroll-header="scrollHeader"></router-view>
  <div v-if="$route.name === 'Index'" class="promoSection defaultSection">

    <slick class="promoSlider " :options="promoSlideConfig" v-if="featuredDishes.length > 1">
      <div :key="slide._id" v-for="slide in featuredDishes" class="promoOuterSlide">
        <div class="promoSlide">
          <div class="promoImage backgroundImage" v-bind:style="{'background-image': 'url(\'/static/'+slide.image+'\')'}">
            <img src="../assets/img/promo-mask.png" alt="" title="">
          </div>
          <div class="promoContent" v-bind:style="{'background-image': 'url(\'/static/'+slide.sliderImages[0]+'\')'}">
            <div class="promoInner">
              <div class="promoTitle">
                {{ slide.name }}
              </div>
              <div class="promoText">
                {{ slide.description }}
              </div>
              <a :href="'/dish/'+slide._id" class="promoLink">
                Подробнее
              </a>
            </div>
          </div>
        </div>
      </div>
    </slick>

  </div>
  <div class="defaultImageSection">
    <div class="smallImage imageSection backgroundImage" style="background-image:url('/static/garnish/kartofel_otvarnoi_s_zelenyu/img0100.jpg');">
    </div>
    <div class="largeImage imageSection backgroundImage" style="background-image:url('/static/main_dishes/pork/kolbaski_munhenskie/img0088.jpg');">
    </div>
  </div>
  <div class="footer">
    <div class="container">
      <ul class="footerNav">
        <li><a href="/">Главная</a>
        <li><a href="/menu">меню</a>
        <li><a href="/delivery">Доставка и оплата</a>
        <li><a href="/contact">контакты</a>
        </li>
      </ul>
      <a href="https://www.facebook.com/garlicodessa" class="footerSocial">
        <img src="../assets/img/fb.png" alt="">
      </a>
      <a href="https://www.instagram.com/garlic_delivery/" class="footerSocial">
        <img src="../assets/img/ig.png" alt="">
      </a>
    </div>
  </div>
</div>
</template>

<script>
import Slick from 'vue-slick'
import axios from 'axios'

export default {
  name: 'MainPage',
  data () {
    return {
      slickOptions: {
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        autoplay: false
      },
      promoSlideConfig: {
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '480px',
        infinite: true,
        prevArrow: '<div class="slick-prev"><button type="button">Назад</button></div>',
        nextArrow: '<div class="slick-next"><button type="button">Вперед</button></div>',
        dots: false,
        autoplay: false,
        responsive: [
          {
            breakpoint: 1700,
            settings: {
              centerPadding: '350px'
            }
          },
          {
            breakpoint: 1550,
            settings: {
              centerPadding: '300px'
            }
          },
          {
            breakpoint: 1420,
            settings: {
              centerPadding: '250px'
            }
          },
          {
            breakpoint: 1320,
            settings: {
              centerPadding: '200px'
            }
          },
          {
            breakpoint: 1220,
            settings: {
              centerPadding: '150px'
            }
          },
          {
            breakpoint: 1120,
            settings: {
              centerPadding: '100px'
            }
          },
          {
            breakpoint: 1024,
            settings: {
              centerPadding: '100px'
            }
          },
          {
            breakpoint: 1000,
            settings: {
              centerPadding: '0px'
            }
          },
          {
            breakpoint: 820,
            settings: {
              centerMode: false
            }
          }
        ]
      },
      featuredDishes: [],
      order: JSON.parse(localStorage.getItem('order')) || [],
      isScrolable: false
    }
  },
  methods: {
    scrollHeader (param) {
      this.isScrolable = param
    }
  },
  created () {
    axios.get(`/api/dish`)
      .then(response => {
        this.featuredDishes = response.data.filter(item => item.isSpecial)
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
  components: {
    Slick
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.quot {
  font: 27px "robotobold";
  right: -20%;
  bottom: -30%;
  position: absolute;
}

.scrolledHeader {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  animation: smoothScroll 1s forwards;
}
@keyframes smoothScroll {
  0% {
    transform: translateY(-120px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
