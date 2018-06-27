<template>
  <div id="landing">
      <!--<ul>
          <li v-for='ninja in ninjas' @click="ninja.show = !ninja.show">
              <h2 class="title is-2">{{ninja.name}}</h2>
              <h3 v-show="ninja.show" class="title is-3">{{ninja.speciality}}</h3>
          </li>
      </ul>
      <button @click="deleteNinja">Delete Ninja</button>-->
        <section class="hero is-success is-large">
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
#ninjas{
    width: 100%;
    max-width: 1200px;
    margin: 40px auto;
    padding: 0 20px;
    box-sizing: border-box;
}
ul{
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
}
li{
    flex-grow: 1;
    flex-basis: 300px;
    text-align: center;
    padding: 30px;
    border: 1px solid #222;
    margin: 10px;
}
</style>