<template>
    <div id="create-contract">
        <section class="section">
            <div class="container">
                <h1 class="title is-1">
                    Create New Contract
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
        <form>
            <div class="field">
                <label class="label">Select Grower</label>
                <div class="select">
                    <select v-model="contractValues.selectedGrower">
                        <option v-for="grower in growerOptions" v-bind:value="grower.email">
                            {{ grower.email }} from {{ grower.address.country}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="field">
                <label class="label">Select Importer</label>
                <div class="select">
                    <select v-model="contractValues.selectedImporter">
                        <option v-for="importer in importerOptions" v-bind:value="importer.email">
                            {{ importer.email }} from {{ importer.address.country}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="field">
                <label class="label">Select Shipper</label>
                <div class="select">
                    <select v-model="contractValues.selectedShipper">
                        <option v-for="shipper in shipperOptions" v-bind:value="shipper.email">
                            {{ shipper.email }} from {{ shipper.address.country}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="field">
                <label class="label">Delivery Due Date (Today + 1 day)</label>
                <div class="control">
                    <input type="text" disabled v-model="contractValues.dueDate">
                </div>
            </div>
            <div class="field">
                <label class="label">Unit Price of Goods Being Shipped</label>
                <div class="control">
                    <input type="text" v-model="contractValues.setUnitPrice">
                </div>
            </div>
            <!--<div class="field">
                <label class="label">Country</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Country" v-model.lazy="shipper.country">
                </div>
            </div>-->
            <button class="button is-primary" @click.prevent="createContract">
                Create Contract
            </button>
        </form>
    </div>
</template>

<script>
const bc_api_url = "http://54.92.218.210:3000/api";
export default {
    data () {
        return {
            growerOptions: [],
            importerOptions: [],
            shipperOptions: [],
            contractValues:{
                newContractID: "",
                selectedGrower: {},
                selectedImporter: {},
                selectedShipper: {},
                setUnitPrice: 0,
                dueDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
                minTemperature: 2,
                maxTemperature: 10,
                minPenaltyFactor: 0.2,
                maxPenaltyFactor: 0.1
            },
            contractCreated: false,
        }
    },
    methods: {
        createContract(){
            this.$http.post(bc_api_url + '/Contract',{
                "$class": "org.acme.shipping.perishable.Contract",
                "contractId": this.contractValues.newContractID,
                "grower": "resource:org.acme.shipping.perishable.Grower#" + this.contractValues.selectedGrower,
                "shipper": "resource:org.acme.shipping.perishable.Shipper#" + this.contractValues.selectedShipper,
                "importer": "resource:org.acme.shipping.perishable.Importer#" + this.contractValues.selectedImporter,
                "arrivalDateTime": this.contractValues.dueDate,
                "unitPrice": parseFloat(this.contractValues.setUnitPrice),
                "minTemperature": this.contractValues.minTemperature,
                "maxTemperature": this.contractValues.maxTemperature,
                "minPenaltyFactor": this.contractValues.minPenaltyFactor,
                "maxPenaltyFactor": this.contractValues.maxPenaltyFactor
            }).then(function(data){
                console.log("$$$ this is the post data:");
                console.log(data.body);
                this.contractCreated = true;
                window.location.href = window.location.origin + '/contracts/all';
            });
            console.log("5##### this is the contract values:");
            console.log(this.contractValues);
        }
    },
    created(){
        this.$http.get(bc_api_url + '/Grower').then(function(data){
            /*console.log("$$$ this is the post data:");
            console.log(data.body);*/
            this.growerOptions = data.body.slice(0,10);
        });
        this.$http.get(bc_api_url + '/Importer').then(function(data){
            /*console.log("$$$ this is the post data:");
            console.log(data.body);*/
            this.importerOptions = data.body.slice(0,10);
        });
        this.$http.get(bc_api_url + '/Shipper').then(function(data){
            /*console.log("$$$ this is the post data:");
            console.log(data.body);*/
            this.shipperOptions = data.body.slice(0,10);
        });
        this.$http.get(bc_api_url + '/Contract').then(function(data){
            console.log("$$$ this is the get data for contracts:");
            //console.log(data.body);
            //this.shipperOptions = data.body.slice(0,10);
            let allContracts = data.body;
            if(allContracts.length > 0){
                let lastContract = allContracts[allContracts.length-1];
                console.log(lastContract)
                let lastContractId = parseInt(lastContract.contractId.split("CON_")[1]);
                lastContractId += 1;
                this.contractValues.newContractID = "CON_" + lastContractId.toString().padStart(3,"0");
            }
            else{
                console.log('No contracts created yet.');
                this.contractValues.newContractID = "CON_001";
            }
        });
    }
}
</script>

<style>
form{
    margin: 20px auto;
    width: 600px;
}

</style>