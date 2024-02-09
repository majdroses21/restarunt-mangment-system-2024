<template>
    <div class="container " v-if="locationId">
        <br>
        <!-- Navigation links -->
        <RouterLink :to="{ name: 'ViewCaty', params: { locationId: locationId } }" class="btn btn-primary float-start">
            <font-awesome-icon :icon="['fas', 'plus']" /> View Categories
        </RouterLink>
        <RouterLink :to="{ name: 'AddItem', params: { locationId: locationId } }" class="btn btn-primary float-end"
            v-if="store.state.numOfCategorys > 0">
            Add New item <font-awesome-icon :icon="['fas', 'plus']" />
        </RouterLink>
    </div>

    <div class="text-center">
        <h1>
            {{ store.state.locName }}
        </h1>
        <p class="text-muted"> {{ store.state.locAdrr }} </p>
    </div>
    <!-- Start Menu Loop Classic -->
    <div class="clearfix">
        <div class="each-caty container">
            <div class="" v-for="(cat, c) in store.state.listOfCategorys" :key="c">
                <div class="row col-12 ">
                    <h3 class="bg-dark text-light"> {{ cat.name }} </h3>
                </div>
                <div class="row" v-if="locationId">
                    <div class="ech-item col-4" v-for="(itm, i) in store.state.listOfItems" :key="i"
                        v-show="cat.id == itm.catygoriID">
                        <div v-if="cat.id == itm.catygoriID" class="">
                            <h4 class="text-danger"> {{ itm.name }} </h4>
                            <p class="item-desc" style="height: 144px;"> {{ itm.description }} </p>
                            <div>
                                <span class="item-price float-end">Available Qty: &nbsp;{{ itm.qey }}</span>
                                <span class="item-price float-start">Price: <span class="text-warning fw-bold fw-bolder">{{
                                    itm.price }} $</span></span>
                                <br>
                            </div>
                            <div>
                                <hr>
                                <span class="item-price float-start">
                                    <RouterLink
                                        :to="{ name: 'UpdateItem', params: { itemId: itm.id, locationId: locationId } }"
                                        class="btn btn-success">Update {{ locationId }}
                                    </RouterLink>
                                </span>
                                <span class="item-price float-end">
                                    <RouterLink
                                        :to="{ name: 'DeleteItem', params: { itemId: itm.id, locationId: locationId } }"
                                        class="btn btn-danger">Delete
                                    </RouterLink>
                                </span>
                            </div>
                            <br>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>
                <br>
            </div>
        </div>
    </div>
</template>

<script setup>
//Imnpor
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
let store = useStore();
import { useRoute } from "vue-router";
let route = useRoute();
//Data
console.log(store.state.loggedInUserId);
// let userId = ref(store.state.loggedInUserId);
let locationId = ref('');
// let getData = computed(()=>{
//     console.log(store.state.listOfCategorys , "hheelloo");
//     return store.state.listOfCategorys
// })
// Mounted
onMounted(async () => {
    console.log("stor is", store);
    store.commit('isLoggedInUser');

    locationId.value = route.params.locationId;

    console.log(route.params);
    let usID = JSON.parse(localStorage.getItem("user-info")).id;
    store.commit('displayAllCategorys', { userId: usID, locId: locationId.value });

    store.commit('canUserAccessThisLocation', { locationIdIs: locationId.value });

    store.commit('getLocationInfo', { locidIs: locationId.value });

    store.commit('displayAllItems', { locidIs: locationId.value });
})
</script>

