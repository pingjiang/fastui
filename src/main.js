import Vue from 'vue';
import iview from 'iview';
import * as QueryBuilder from '@fastui/querybuilder';

import App from './App.vue';
import router from './router';
import store from './store';

import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false;

Vue.use(iview, {
  transfer: true,
});

Vue.use(QueryBuilder);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
