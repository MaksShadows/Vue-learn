import Vue from 'vue'
import App from './App.vue'
import SimplePlugin from './plugins/simplePlugin'

import marked from 'marked'

import '@/assets/styles/main.scss';

Vue.use(SimplePlugin)
Vue.filter('marked', marked)

new Vue({
  render: h => h(App),
  el: '#app'
})
