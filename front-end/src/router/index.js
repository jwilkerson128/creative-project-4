import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Story from '../views/Story.vue'
import StoryCreator from '../views/StoryCreator.vue'
import Admin from '../views/Admin.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/storycreator',
    name: 'StoryCreator',
    component: StoryCreator
  },
  {
    path: '/story/:id',
    name: 'Story',
    component: Story
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router