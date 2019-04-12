import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Dashboard from '@/components/admin/Dashboard'
import Menu from '@/components/Menu'
import Dish from '@/components/Dish'
import Delivery from '@/components/Delivery'
import Contact from '@/components/Contact'
import Cart from '@/components/Cart'
import Order from '@/components/Order'
import CustomMenu from '@/components/CustomMenu'
import Orders from '@/components/admin/Orders'
import GoogleTables from '@/components/admin/GoogleTables'
import OrdersBilling from '@/components/admin/OrdersBilling'
import Stickers from '@/components/admin/Stickers'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: MainPage,
      children: [
        {
          path: '/stalkanatArt',
          name: 'Stalkanat',
          component: CustomMenu
        },
        {
          path: '/menu',
          name: 'Menu',
          component: Menu
        },
        {
          path: '/delivery',
          name: 'Delivery',
          component: Delivery
        },
        {
          path: '/contact',
          name: 'Contact',
          component: Contact
        },
        {
          path: '/dish/:id',
          name: 'Dish',
          component: Dish,
          props: true
        },
        {
          path: '/cart',
          name: 'Cart',
          component: Cart
        },
        {
          path: '/order',
          name: 'Order',
          component: Order
        },
        {
          path: '/login',
          name: 'Login',
          component: Login
        }
      ]
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Dashboard
    },
    {
      path: '/orders',
      name: 'Orders',
      component: Orders
    },
    {
      path: '/tables',
      name: 'DeliveryTables',
      component: GoogleTables
    },
    {
      path: '/bills',
      name: 'OrdersBilling',
      component: OrdersBilling
    },
    {
      path: '/stickers',
      name: 'Stickers',
      component: Stickers
    }
  ]
})
