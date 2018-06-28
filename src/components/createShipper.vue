<template>
    <div id="create-shipper">
        <section class="section">
            <div class="container">
                <h1 class="title is-1">
                    Create New Shipper
                </h1>
                <h2 class="subtitle">
                    (org.acme.shipping.perishable.Shipper)
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li><a href='/shippers/all'>List All</a></li>
                            <li><a href='/shippers/create'>Create</a></li>
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
                    <input class="input" type="text" placeholder="Email address" v-model.lazy="shipper.email" :disabled="shipperCreated">
                </div>
            </div>
            <div class="field">
                <label class="label">Country</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Country" v-model.lazy="shipper.country" :disabled="shipperCreated">
                </div>
            </div>
            <button class="button is-primary" @click.prevent="createShipper" :disabled="shipperCreated">
                Create Shipper
            </button>
        </form>
    </div>
</template>

<script>
const bc_api_url = "http://54.92.218.210:3000/api/";
export default {
    data () {
        return {
            shipper:{
                email: "",
                country: "",
                accountBalance: 0
            },
           shipperCreated: false,
           isLoading: false
        }
    },
    methods: {
        createShipper(){
            if(this.shipper.email.length > 0 && this.shipper.country.length > 0){
                this.isLoading = true;
                this.$http.post(bc_api_url + '/Shipper',{
                    "$class": "org.acme.shipping.perishable.Shipper",
                    "email": this.shipper.email,
                    "address": {
                        "$class": "org.acme.shipping.perishable.Address",
                        "country": this.shipper.country,
                    },
                    "accountBalance": this.shipper.accountBalance
                }).then(function(data){
                    console.log("$$$ this is the post data:");
                    console.log(data.body);
                    this.shipperCreated = true
                    this.isLoading = false;
                    this.$toast.open({
                            message: 'Successfully created new shipper!',
                            type: 'is-success'
                        });
                    setTimeout(()=>(window.location.href = window.location.origin + '/shippers/all'), 1000)
                });
            }
            else{
                this.$toast.open({
                    message: "Unable to create shipper with empty details!",
                    type: 'is-danger'
                })
            }
        }
    }
}
</script>

<style>
form{
    margin: 20px auto;
    width: 600px;
}

</style>