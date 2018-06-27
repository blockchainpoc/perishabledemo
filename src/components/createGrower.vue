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
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Email address" v-model.lazy="grower.email">
                </div>
            </div>
            <div class="field">
                <label class="label">Country</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Country" v-model.lazy="grower.country">
                </div>
            </div>
            <button class="button is-primary" @click.prevent="createGrower">
                Create Grower
            </button>
        </form>
    </div>
</template>

<script>
const bc_api_url = "http://54.92.218.210:3000/api/";
export default {
    data () {
        return {
            grower:{
                email: "",
                country: "",
                accountBalance: 0
            },
           growerCreated: false,
        }
    },
    methods: {
        createGrower(){
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
                this.growerCreated = true
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