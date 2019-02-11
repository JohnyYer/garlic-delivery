<template>
  <div class="singleItem">
    <div class="container">
      <div class="singleProduct storeItem">
        <h2>Мы стараемся сделать доставку для Вас максимально комфортной!</h2>
        <h4>Стандартное время доставки с <b>13:00 до 14:00</b></h4>

        <p>Если Вы желаете изменить время доставки или получить более точный расчёт времени исходя из вашего местоположения, то свяжитесь с нами по номеру <a href="tel:+380631112132">+38(063) 11-12-13-2</a></p>

        <p>Если Вы желаете использовать безналичный расчет или подписать договор о доставке на регулярной основе, то так же ждем ваших вопросов по телефону <a href="tel:+380631112132">+38(063) 11-12-13-2</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Delivery'
}
</script>

<style lang="scss" scoped>
.singleProduct {
    min-height: 100px;
    text-align: center;
    padding: 50px;
    h2 {
      margin-bottom: 20px;
    }
    p {
      text-align: justify;
      padding: 10px;
    }
}
</style>
