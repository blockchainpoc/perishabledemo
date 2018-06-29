import showFarmers from './components/showFarmers.vue';
import createFarmer from './components/createFarmer.vue';
import showReceivers from './components/showReceivers.vue';
import createReceiver from './components/createReceiver.vue';
import showTruckers from './components/showTruckers.vue';
import createTrucker from './components/createTrucker.vue';
import showShipments from './components/showShipments.vue';
import showContracts from './components/showContracts.vue';
import createContract from './components/createContract.vue';
import createShipment from './components/createShipment.vue';
import landing from './components/Landing.vue';

export default [
    {path: "/farmers/all", component: showFarmers},
    {path: "/farmers/create", component: createFarmer},
    {path: "/receivers/all", component: showReceivers},
    {path: "/receivers/create", component: createReceiver},
    {path: "/truckers/all", component: showTruckers},
    {path: "/truckers/create", component: createTrucker},
    {path: "/shipments/all", component: showShipments},
    {path: "/contracts/all", component: showContracts},
    {path: "/contracts/create", component: createContract},
    {path: "/shipments/create", component: createShipment},
    {path: "/", component: landing}
]