<template>
  <div>
    <app-header :title="title" @changeTitle="updateTitle($event)"></app-header>
    <router-view style="min-height:700px;"></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Landing from './components/Landing.vue';


export default {
  components:{
    'app-header': Header,
    'app-footer': Footer,
    'app-content': Landing,
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
