import showGrowers from './components/showGrowers.vue';
import createGrower from './components/createGrower.vue';
import showImporters from './components/showImporters.vue';
import createImporter from './components/createImporter.vue';
import showShippers from './components/showShippers.vue';
import createShipper from './components/createShipper.vue';
import landing from './components/Landing.vue';

export default [
    {path: "/growers/all", component: showGrowers},
    {path: "/growers/create", component: createGrower},
    {path: "/importers/all", component: showImporters},
    {path: "/importers/create", component: createImporter},
    {path: "/shippers/all", component: showShippers},
    {path: "/shippers/create", component: createShipper},
    {path: "/", component: landing}
]