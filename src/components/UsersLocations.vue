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
                <div>
                    <b-card no-body class="overflow-hidden mb-2 me-1 ms-1" style="max-width: 560px; ">
                        <b-row no-gutters>
                            <b-col md="6" class="img-cont">
                                <b-card-img src="img/rest.webp" alt="Image" class="rounded-0"></b-card-img>
                            </b-col>
                            <b-col md="6">
                                <b-card-body :title="loc.name">
                                    <b-card-text>
                                        <p class="card-title text-dark">{{ loc.addr }}</p>
                                        <h6 class="card-title text-secondary">{{ loc.num }}</h6>
                                        <input type="hidden" v-model="loc.id">
                                        <div class="actions-parent">
                                            <!-- Button trigger modal *Delete* -->
                                            <button type="button" class="btn btn-danger btn-action"
                                                data-bs-toggle="modal" @click="toDelete = loc" id="btnDeleteModal"
                                                data-bs-target="#deleteModal">
                                                <font-awesome-icon :icon="['fas', 'trash-can']" />
                                            </button>

                                            <!-- Button trigger modal *Update* -->
                                            <button type="button" class="btn btn-success btn-action"
                                                data-bs-toggle="modal" @click="toUpdate = loc" id="btnDeleteModal"
                                                data-bs-target="#updateModal">
                                                <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                                            </button>

                                            <!-- Menu -->
                                            <router-link :to="{ name: 'ViewMenu', params: { locationId: loc.id } }"
                                                class="btn btn-action btn-menu">
                                                <font-awesome-icon :icon="['fa', 'table-list']" />
                                            </router-link>
                                        </div>
                                    </b-card-text>

                                    <DeleteModal :deleteLocation="toDelete" @reloadData="$emit('reloadData')" />
                                    <UpdateRest :updateRest="toUpdate" @reloadData="$emit('reloadData')" />
                                </b-card-body>
                            </b-col>
                        </b-row>
                    </b-card>
                </div>
            </div>
        </div>
        <div class=" alert alert-warning" v-else> No Locations Yet !!!</div>
    </div>
</template>
<style scoped>
.btn-action {
    border-radius: 50%;
    /* margin-right: 2px; */
    /* margin-left: 2px; */
}

.btn-menu,
.btn-menu:hover {
    background-color: var(--main-color);
    color: #fff;
}

@media (max-width: 490px) {
    .img-cont>img {
        object-fit: cover;
        height: 200px;
    }
}

@media (min-width: 768px) {
    .actions-parent {
        /* margin-top: 55px; */
        /* margin-left: -100px; */
        /* margin-bottom: 0; */
        /* width: 150% !important; */
        /* border: rgb(226, 43, 43) solid 7px; */
    }

    .btn-action {

        /* border: rgb(226, 43, 43) solid 3px; */

    }
}
</style>

<script setup>
import { RouterLink } from 'vue-router';
import { defineProps, ref, watch } from "vue";
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

        } else {
            console.log("dissss");
        }
    }, { deep: true })

watch(
    () => toUpdate.value, (newVal) => {
        console.log(newVal);
    }, { deep: true })
</script>