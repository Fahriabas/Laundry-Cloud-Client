import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ListProductView from '../views/ListProductView.vue'
import FormEditStoreView from '../views/FormEditStoreView.vue'
import FormAddStoreView from '../views/FormAddStoreView.vue'
import MyStoreView from '../views/MyStoreView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/product/:idStore',
      name: 'listProduct',
      component: ListProductView
    },
    {
      path: '/edit/:idStore',
      name: 'editStore',
      component: FormEditStoreView
    },
    {
      path: '/addNewStore',
      name: 'addStore',
      component: FormAddStoreView
    },
    {
      path: '/myStores',
      name: 'myStores',
      component: MyStoreView
    }
  ]
})

export default router
