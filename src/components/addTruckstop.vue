<template>
    <div id="add-truckstop">
        <section class="section">
            <div class="container">
                <h1 class="title is-1">
                    Add Truck Stop
                </h1>
                <h2 class="subtitle">
                    for {{chosenShipment.shipmentId}} transporting {{chosenShipment.type}}
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li><a href='/shipments/all'>Back to Shipments</a></li>
                        </ul>
                    </nav>
                </h2>
            </div>
        </section>
        <form>
            <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false"></b-loading>
            <div class="field">
                <label class="label">Shipment ID</label>
                <div class="control">
                    <input type="text" disabled v-model="this.shipmentID">
                </div>
            </div>
            <div class="field">
                <label class="label">Truck Stop Date / Time</label>
                <div class="control">
                    <input type="text" disabled v-model="truckstopValues.stopDateTime">
                </div>
            </div>
            <div class="field">
                <label class="label">Stop Duration (in minutes)</label>
                <div class="control">
                    <input type="text" v-model="truckstopValues.stopDurationInMinutes" :disabled="truckstopCreated">
                </div>
            </div>
            <div class="field">
                <label class="label">Latitude</label>
                <div class="control">
                    <input type="text" v-model="truckstopValues.latitude" :disabled="truckstopCreated">
                </div>
            </div>
            <div class="field">
                <label class="label">Longitude</label>
                <div class="control">
                    <input type="text" v-model="truckstopValues.longitude" :disabled="truckstopCreated">
                </div>
            </div>
            <button class="button is-primary" @click.prevent="addTruckstop" :disabled="truckstopCreated">
                Add Truck Stop
            </button>
        </form>
    </div>
</template>

<script>
const bc_api_url = "http://localhost:3000/api";
export default {
    data () {
        return {
            shipmentID: this.$route.params.shipmentID,
            chosenShipment: {},
            truckstopValues:{
                stopDateTime: new Date().toISOString(),
                forShipment: "resource:org.acme.shipping.perishable.Shipment#"+this.$route.params.shipmentID,
                stopDurationInMinutes: 0,
                latitude: "",
                longitude: "",
            },
            truckstopCreated: false,
            isLoading: false
        }
    },
    methods: {
        addTruckstop(){
            if(this.truckstopValues.latitude.length > 0 && this.truckstopValues.longitude.length > 0){
                this.isLoading = true;
                this.$http.post(bc_api_url + '/TruckStop',{
                    "$class": "org.acme.shipping.perishable.TruckStop",
                    "truckStopDateTime": this.truckstopValues.stopDateTime,
                    "stopDurationInMinutes": this.truckstopValues.stopDurationInMinutes,
                    "latitude": this.truckstopValues.latitude,
                    "longitude": this.truckstopValues.longitude,
                    "shipment": this.truckstopValues.forShipment,
                }).then(function(data){
                    console.log("$$$ this is the post data after adding a new truckstop:");
                    console.log(data.body);
                    this.truckstopCreated = true
                    this.isLoading = false;
                    this.$toast.open({
                        message: 'Successfully added a new truck stop!',
                        type: 'is-success'
                    });
                    setTimeout(()=>(window.location.href = window.location.origin + '/shipments/all'), 1000)
                });
                console.log("%%%% these are the truckstop values;");
                console.log(this.truckstopValues);
            }
            else{
                this.$toast.open({
                    message: "Unable to add truckstop with empty details!",
                    type: 'is-danger'
                })
            }
        }
    },
    created(){
        this.$http.get(bc_api_url + '/Shipment/'+this.shipmentID).then(function(data){
            console.log("$$$ this is the get data for specific shipment:");
            //console.log(data.body);
            //this.shipperOptions = data.body.slice(0,10);
            this.chosenShipment = data.body;
            console.log(this.chosenShipment);
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