<template>
    <div id="create-receiver">
        <section class="section">
            <div class="container">
                <h1 class="title is-1">
                    Create New Receiver
                </h1>
                <h2 class="subtitle">
                    (org.acme.shipping.perishable.Receiver)
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li><a href='/receivers/all'>List All</a></li>
                            <li><a href='/receivers/create'>Create</a></li>
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
                    <input class="input" type="text" placeholder="Email address" v-model.lazy="receiver.email" :disabled="receiverCreated">
                </div>
            </div>
            <div class="field">
                <label class="label">Country</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Country" v-model.lazy="receiver.country" :disabled="receiverCreated">
                </div>
            </div>
            <button class="button is-primary" @click.prevent="createReceiver" :disabled="receiverCreated">
                Create Receiver
            </button>
        </form>
    </div>
</template>

<script>
const bc_api_url = "http://54.92.218.210:3000/api";
export default {
    data () {
        return {
            receiver:{
                email: "",
                country: "",
                accountBalance: 0
            },
           receiverCreated: false,
           isLoading: false
        }
    },
    methods: {
        createReceiver(){
            if(this.receiver.email.length > 0 && this.receiver.country.length > 0){
                this.isLoading = true;
                this.$http.post(bc_api_url + '/Receiver',{
                    "$class": "org.acme.shipping.perishable.Receiver",
                    "email": this.receiver.email,
                    "address": {
                        "$class": "org.acme.shipping.perishable.Address",
                        "country": this.receiver.country,
                    },
                    "accountBalance": this.receiver.accountBalance
                }).then(function(data){
                    console.log("$$$ this is the post data:");
                    console.log(data.body);
                    this.receiverCreated = true
                    this.isLoading = false;
                    this.$toast.open({
                            message: 'Successfully created new receiver!',
                            type: 'is-success'
                        });
                    setTimeout(()=>(window.location.href = window.location.origin + '/receivers/all'), 1000)
                });
            }
            else{
                console.log('email is empty');
                this.$toast.open({
                    message: "Unable to create receiver with empty details!",
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