import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Recipes from '@/views/Recipes';
import RecipeDetail from '@/views/RecipeDetail';
import RecipeNew from '@/views/RecipeNew';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/recipes',
    name: 'Recipes',
    component: Recipes
  },
  {
    path: '/recipes/new',
    name: 'RecipeNew',
    component: RecipeNew
  },
  {
    path: '/recipes/:id',
    name: 'RecipeDetail',
    component: RecipeDetail
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
