<template>
    <div id="show-shipments">
        <section class="section">
            <div class="container">
                <h1 class="title is-1">
                    All Shipments
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
        <table class="table">
            <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false"></b-loading>
            <thead>
                <tr>
                    <th>ShipmentID</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>UnitCount</th>
                    <th>Contract</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="shipment in shipments">
                    <td>{{shipment.shipmentId}}</td>
                    <td>{{shipment.type}}</td>
                    <td>{{shipment.status}}</td>
                    <td>{{shipment.unitCount}}</td>
                    <td>{{shipment.contract}}</td>
                    <td v-if="shipment.status == 'IN_TRANSIT' || shipment.status == 'CREATED'">
                        <button @click="markShipmentReceived(shipment)" class="button is-info">
                            <span class="icon is-small">
                                <i class="fas fa-clipboard-check"></i>
                            </span>
                            <span>Mark Shipment Received</span>
                        </button>
                        <br>
                        <button @click="addTruckstop(shipment)" class="button is-warning">
                            <span class="icon is-small">
                                <i class="fas fa-truck"></i>
                            </span>
                            <span>Add Truck Stop</span>
                        </button>
                    </td>
                    <td v-else-if="shipment.status == 'ARRIVED'">
                        <span class="tag is-success">Shipment Received</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
const bc_api_url = "http://localhost:3000/api/";
export default {
    data () {
        return {
           shipments: [],
           isLoading: false
        }
    },
    methods: {
        markShipmentReceived(shp){
            //alert("going to mark this shipment received")
            console.log(shp);
            this.isLoading = true;
            this.$http.post(bc_api_url + '/ShipmentReceived',{
                "$class": "org.acme.shipping.perishable.ShipmentReceived",
                "shipment": shp.shipmentId
            }).then(function(data){
                console.log("$$$ successfully marked shipment as received:");
                console.log(data.body);
                this.growerCreated = true;
                this.isLoading = false;
            });
        },
        addTruckstop(shp){
            console.log('clicked add truck stop button for this shipment:');
            console.log(shp);
            window.location.href = window.location.origin + "/shipments/"+shp.shipmentId+"/add/truckstop";
        }
    },
    created(){
        this.isLoading = true;
        this.$http.get(bc_api_url + '/Shipment').then(function(data){
            console.log("$$$ this is the post data:");
            console.log(data.body);
            this.shipments = data.body.slice(0,10);
            this.isLoading = false;
        })
    }
}
</script>

<style>
</style>