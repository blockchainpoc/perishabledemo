<template>
    <div id="create-farmer">
        <section class="section">
            <div class="container">
                <h1 class="title is-1">
                    Create New Farmer
                </h1>
                <h2 class="subtitle">
                    (org.acme.shipping.perishable.Farmer)
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li><a href='/farmers/all'>List All</a></li>
                            <li><a href='/farmers/create'>Create</a></li>
                        </ul>
                    </nav>
                </h2>
            </div>
        </section>
        <form>
            <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false"></b-loading>
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input id="farmerEmail" class="input" type="text" placeholder="Email address" v-model.lazy="farmer.email" :disabled="farmerCreated">
                </div>
            </div>
            <div class="field">
                <label class="label">Country</label>
                <div class="control">
                    <input id="farmerCountry" class="input" type="text" placeholder="Country" v-model.lazy="farmer.country" :disabled="farmerCreated">
                </div>
            </div>
            <button id="btnCreateFarmer" class="button is-primary" @click.prevent="createFarmer" :disabled="farmerCreated">
                Create Farmer
            </button>
        </form>
    </div>
</template>

<script>
const bc_api_url = "http://104.196.163.139:3000/api";
export default {
    data () {
        return {
            farmer:{
                email: "",
                country: "",
                accountBalance: 0
            },
           farmerCreated: false,
           isLoading: false
        }
    },
    methods: {
        createFarmer(){
            //console.log("this is hte farmer email:");
            //console.log(this.farmer.email);
            if(this.farmer.email.length > 0 && this.farmer.country.length > 0){
                this.isLoading = true;
                this.$http.post(bc_api_url + '/Farmer',{
                    "$class": "org.acme.shipping.perishable.Farmer",
                    "email": this.farmer.email,
                    "address": {
                        "$class": "org.acme.shipping.perishable.Address",
                        "country": this.farmer.country,
                    },
                    "accountBalance": this.farmer.accountBalance
                }).then(function(data){
                    console.log("$$$ this is the post data:");
                    console.log(data.body);
                    this.farmerCreated = true;
                    this.isLoading = false;
                    this.$toast.open({
                        message: 'Successfully created new farmer!',
                        type: 'is-success'
                    });
                    setTimeout(()=>(window.location.href = window.location.origin + '/farmers/all'), 1000)
                });
            }
            else{
                console.log('email is empty');
                this.$toast.open({
                    message: "Unable to create farmer with empty details!",
                    type: 'is-danger'
                })
            }
        }
    },
    created(){
        console.log("%%%%% this s the farmer created value:");
        console.log(this.farmerCreated);
    }
}
</script>

<style>
form{
    margin: 20px auto;
    width: 600px;
}

</style>