<template>
    <div id="create-shipment">
        <section class="section">
            <div class="container">
                <h1 class="title is-1">
                    Create New Shipment
                </h1>
                <h2 class="subtitle">
                    (org.acme.shipping.perishable.Shipment)
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li><a href='/shipments/all'>List All</a></li>
                            <li><a href='/shipments/create'>Create</a></li>
                        </ul>
                    </nav>
                </h2>
            </div>
        </section>
        <form>
            <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false"></b-loading>
            <div class="field">
                <label class="label">Select Shipment Type</label>
                <div class="select">
                    <select v-model="shipmentValues.type" :disabled="shipmentCreated">
                        <option v-for="type in shipmentTypeOptions">
                            {{ type }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="field">
                <label class="label">Select Shipment Status</label>
                <div class="select">
                    <select v-model="shipmentValues.status" :disabled="shipmentCreated">
                        <option v-for="status in shipmentStatusOptions">
                            {{ status }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="field">
                <label class="label">Unit Count</label>
                <div class="control">
                    <input type="text" v-model="shipmentValues.unitCount" :disabled="shipmentCreated">
                </div>
            </div>
            <div class="field">
                <label class="label">Attached Contract</label>
                <div class="select">
                    <select v-model="shipmentValues.linkedContractID" :disabled="shipmentCreated">
                        <option v-for="contract in availableContracts">
                            {{ contract.contractId }}
                        </option>
                    </select>
                </div>
            </div>
            <button class="button is-primary" @click.prevent="createShipment" :disabled="shipmentCreated">
                Create Shipment
            </button>
        </form>
    </div>
</template>

<script>
const bc_api_url = "http://localhost:3000/api";
export default {
    data () {
        return {
            shipmentValues:{
                type: "",
                status: "",
                unitCount: 0,
                linkedContractID: {},
                newShipmentID: ""
            },
            shipmentCreated: false,
            shipmentTypeOptions: ["TOMATOES","BANANAS","APPLES","PEARS","TEA","COFFEE"],
            shipmentStatusOptions: ["CREATED", "IN_TRANSIT"],
            availableContracts: [],
            isLoading: false
        }
    },
    methods: {
        createShipment(){
            if(this.shipmentValues.type.length > 0 && this.shipmentValues.status.length > 0 && this.shipmentValues.unitCount > 0 && this.shipmentValues.linkedContractID.length > 0){
                this.isLoading = true;
                this.$http.post(bc_api_url + '/Shipment',{
                    "$class": "org.acme.shipping.perishable.Shipment",
                    "shipmentId": this.shipmentValues.newShipmentID,
                    "type": this.shipmentValues.type,
                    "status": this.shipmentValues.status,
                    "unitCount": this.shipmentValues.unitCount,
                    "contract": "resource:org.acme.shipping.perishable.Contract#" + this.shipmentValues.linkedContractID
                }).then(function(data){
                    console.log("$$$ this is the post data after creating shipment:");
                    console.log(data.body);
                    this.shipmentCreated = true
                    this.isLoading = false;
                    this.$toast.open({
                        message: 'Successfully created new shipment!',
                        type: 'is-success'
                    });
                    setTimeout(()=>(window.location.href = window.location.origin + '/shipments/all'), 1000)
                });
                console.log("%%%% these are the shipment values;");
                console.log(this.shipmentValues);
            }
            else{
                this.$toast.open({
                    message: "Unable to create shipment with empty details!",
                    type: 'is-danger'
                })
            }
        }
    },
    created(){
        this.$http.get(bc_api_url + '/Contract').then(function(data){
            this.availableContracts = data.body;
            console.log("these are the available contracts:");
            console.log(this.availableContracts);
        });
        this.$http.get(bc_api_url + '/Shipment').then(function(data){
            console.log("$$$ this is the get data for shipments:");
            //console.log(data.body);
            //this.shipperOptions = data.body.slice(0,10);
            let allShipments = data.body;
            if(allShipments.length > 0){
                let lastShipment = allShipments[allShipments.length-1];
                console.log(lastShipment)
                let lastShipmentId = parseInt(lastShipment.shipmentId.split("SHIP_")[1]);
                lastShipmentId += 1;
                this.shipmentValues.newShipmentID = "SHIP_" + lastShipmentId.toString().padStart(3,"0");
            }
            else{
                console.log('No contracts created yet.');
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