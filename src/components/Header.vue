<template>
  <header>
    <nav class="navbar is-transparent">
      <div class="navbar-brand">
        <!--<a class="navbar-item" href="https://bulma.io">
          <img src="https://static.wixstatic.com/media/4ff6ec_05be454893074357bb89860514e906d7~mv2.png/v1/fill/w_117,h_80,al_c,usm_0.66_1.00_0.01/4ff6ec_05be454893074357bb89860514e906d7~mv2.png" alt="Klassifai" width="117" height="80">
        </a>-->
        <figure class="navbar-item image"><img src="/img/flat_logo_2.png"></figure>
        <!--<div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
          <span></span>
          <span></span>
          <span></span>
        </div>-->
      </div>

      <div id="navbarExampleTransparentExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item" href="/">
            Home
          </a>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              Participants
            </a>
            <div class="navbar-dropdown is-boxed">
              <router-link class='navbar-item' to='/farmers/all'>
                Farmer
              </router-link>
              <router-link class='navbar-item' to='/truckers/all'>
                Trucker
              </router-link>
              <router-link class='navbar-item' to='/receivers/all'>
                Receiver
              </router-link>
            </div>
          </div>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              Assets
            </a>
            <div class="navbar-dropdown is-boxed">
              <router-link class='navbar-item' to='/shipments/all'>
                Shipments
              </router-link>
              <router-link class='navbar-item' to='/contracts/all'>
                Contracts
              </router-link>
            </div>
          </div>
          <!--<div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link" href="/documentation/overview/start/">
              Transactions
            </a>
            <div class="navbar-dropdown is-boxed">
              <a class="navbar-item" href="/documentation/overview/start/">
                Run Setup Demo
              </a>
            </div>
          </div>-->
        </div>

        <!--<div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <a class="bd-tw-button button" data-social-network="Twitter" data-social-action="tweet" data-social-target="http://localhost:4000" target="_blank" href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&amp;hashtags=bulmaio&amp;url=http://localhost:4000&amp;via=jgthms">
                  <span class="icon">
                    <i class="fab fa-twitter"></i>
                  </span>
                  <span>
                    Tweet
                  </span>
                </a>
              </p>
              <p class="control">
                <a class="button is-primary" href="https://github.com/jgthms/bulma/releases/download/0.7.1/bulma-0.7.1.zip">
                  <span class="icon">
                    <i class="fas fa-download"></i>
                  </span>
                  <span>Download</span>
                </a>
              </p>
            </div>
          </div>
        </div>-->
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  props:{
    title:{
      type:String,
      required:true 
    }
  },
  data () {
    return {
      
    }
  },
  methods: {
    changeTitle(){
      //this.$emit('changeTitle', "Blockchain PoC");
      this.title = "Blockchain PoC";
    }
  }
}
</script>

<style>
/*header{
    background: lightgreen;
    padding: 10px;
}*/
</style>