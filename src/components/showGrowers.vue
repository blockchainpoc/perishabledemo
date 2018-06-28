<template>
    <div id="show-growers">
        <section class="section">
            <div class="container">
                <h1 class="title is-1">
                    All Growers
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
        <table class="table">
            <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false"></b-loading>
            <thead>
                <tr>
                    <th>Email</th>
                    <th>Address / Country</th>
                    <th>Account Balances</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="grower in growers">
                    <td>{{grower.email}}</td>
                    <td>{{grower.address['country']}}</td>
                    <td>{{grower.accountBalance}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
const bc_api_url = "http://54.92.218.210:3000/api/";
export default {
    data () {
        return {
           growers: [],
           isLoading: false,
        }
    },
    methods: {
    },
    created(){
        this.isLoading = true
        this.$http.get(bc_api_url + '/Grower').then(function(data){
            console.log("$$$ this is the post data:");
            console.log(data.body);
            this.growers = data.body.slice(0,10);
            this.isLoading = false;
        })
    }
}
</script>

<style>
</style>