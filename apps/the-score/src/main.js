import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueJsBridge from 'vue-webview-js-bridge'
// import vuetify from './plugins/vuetify' // path to vuetify export
// import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css'
// import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css'
// import '@mdi/font/css/materialdesignicons.css'
// Vue.use(Vuetify)
import VueShowdown from 'vue-showdown'
import router from './router'
// import 'vant/lib/index.css';
import { Button, Icon, NavBar, Loading, Toast, Row, Col } from 'vant';
Vue.use(Button);
Vue.use(Icon);
Vue.use(NavBar);
Vue.use(Loading)
Vue.use(Toast)

Vue.use(Col);
Vue.use(Row);
Vue.use(VueJsBridge, {
  // debug: true,
  // nativeHandlerName: 'changeModel',
  // mock: true,
  // mockHandler (payload, next) {
  //   console.log(payload)
    // mock by payload
    // call next(data) to mock data
    // alert('playHandler invoke!')
    // next(Object.assign({ form: "native" }, payload));
  // }
  // ...
})
Vue.use(VueShowdown, {
  // set default flavor of showdown
  flavor: 'github',
  // set default options of showdown (will override the flavor options)
  options: {
    emoji: false,
  },
})

// Vue.use(Vuetify)
Vue.config.productionTip = false

new Vue({
  // vuetify,
  // vuetify: new Vuetify(),
  router,
  render: h => h(App)
}).$mount('#app')
