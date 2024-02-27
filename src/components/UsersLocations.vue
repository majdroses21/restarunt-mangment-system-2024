<template>
    <div class="container">
        <div class="row" v-if="props.allLocations.length > 0">
            <caption>
                <span>
                    List Of locattions {{ props.allLocations.length }}
                </span> &nbsp;
                <span class="float-end">                   
                        <DeleteAll @reloadData="$emit('reloadData')" />
                </span>
            </caption>
            <div class="col-lg-4 col-md-6 col-sm-12 " v-for="loc in props.allLocations" :key="loc.id">
                <div class="card">
                    <div class="img-cont">
                        <img src="../assets/images/rest.webp">
                    </div>
                    <div class="card-body" style="margin-right:30px;">
                        <h4 class="card-title">{{ loc.name }}</h4>
                        <p class="card-title text-dark">{{ loc.addr }}</p>
                        <h6 class="card-title text-secondary">{{ loc.num }}</h6>
                        <input type="hidden" v-model="loc.id">

                        <!-- Button trigger modal *Delete* -->
                        <button type="button" class="btn btn-danger btn-action" data-bs-toggle="modal"
                        @click="toDelete = loc" id="btnDeleteModal"
                            data-bs-target="#deleteModal">
                            <font-awesome-icon :icon="['fas', 'trash-can']" />
                        </button>
                        
                        <!-- Button trigger modal *Update* -->
                        <button type="button" class="btn btn-success btn-action" data-bs-toggle="modal"
                        @click="toUpdate = loc" id="btnDeleteModal"
                            data-bs-target="#updateModal">
                            <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                        </button>

                        <DeleteModal :deleteLocation="toDelete" @reloadData="$emit('reloadData')"/>

                        <UpdateRest :updateRest="toUpdate" @reloadData="$emit('reloadData')"/>


                        <router-link :to="{ name: 'ViewMenu', params: { locationId: loc.id } }"
                            class="btn btn-action btn-menu">
                              <font-awesome-icon :icon="['fa', 'table-list']" />
                            </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class=" alert alert-warning" v-else> No Locations Yet !!!</div>
    </div>
</template>


<style scoped>
.card {
    /* width: 23rem; */
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px -1px #000;
}

.img-cont {
    width: 120px;
    padding: 0;
    /* height: 150px; */
}

.img-cont>img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    padding-left: 10PX;
    padding-right: 0;
}

.btn-action {
    border-radius: 50%;
    margin-right: 2px;
    margin-left: 2px;
}

.btn-menu,
.btn-menu:hover {
    background-color: var(--main-color);
}
@media (max-width: 490px) {
    .img-cont{
        margin-top: 75px;
    }   
}
</style>

<script setup>
import { RouterLink } from 'vue-router';
import { defineProps, ref ,watch} from "vue";
import DeleteModal from "@/components/locations/DeleteRestaruntModal.vue";
import DeleteAll from "@/components/locations/DeleteAllRestsModal.vue";
import UpdateRest from "@/components/locations/UpdateRestModal.vue";

const props = defineProps(["allLocations"]);

const toDelete = ref({});

const toUpdate = ref({});

const textToCofirm = "Delete Restaurant";



watch(
    () => toDelete.value, (newVal) => {
    console.log(newVal);
    // let userTextToCofirm = ref(document.getElementById('userConfirm'));
    let userTextToCofirm = ref('Delete Restaurant');
    const btnDelete = ref(document.getElementById('btnDelete'));
    console.log(btnDelete.value);
    
    if (textToCofirm == userTextToCofirm.value) {
        btnDelete.value.removeAttribute("disabled");
        console.log("Hello Delete!");

    }else{
        console.log("dissss");
    }
},{deep:true})

watch(
    () => toUpdate.value, (newVal) => {
    console.log(newVal);
},{deep:true})
</script>