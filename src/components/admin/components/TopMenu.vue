<template>
  <b-navbar toggleable="md" type="dark" variant="info">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="#">Garlic Admin</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item href="/admin">Меню</b-nav-item>
        <b-nav-item href='/tables/garlic'>Бегунки</b-nav-item>
        <b-nav-item href='/bills'>Чеки</b-nav-item>
        <b-nav-item href='/stickers'>Наклейки</b-nav-item>
        <b-nav-item-dropdown>
          <template slot="button-content">
            <em>METRO</em>
          </template>
          <b-dropdown-item href="/metro-billing">Чеки</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>

          <!-- Using button-content slot -->
          <template slot="button-content">
            <em>{{userName}}</em>
          </template>

          <b-dropdown-item @click.prevent="logout()">Выйти</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
import {AUTH_LOGOUT} from '@/store/actions/auth'
import { mapState } from 'vuex'

export default {
  name: 'TopMenu',
  methods: {
    logout: function () {
      this.$store.dispatch(AUTH_LOGOUT)
        .then(() => {
          this.$router.push('/login')
        })
    }
  },
  computed: mapState({userName: state => state.user.userName})

}
</script>

<style scoped>

</style>
