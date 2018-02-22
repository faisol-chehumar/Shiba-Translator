import Vue from 'vue'
import Router from 'vue-router'
import TextReview from '@/components/TextReview'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TextReview',
      component: TextReview
    }
  ]
})
