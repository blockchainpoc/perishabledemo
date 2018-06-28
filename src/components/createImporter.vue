<template>
    <div id="create-importer">
        <section class="section">
            <div class="container">
                <h1 class="title is-1">
                    Create New Importer
                </h1>
                <h2 class="subtitle">
                    (org.acme.shipping.perishable.Importer)
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li><a href='/importers/all'>List All</a></li>
                            <li><a href='/importers/create'>Create</a></li>
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
                    <input class="input" type="text" placeholder="Email address" v-model.lazy="importer.email" :disabled="importerCreated">
                </div>
            </div>
            <div class="field">
                <label class="label">Country</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Country" v-model.lazy="importer.country" :disabled="importerCreated">
                </div>
            </div>
            <button class="button is-primary" @click.prevent="createImporter" :disabled="importerCreated">
                Create Importer
            </button>
        </form>
    </div>
</template>

<script>
const bc_api_url = "http://54.92.218.210:3000/api";
export default {
    data () {
        return {
            importer:{
                email: "",
                country: "",
                accountBalance: 0
            },
           importerCreated: false,
           isLoading: false
        }
    },
    methods: {
        createImporter(){
            if(this.importer.email.length > 0 && this.importer.country.length > 0){
                this.isLoading = true;
                this.$http.post(bc_api_url + '/Importer',{
                    "$class": "org.acme.shipping.perishable.Importer",
                    "email": this.importer.email,
                    "address": {
                        "$class": "org.acme.shipping.perishable.Address",
                        "country": this.importer.country,
                    },
                    "accountBalance": this.importer.accountBalance
                }).then(function(data){
                    console.log("$$$ this is the post data:");
                    console.log(data.body);
                    this.importerCreated = true
                    this.isLoading = false;
                    this.$toast.open({
                            message: 'Successfully created new importer!',
                            type: 'is-success'
                        });
                    setTimeout(()=>(window.location.href = window.location.origin + '/importers/all'), 1000)
                });
            }
            else{
                console.log('email is empty');
                this.$toast.open({
                    message: "Unable to create importer with empty details!",
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