<template>
  <div>
    <top-menu></top-menu>
    <div class="dish-form">
      <b-card bg-variant="light">
        <b-form-group
          label-cols-lg="3"
          label="Холодос"
          label-size="lg"
          label-class="font-weight-bold pt-0"
          class="mb-0"
        >
          <b-form-group
            label-cols-sm="3"
            label="Название блюда"
            label-align-sm="right"
            label-for="nested-street"
          >
            <b-form-input id="nested-street" v-model="dish.name"></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="3"
            label="Кличество стикеров"
            label-align-sm="right"
            label-for="nested-city"
          >
            <b-form-input id="nested-city" v-model="dish.qty"></b-form-input>
          </b-form-group>

          <b-button @click="createStickers()">Сохранить</b-button>

        </b-form-group>
      </b-card>
    </div>
    <div class="page">
          <div class="col" :key="i" v-if="sticker" v-for="(sticker, i) in stickers">
            <span class="company">{{sticker.name}}</span>
            <img src="../../assets/img/NELLI_QR.jpg" alt="">
          </div>
      </div>

  </div>
</template>

<script>

export default {
  name: 'Refregerator',
  data () {
    return {
      dish: {
        name: '',
        qty: ''
      },
      stickers: []
    }
  },
  created: function () {

  },
  methods: {
    createStickers: function () {
      for (let i = 0; i <= this.dish.qty; i++) {
        this.stickers.push({
          name: this.dish.name
        })
      }

      this.dish = {}
    }
  }
}
</script>

<style scoped>
  body {
    margin: 0;
    padding: 0;
  }
  * {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
  }
  .page {
    width: 21cm;
    min-height: 29.7cm;
    margin: 1cm auto;
    border: 1px #D3D3D3 solid;
    border-radius: 5px;
    background: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }

  @page {
    size: A4;
    margin: 0;
  }
  @media print {
    .page {
      margin: 0;
      border: initial;
      border-radius: initial;
      width: initial;
      min-height: initial;
      box-shadow: initial;
      background: initial;
      page-break-after: always;
    }
  }

  .col {
    height: 140px;
    width: 25%;
    padding: 14px;
    text-align: center;
    float: left;
    font-size: 14px;
  }

  .col span {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    font-weight: bold;
  }

  img {
    width: 60px
  }

  @media print
  {
    .dish-form {
      display: none;
    }
  }
</style>
