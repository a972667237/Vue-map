// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-default/index.css'
import Index from './pages/index.vue'
import Back from './pages/backend.vue'
import VueResource from 'vue-resource'

Vue.use(Element)
Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [{
  name: 'index',
  path: '/',
  component: Index
},
{
  name: 'admin',
  path: '/admin',
  component: Back
}]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
