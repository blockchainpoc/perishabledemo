<template>
  <div>
    <!--<app-header :title="title" @changeTitle="updateTitle($event)"></app-header>
    <app-content :ninjas="ninjas"></app-content>
    <add-blog></add-blog>
    <show-growers></show-growers>
    <app-footer :title="title"></app-footer>-->
    <app-header :title="title" @changeTitle="updateTitle($event)"></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Landing from './components/Landing.vue';
import addBlog from './components/addBlog.vue';
import showGrowers from './components/showGrowers.vue';
import createGrower from './components/createGrower.vue';
import showImporters from './components/showImporters.vue';
import createImporter from './components/createImporter.vue';
import showShippers from './components/showShippers.vue';
import createShipper from './components/createShipper.vue';
import showShipments from './components/showShipments.vue';
import showContracts from './components/showContracts.vue';
import createContract from './components/createContract.vue';
import createShipment from './components/createShipment.vue';

export default {
  components:{
    'app-header': Header,
    'app-footer': Footer,
    'app-content': Landing,
    'add-blog': addBlog,
    'show-growers': showGrowers,
    'show-importers': showImporters,
    'show-shippers': showShippers,
    'show-shipments': showShipments,
    'show-contracts': showContracts,
    'create-contract': createContract,
    'create-shipment': createShipment,
  },
  data () {
    return {
      ninjas: [
            {name: 'Ryu', speciality: 'Vue Components', show: false},
            {name: 'Crystal', speciality: 'HTML Wizardry', show: false},
            {name: 'Hitoshi', speciality: 'Click Events', show: false},
            {name: 'Tango', speciality: 'Conditionals', show: false},
            {name: 'Kami', speciality: 'Webpack', show: false},
            {name: 'Yoshi', speciality: 'Data Diggin', show: false}
        ],
      title: "Goods Shipment - Port to Port PoC"
    }
  },
  methods: {
    updateTitle(updatedTitle){
      this.title = updatedTitle;
    }
  }
}
</script>

<style>

</style>
