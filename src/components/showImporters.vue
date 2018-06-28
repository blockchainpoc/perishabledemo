<template>
    <div id="show-importers">
        <section class="section">
            <div class="container">
                <h1 class="title is-1">
                    All Importers
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
                <tr v-for="importer in importers">
                    <td>{{importer.email}}</td>
                    <td>{{importer.address['country']}}</td>
                    <td>{{importer.accountBalance}}</td>
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
           importers: [],
           isLoading: false,
        }
    },
    methods: {
    },
    created(){
        this.isLoading = true;
        this.$http.get(bc_api_url + '/Importer').then(function(data){
            console.log("$$$ this is the post data:");
            console.log(data.body);
            this.importers = data.body.slice(0,10);
            this.isLoading = false;
        })
    }
}
</script>

<style>
table.table{
    margin: 20px auto;
}
</style>