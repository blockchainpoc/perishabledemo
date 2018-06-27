import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './routes'

Vue.config.productionTip = false

Vue.use(VueResource);
Vue.use(VueRouter);

Vue.filter('remove_grower_class', function(value){
  return value.replace('resource:org.acme.shipping.perishable.Grower#', '');
});

Vue.filter('remove_shipper_class', function(value){
  return value.replace('resource:org.acme.shipping.perishable.Shipper#', '');
});

Vue.filter('remove_importer_class', function(value){
  return value.replace('resource:org.acme.shipping.perishable.Importer#', '');
});

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
