import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home'
import Login from '@/pages/Login'

import ProviderContact from '@/pages/Providers/menu/ProviderContact'
import ProviderRegister from '@/pages/Providers/ProviderRegister'
import ProviderSelect from '@/pages/Providers/ProviderSelect'
import ProviderServices from '@/pages/Providers/menu/ProviderServices'
import ProviderOrders from '@/pages/Providers/ProviderOrders'
import ProviderPayment from '@/pages/Providers/ProviderPayment'
import ProviderSchedule from '@/pages/Providers/ProviderSchedule'
import ProviderStart from '@/pages/Providers/ProviderStart'
//Menu
import ProviderNewService from '@/pages/Providers/menu/ProviderNewService'
import ProviderProfile from '@/pages/Providers/menu/ProviderProfile'

import BrideRegister from '@/pages/Brides/BrideRegister'
import BridePosRegister from '@/pages/Brides/BridePosRegister'
import BrideSelect from '@/pages/Brides/BrideSelect'
import BrideChoose from '@/pages/Brides/BrideChoose'
import BrideStart from '@/pages/Brides/BrideStart'
//Menu
import BrideProfile from '@/pages/Brides/menu/BrideProfile'
import BrideMarriage from '@/pages/Brides/menu/BrideMarriage'
import BrideOrders from '@/pages/Brides/menu/BrideOrders'
import BrideContact from '@/pages/Brides/menu/BrideContact'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/bride',
      name: 'BrideStart',
      component: BrideStart
    },
    {
      path: '/bride/register',
      name: 'BrideRegister',
      component: BrideRegister
    },
    {
      path: '/bride/posregister',
      name: 'BridePosRegister',
      component: BridePosRegister
    },
    {
      path: '/bride/select',
      name: 'BrideSelect',
      component: BrideSelect
    },
    {
      path: '/bride/choose/:services',
      name: 'BrideChoose',
      component: BrideChoose,
      props: true
    },
    {
      path: '/bride/profile',
      name: 'BrideProfile',
      component: BrideProfile
    },
    {
      path: '/bride/marriage',
      name: 'BrideMarriage',
      component: BrideMarriage
    },
    {
      path: '/bride/orders',
      name: 'BrideOrders',
      component: BrideOrders
    },
    {
      path: '/bride/contact',
      name: 'BrideContact',
      component: BrideContact
    },
    {
      path: '/provider',
      name: 'ProviderStart',
      component: ProviderStart
    },
    {
      path: '/provider/select',
      name: 'ProviderSelect',
      component: ProviderSelect
    },
    {
      path: '/provider/schedule',
      name: 'ProviderSchedule',
      component: ProviderSchedule
    },
    {
      path: '/provider/payment',
      name: 'ProviderPayment',
      component: ProviderPayment
    },
    {
      path: '/provider/orders',
      name: 'ProviderOrders',
      component: ProviderOrders
    },
    {
      path: '/provider/register',
      name: 'ProviderRegister',
      component: ProviderRegister
    },
    {
      path: '/provider/services',
      name: 'ProviderServices',
      component: ProviderServices
    },
    {
      path: '/provider/profile',
      name: 'ProviderProfile',
      component: ProviderProfile
    },
    {
      path: '/provider/contact',
      name: 'ProviderContact',
      component: ProviderContact
    }
  ]
})
