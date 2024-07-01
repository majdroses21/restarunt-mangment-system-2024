<template>
    <b-tabs content-class="mt-3" align="center" v-if="store.state.listOfCategorys.length > 0">
        <!-- This loop on All Categories -->
        <b-tab :title="'All'">
            <div class="container mt-3" align="center">
                <div class="row">
                    <div class="col-lg-3 col-md-6 col-sm-12 mt-1 mb-1" v-for="(itm, i) in store.state.listOfItems" :key="i">
                        <div class="card" style="width: 17.9rem;">
                            <img src="../../assets/images/download.png" class="card-img-top img-maeal" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">{{ itm.name }}</h5>
                                <p class="card-text">{{ itm.description }} </p>
                            </div>

                            <div class="card-body">
                                <span class="float-start">Quantaty: <b>{{ itm.qey }}</b></span>
                                <span class="float-end ">price: <b>{{ itm.price }} $</b></span>
                            </div>
                            <div class="card-body">
                                <!-- Update Button Modal -->
                                <button type="button" class="btn btn-outline-success m-1" data-bs-toggle="modal"
                                    @click="toUpdate = itm" data-bs-target="#updateItemModal">
                                    <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                                </button>



                                <!-- Delete Button Modal -->
                                <button type="button" class="btn btn-outline-danger m-1" data-bs-toggle="modal"
                                    @click="toUpdate = itm" data-bs-target="#deleteItemModal">
                                    <font-awesome-icon :icon="['fas', 'x']" />
                                </button>


                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </b-tab>

        <!-- This Loop on the categories -->
        <b-tab :title="cat.name" v-for="(cat, c) in store.state.listOfCategorys" :key="c">
            <div class="container mt-3" align="center">
                <div class="row">
                    <div class="col-lg-3 col-md-6 col-sm-12 mt-1 mb-1" v-for="(itm, i) in store.state.listOfItems" :key="i"
                        v-show="cat.id == itm.catygoriID">
                        <div class="card" style="width: 17.9rem;">
                            <img src="../../assets/images/download.png" class="card-img-top img-maeal" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">{{ itm.name }}</h5>
                                <p class="card-text">{{ itm.description }} </p>
                            </div>

                            <div class="card-body">
                                <span class="float-start">Quantaty: <b>{{ itm.qey }}</b></span>
                                <span class="float-end ">price: <b>{{ itm.price }} $</b></span>
                            </div>
                            <div class="card-body">
                                <!-- Update Button Modal -->
                                <button type="button" class="btn btn-outline-success m-1" data-bs-toggle="modal"
                                    @click="toUpdate = itm" data-bs-target="#updateItemModal">
                                    <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                                </button>



                                <!-- Delete Button Modal -->
                                <button type="button" class="btn btn-outline-danger m-1" data-bs-toggle="modal"
                                    @click="toUpdate = itm" data-bs-target="#deleteItemModal">
                                    <font-awesome-icon :icon="['fas', 'x']" />
                                </button>


                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </b-tab>
        <b-tab :title="'Show All categories'">
            <ViewCaty />
        </b-tab>
    </b-tabs>
    <div v-else>
        <h1>You dont have any Meal </h1>
        <h2>Creat a Catygory to Add meals to here</h2>
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addCatyModal">
            <font-awesome-icon :icon="['fas', 'plus']" /> Add Catygory
        </button>


        <addCaty :locId="locationId" />

    </div>
    <AddItem v-if="store.state.listOfCategorys.length > 0" />
    <DeleteItem :deleteItem="toUpdate" />
    <UpdateItem :updateItem="toUpdate" />
</template>
  
<script setup>
// Import 
import { ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import UpdateItem from "@/components/Menus/UpdateItemModal.vue";
import AddItem from "@/components/Menus/AddItemModal.vue";
import DeleteItem from "@/components/Menus/DeleteItemModal.vue";
import addCaty from '@/components/catygoryies/AddNewCatygoryModal.vue';
import ViewCaty from '@/components/catygoryies/ViewCaty.vue'
let store = useStore();
let route = useRoute();
//Data
let locationId = ref('');
onMounted(async () => {
    // console.log("stor is", store);
    store.commit('getUserId');

    locationId.value = route.params.locationId;

    // console.log(route.params);
    let usID = JSON.parse(localStorage.getItem("user-info")).id;
    store.dispatch('doDisplayAllCategorys', { userId: usID, locId: locationId.value });

    store.dispatch('doCanUserAccessThisLocation', { locationIdIs: locationId.value });

    store.dispatch('displayAllItems', { locidIs: locationId.value });
})
//watch
const toUpdate = ref({});
watch(
    () => toUpdate.value, (newValue) => {
        console.log(newValue);
    }, { deep: true }
)
</script>  

<style >
@import "../../assets/css/forms.css";
@media (max-width: 490px) {
    .img-maeal {
        margin-top: 52px;
        z-index: 0;
    }
    .card-text {
        color: #000;
    }
}
</style>