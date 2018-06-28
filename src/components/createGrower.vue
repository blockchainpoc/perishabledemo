<template>
    <div id="create-grower">
        <section class="section">
            <div class="container">
                <h1 class="title is-1">
                    Create New Grower
                </h1>
                <h2 class="subtitle">
                    (org.acme.shipping.perishable.Grower)
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li><a href='/growers/all'>List All</a></li>
                            <li><a href='/growers/create'>Create</a></li>
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
                    <input id="growerEmail" class="input" type="text" placeholder="Email address" v-model.lazy="grower.email" :disabled="growerCreated">
                </div>
            </div>
            <div class="field">
                <label class="label">Country</label>
                <div class="control">
                    <input id="growerCountry" class="input" type="text" placeholder="Country" v-model.lazy="grower.country" :disabled="growerCreated">
                </div>
            </div>
            <button id="btnCreateGrower" class="button is-primary" @click.prevent="createGrower" :disabled="growerCreated">
                Create Grower
            </button>
        </form>
    </div>
</template>

<script>
const bc_api_url = "http://54.92.218.210:3000/api";
export default {
    data () {
        return {
            grower:{
                email: "",
                country: "",
                accountBalance: 0
            },
           growerCreated: false,
           isLoading: false
        }
    },
    methods: {
        createGrower(){
            //console.log("this is hte grower email:");
            //console.log(this.grower.email);
            if(this.grower.email.length > 0 && this.grower.country.length > 0){
                this.isLoading = true;
                this.$http.post(bc_api_url + '/Grower',{
                    "$class": "org.acme.shipping.perishable.Grower",
                    "email": this.grower.email,
                    "address": {
                        "$class": "org.acme.shipping.perishable.Address",
                        "country": this.grower.country,
                    },
                    "accountBalance": this.grower.accountBalance
                }).then(function(data){
                    console.log("$$$ this is the post data:");
                    console.log(data.body);
                    this.growerCreated = true;
                    this.isLoading = false;
                    this.$toast.open({
                        message: 'Successfully created new grower!',
                        type: 'is-success'
                    });
                    setTimeout(()=>(window.location.href = window.location.origin + '/growers/all'), 1000)
                });
            }
            else{
                console.log('email is empty');
                this.$toast.open({
                    message: "Unable to create grower with empty details!",
                    type: 'is-danger'
                })
            }
        }
    },
    created(){
        console.log("%%%%% this s the grower created value:");
        console.log(this.growerCreated);
    }
}
</script>

<style>
form{
    margin: 20px auto;
    width: 600px;
}

</style>