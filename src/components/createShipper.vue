<template>
    <div id="create-grower">
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
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Email address" v-model.lazy="shipper.email">
                </div>
            </div>
            <div class="field">
                <label class="label">Country</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Country" v-model.lazy="shipper.country">
                </div>
            </div>
            <button class="button is-primary" @click.prevent="createShipper">
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
        }
    },
    methods: {
        createShipper(){
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
            });
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