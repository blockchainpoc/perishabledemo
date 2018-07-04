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
            <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false"></b-loading>
            <div class="field">
                <label class="label">Select Farmer</label>
                <div class="select">
                    <select v-model="contractValues.selectedFarmer" :disabled="contractCreated">
                        <option v-for="farmer in farmerOptions" v-bind:value="farmer.email">
                            {{ farmer.email }} from {{ farmer.address.country}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="field">
                <label class="label">Select Receiver</label>
                <div class="select">
                    <select v-model="contractValues.selectedReceiver" :disabled="contractCreated">
                        <option v-for="receiver in receiverOptions" v-bind:value="receiver.email">
                            {{ receiver.email }} from {{ receiver.address.country}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="field">
                <label class="label">Select Trucker</label>
                <div class="select">
                    <select v-model="contractValues.selectedTrucker" :disabled="contractCreated">
                        <option v-for="trucker in truckerOptions" v-bind:value="trucker.email">
                            {{ trucker.email }} from {{ trucker.address.country}}
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
                    <input type="text" v-model="contractValues.setUnitPrice" :disabled="contractCreated">
                </div>
            </div>
            <!--<div class="field">
                <label class="label">Country</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Country" v-model.lazy="trucker.country">
                </div>
            </div>-->
            <button class="button is-primary" @click.prevent="createContract" :disabled="contractCreated">
                Create Contract
            </button>
        </form>
    </div>
</template>

<script>
const bc_api_url = "http://localhost:3000/api";
export default {
    data () {
        return {
            farmerOptions: [],
            receiverOptions: [],
            truckerOptions: [],
            contractValues:{
                newContractID: "",
                selectedFarmer: {},
                selectedReceiver: {},
                selectedTrucker: {},
                setUnitPrice: 0,
                dueDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
                minTemperature: 2,
                maxTemperature: 10,
                minPenaltyFactor: 0.2,
                maxPenaltyFactor: 0.1
            },
            contractCreated: false,
            isLoading: false
        }
    },
    methods: {
        createContract(){
            if(this.contractValues.selectedFarmer.length > 0 && this.contractValues.selectedTrucker.length > 0 && this.contractValues.selectedReceiver.length > 0 && parseFloat(this.contractValues.setUnitPrice) > 0){
                this.isLoading = true;
                this.$http.post(bc_api_url + '/Contract',{
                    "$class": "org.acme.shipping.perishable.Contract",
                    "contractId": this.contractValues.newContractID,
                    "farmer": "resource:org.acme.shipping.perishable.Farmer#" + this.contractValues.selectedFarmer,
                    "trucker": "resource:org.acme.shipping.perishable.Trucker#" + this.contractValues.selectedTrucker,
                    "receiver": "resource:org.acme.shipping.perishable.Receiver#" + this.contractValues.selectedReceiver,
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
                    this.isLoading = false;
                    this.$toast.open({
                        message: 'Successfully created new contract!',
                        type: 'is-success'
                    });
                    setTimeout(()=>(window.location.href = window.location.origin + '/contracts/all'), 1000)
                });
                console.log("5##### this is the contract values:");
                console.log(this.contractValues);
            }
            else{
                this.$toast.open({
                    message: "Unable to create contract with empty details!",
                    type: 'is-danger'
                })
            }
        }
    },
    created(){
        this.$http.get(bc_api_url + '/Farmer').then(function(data){
            /*console.log("$$$ this is the post data:");
            console.log(data.body);*/
            this.farmerOptions = data.body.slice(0,10);
        });
        this.$http.get(bc_api_url + '/Receiver').then(function(data){
            /*console.log("$$$ this is the post data:");
            console.log(data.body);*/
            this.receiverOptions = data.body.slice(0,10);
        });
        this.$http.get(bc_api_url + '/Trucker').then(function(data){
            /*console.log("$$$ this is the post data:");
            console.log(data.body);*/
            this.truckerOptions = data.body.slice(0,10);
        });
        this.$http.get(bc_api_url + '/Contract').then(function(data){
            console.log("$$$ this is the get data for contracts:");
            //console.log(data.body);
            //this.truckerOptions = data.body.slice(0,10);
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