<template>
    <div id="show-receivers">
        <section class="section">
            <div class="container">
                <h1 class="title is-1">
                    All Receivers
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
                <tr v-for="receiver in receivers">
                    <td>{{receiver.email}}</td>
                    <td>{{receiver.address['country']}}</td>
                    <td>{{receiver.accountBalance}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
const bc_api_url = "http://104.196.163.139:3000/api/";
export default {
    data () {
        return {
           receivers: [],
           isLoading: false,
        }
    },
    methods: {
    },
    created(){
        this.isLoading = true;
        this.$http.get(bc_api_url + '/Receiver').then(function(data){
            console.log("$$$ this is the post data:");
            console.log(data.body);
            this.receivers = data.body.slice(0,10);
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