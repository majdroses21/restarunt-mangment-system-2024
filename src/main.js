import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
// import { createStore } from 'vuex';
import storeModule from './store';


import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

//importing Font Awesome 

import {  FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';

import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas , far , fab);

createApp(App).use(storeModule).component("font-awesome-icon", FontAwesomeIcon)
.use(router).mount('#app')
