import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './routes'
import Buefy from 'buefy'

Vue.config.productionTip = false

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Buefy);

Vue.filter('remove_farmer_class', function(value){
  return value.replace('resource:org.acme.shipping.perishable.Farmer#', '');
});

Vue.filter('remove_trucker_class', function(value){
  return value.replace('resource:org.acme.shipping.perishable.Trucker#', '');
});

Vue.filter('remove_receiver_class', function(value){
  return value.replace('resource:org.acme.shipping.perishable.Receiver#', '');
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
