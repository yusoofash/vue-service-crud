import Vue from 'vue'
import VueRouter from 'vue-router'
import ListService from '../components/ListService.vue'
import AddService from '../components/AddService.vue'
import EditService from '../components/EditService.vue'

const routes = [
    {
        path: '/',
        component: ListService,
    },
    {
        path: '/add',
        component: AddService,
    },
    {
        path: '/edit/:id',
        component: EditService,
    },
]

Vue.use(VueRouter)

const router = new VueRouter({
  linkActiveClass: 'is-active',
  mode: 'history',
  routes
})

export default router