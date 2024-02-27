import { createApp } from 'vue';
import router from './router';
import storeModule from './store';

// BootstrapVue3
// import {BootstrapVue3 , IconsPlugin } from 'bootstrap-vue-3'
import {BootstrapVue3 } from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App.vue';

// Font Awesome
import {  FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas , far , fab);

// Create App
const app = createApp(App);
//Bootstrap-vue Component Imports
app.use(BootstrapVue3);
// app.use(IconsPlugin);


// Use Font Awesome
app.component("font-awesome-icon", FontAwesomeIcon);

// Use Router
app.use(router);

// Use Store Module
app.use(storeModule);

// Mount the app
app.mount('#app');

//Bootstrap-vue Component Imports