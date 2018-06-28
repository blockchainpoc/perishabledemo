<template>
    <div id="show-contracts">
        <section class="section">
            <div class="container">
                <h1 class="title is-1">
                    All Contracts
                </h1>
                <h2 class="subtitle">
                    (org.acme.shipping.perishable.Contract)
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li><a href='/contracts/all'>List All</a></li>
                            <li><a href='/contracts/create'>Create</a></li>
                        </ul>
                    </nav>
                </h2>
            </div>
        </section>
        <table class="table">
            <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false"></b-loading>
            <thead>
                <tr>
                    <th>ContractID</th>
                    <th>Grower</th>
                    <th>Shipper</th>
                    <th>Importer</th>
                    <th>Arrival - Date Time</th>
                    <th>Unit Price</th>
                    <th>Min Temperature</th>
                    <th>Max Temperature</th>
                    <th>Min Penalty Factor</th>
                    <th>Max Penalty Factor</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="contract in contracts">
                    <td>{{contract.contractId}}</td>
                    <td>{{contract.grower | remove_grower_class}}</td>
                    <td>{{contract.shipper | remove_shipper_class}}</td>
                    <td>{{contract.importer | remove_importer_class}}</td>
                    <td>{{contract.arrivalDateTime}}</td>
                    <td>{{contract.unitPrice}}</td>
                    <td>{{contract.minTemperature}}</td>
                    <td>{{contract.maxTemperature}}</td>
                    <td>{{contract.minPenaltyFactor}}</td>
                    <td>{{contract.maxPenaltyFactor}}</td>
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
           contracts: [],
           isLoading: false,
        }
    },
    methods: {
    },
    created(){
        this.isLoading = true;
        this.$http.get(bc_api_url + '/Contract').then(function(data){
            console.log("$$$ this is the post data:");
            console.log(data.body);
            this.contracts = data.body.slice(0,10);
            this.isLoading = false;
        })
    }
}
</script>

<style>
</style>