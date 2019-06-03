<template>
  <div class="singleItem">
    <div class="container">
  <b-row class="justify-content-md-center">
    <b-col cols="6">
      <div v-if="errors && errors.length">
        <div v-for="error of errors" v-bind:key="error.message">
          <b-alert show>{{error.message}}</b-alert>
        </div>
      </div>
      <b-form @submit.prevent="login">
        <b-form-group id="fieldsetHorizontal1"
                      horizontal
                      :label-cols="4"
                      breakpoint="md"
                      label="Имя">
          <b-form-input id="username" v-model.trim="username"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                      horizontal
                      :label-cols="4"
                      breakpoint="md"
                      label="Пароль">
          <b-form-input type="password" id="password" v-model.trim="password"></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Войти</b-button>
      </b-form>
    </b-col>
  </b-row>
    </div>
  </div>
</template>

<script>
import {AUTH_REQUEST} from '@/store/actions/auth'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      errors: []
    }
  },
  methods: {
    login () {
      const { username, password } = this
      this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
        this.$router.push({
          name: 'Admin'
        })
      })
    }
  }
}
</script>
