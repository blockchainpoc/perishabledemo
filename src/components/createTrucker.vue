<template>
    <div id="create-trucker">
        <section class="section">
            <div class="container">
                <h1 class="title is-1">
                    Create New Trucker
                </h1>
                <h2 class="subtitle">
                    (org.acme.shipping.perishable.Trucker)
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li><a href='/truckers/all'>List All</a></li>
                            <li><a href='/truckers/create'>Create</a></li>
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
                    <input class="input" type="text" placeholder="Email address" v-model.lazy="trucker.email" :disabled="truckerCreated">
                </div>
            </div>
            <div class="field">
                <label class="label">Country</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Country" v-model.lazy="trucker.country" :disabled="truckerCreated">
                </div>
            </div>
            <button class="button is-primary" @click.prevent="createTrucker" :disabled="truckerCreated">
                Create Trucker
            </button>
        </form>
    </div>
</template>

<script>
const bc_api_url = "http://54.92.218.210:3000/api/";
export default {
    data () {
        return {
            trucker:{
                email: "",
                country: "",
                accountBalance: 0
            },
           truckerCreated: false,
           isLoading: false
        }
    },
    methods: {
        createTrucker(){
            if(this.trucker.email.length > 0 && this.trucker.country.length > 0){
                this.isLoading = true;
                this.$http.post(bc_api_url + '/Trucker',{
                    "$class": "org.acme.shipping.perishable.Trucker",
                    "email": this.trucker.email,
                    "address": {
                        "$class": "org.acme.shipping.perishable.Address",
                        "country": this.trucker.country,
                    },
                    "accountBalance": this.trucker.accountBalance
                }).then(function(data){
                    console.log("$$$ this is the post data:");
                    console.log(data.body);
                    this.truckerCreated = true
                    this.isLoading = false;
                    this.$toast.open({
                            message: 'Successfully created new trucker!',
                            type: 'is-success'
                        });
                    setTimeout(()=>(window.location.href = window.location.origin + '/truckers/all'), 1000)
                });
            }
            else{
                this.$toast.open({
                    message: "Unable to create trucker with empty details!",
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