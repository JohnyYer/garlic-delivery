<template>
  <div id="app">
    <div class="header">
      <div class="headerNav">
        <div class="container">
          <div class="menu__burger">
            <span></span>
          </div>
          <a href="index.html" class="headerLogo">
            <img src="./assets/img/header-logo.png" alt="" title="">
          </a>
          <ul>
            <li>
              <a href="index.html" class="active">
                главная
              </a>
            </li>
            <li>
              <a href="menu.html">
                меню
              </a>
            </li>
            <li>
              <a href="delivery.html">
                Доставка и оплата
              </a>
            </li>
            <li>
              <a href="contact.html">
                контакты
              </a>
            </li>
            <li>
              <a href="complex.html">
                Комплексы
              </a>
            </li>
            <li class="mobileView">
              <a href="">
                +1-202-555-0003
              </a>
            </li>
          </ul>
          <a href="" class="headerSearch headerLink">
            <img src="./assets/img/search-ico.png" alt="">
          </a>
          <a href="shop.html" class="headerShop headerLink">
            <img src="./assets/img/shop-ico.png" alt="">
            <span>0</span>
          </a>
          <a href="" class="headerPhone headerLink desktopView">
            +1-202-555-0003
          </a>
        </div>
      </div>
    </div>
    <slick class="mainSlider" :options="slickOptions" >
      <div class="slide">
        <div class="slideTitle">
          <span>delivery</span>food
        </div>
      </div>
      <div class="slide">
        <div class="slideTitle">
          <span>delivery</span>food
        </div>
      </div>
      <div class="slide">
        <div class="slideTitle">
          <span>delivery</span>food
        </div>
      </div>
    </slick>

    <router-view/>
    <div class="footer">
      <div class="container">
        <ul class="footerNav">
          <li><a href="index.html">Главная</a>
          <li><a href="menu.html">меню</a>
          <li><a href="delivery.html">Доставка и оплата</a>
          <li><a href="contact.html">контакты</a>
          <li><a href="complex.html">Комплексы</a></li>
        </ul>
        <a href="" class="footerSocial">
          <img src="img/fb.png" alt="">
        </a>
        <a href="" class="footerSocial">
          <img src="img/ig.png" alt="">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Slick from 'vue-slick'

export default {
  name: 'App',
  data () {
    return {
      slickOptions: {
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        autoplay: false
      }
    }
  },
  components: {
    Slick
  }
}
</script>

<style lang="scss">
  .slide {
    background: url("./assets/img/slide.jpg") no-repeat center;
    height: 500px;
    width: 100%;
  }
  .slick-list,
  .slick-track,
  .slick-slide {
    width: 100%;
  }
  .mainSlider {
    width: 100%;
  }
  .slick-dots{
    position: absolute;
    bottom: 50px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
    li{
      display: inline-block;
      margin:  0 10px;
      position: relative;
      text-align: center;
      button{
        overflow: hidden;
        width: 15px;
        height: 15px;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        color: #ffffff;
        background: transparent;
        border: 1px solid #ffffff;
        text-indent: -9999px;
      }
      &.slick-active{
        button{
          background: #ffffff;
        }
      }
    }
  }
  .slideTitle{
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 3;
    font: 120px/120px robotoregular;
    text-transform: uppercase;
    color: #ffffff;
    &:before{
      content: '';
      width: 100%;
      max-width: 580px;
      height: 2px;
      background: #ffffff;
      position: absolute;
      top: -60px;
      left: 50%;
      -webkit-transform: translateX(-50%);
      -moz-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
      -o-transform: translateX(-50%);
      transform: translateX(-50%);
    }
    &:after{
      content: '';
      width: 100%;
      max-width: 580px;
      height: 2px;
      background: #ffffff;
      position: absolute;
      bottom: -60px;
      left: 50%;
      -webkit-transform: translateX(-50%);
      -moz-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
      -o-transform: translateX(-50%);
      transform: translateX(-50%);
    }
    span{
      font-family: robotobold;
      margin-right: 15px;
    }
  }
@import "assets/styles";
@import "../node_modules/slick-carousel/slick/slick.css";
</style>
