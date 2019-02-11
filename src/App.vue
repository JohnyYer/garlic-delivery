<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
  .slide{
    background-image: url("./assets/img/slide.jpg");
  }
@import "assets/styles";
@import "../node_modules/slick-carousel/slick/slick.css";
</style>
