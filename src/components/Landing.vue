<template>
  <div id="landing">
      <!--<ul>
          <li v-for='ninja in ninjas' @click="ninja.show = !ninja.show">
              <h2 class="title is-2">{{ninja.name}}</h2>
              <h3 v-show="ninja.show" class="title is-3">{{ninja.speciality}}</h3>
          </li>
      </ul>
      <button @click="deleteNinja">Delete Ninja</button>-->
        <section class="hero is-dark is-bold is-large">
            <div class="hero-body">
                <div class="container">
                <h1 class="title">
                    Goods Shipment - Port to Port
                </h1>
                <h2 class="subtitle">
                    Blockchain PoC by <b><i>Klassifai</i></b>
                </h2>
                </div>
            </div>
        </section>
  </div>
</template>

<script>
export default {
    /*props: {
        ninjas:{
            type:Array,
            required: true
        }
    },*/
    data () {
        return {
            
        }
    },
    methods: {
        deleteNinja(){
            this.ninjas.pop();
        }
    }
}
</script>

<style>
</style>