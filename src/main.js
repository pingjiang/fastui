import 'iview/dist/styles/iview.css';

import Vue from 'vue';
import iview from 'iview';
import * as QueryBuilder from '@fastui/querybuilder';
import * as SchemaForm from '@fastui/schemaform';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(iview, {
  transfer: true,
});

Vue.use(QueryBuilder);
Vue.use(SchemaForm);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
