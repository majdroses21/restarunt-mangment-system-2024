<template>
    <div class="container">
        <div class="row" v-if="props.allLocations.length > 0">
            <caption>
                <span>
                    List Of locattions {{ props.allLocations.length }}
                </span> &nbsp;
                <span>
                    <RouterLink class="btn btn-danger" to="/deleteAll">Delete All</RouterLink>
                </span>
            </caption>
            <div class="col-lg-4 col-md-6 col-sm-12 " v-for="loc in props.allLocations" :key="loc.id">
                <div class="card">
                    <div class="img-cont">
                        <img src="../assets/images/rest.webp">
                    </div>
                    <div class="card-body" style="margin-right:30px;">
                        <h4 class="card-title">{{ loc.name }}</h4>
                        <p class="card-texst">{{ loc.addr }}</p>
                        <h6 class="card-title">{{ loc.num }}</h6>
                        <input type="hidden" v-model="loc.id">

                        <router-link :to="{ name: 'DeletePage', params: { locationId: loc.id } }"
                            class="btn btn-danger btn-action"><font-awesome-icon
                                :icon="['far', 'trash-can']" /></router-link>

                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-danger btn-action" data-bs-toggle="modal"
                        @click="toDelete = loc"
                            data-bs-target="#deleteModal">
                            <font-awesome-icon :icon="['fas', 'trash-can']" />
                        </button>

                        <DeleteModal :deleteLocation="toDelete" @reloadData="$emit('reloadData')"/>

                        <router-link :to="{ name: 'UpdateLocation', params: { locationId: loc.id } }"
                            class="btn btn-success btn-action"><font-awesome-icon
                                :icon="['fas', 'pen-to-square']" /></router-link>
                        <router-link :to="{ name: 'ViewMenu', params: { locationId: loc.id } }"
                            class="btn btn-action btn-menu"> <span class="show-hover-name"></span> <font-awesome-icon
                                :icon="['fa', 'table-list']" /></router-link>
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
</style>

<script setup>
import { RouterLink } from 'vue-router';
import { defineProps, ref ,watch} from "vue";
import DeleteModal from "@/components/locations/DeleteRestaruntModal.vue";

const props = defineProps(["allLocations"]);

const toDelete = ref({});

watch(() => toDelete.value, (newVal) => {
    console.log(newVal);
},{deep:true})
</script>