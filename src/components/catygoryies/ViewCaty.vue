<template>
    <div class="container">
        <div class="row">
            <table class=" table caption-top" v-if="store.state.listOfCategorys.length > 0">
                <caption>
                    <span class="float-end">
                        <DeleteAll />
                    </span>
                    <span class="float-start me-3">
                        <!-- Button trigger modal -->
                        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#addCatyModal" style="background-color: var(--main-color); color: #fff; border-radius: 8.7px;">
                            <font-awesome-icon :icon="['fas', 'plus']" />
                        </button>
                        <addCaty :locId="locationId" />
                    </span>
                    <span>
                        List Of Catygoris {{ store.state.listOfCategorys.length }} <!-- 1 -->
                    </span>
                </caption>
                <thead class="tabel">
                    <tr>
                        <th style="background-color: #f0ae35; color: #fff;" scope="col">Name</th>
                        <th style="background-color: #f0ae35; color: #fff;" scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(cat, i) in store.state.listOfCategorys" :key="i">
                        <td> <b style="font-size: 20px;">{{ cat.name }}</b></td>
                        <td>

                            <!-- Button trigger modal *Delete* -->
                            <button type="button" class="btn btn-danger btn-action" data-bs-toggle="modal"
                                @click="forActions = cat" id="btnDeleteModal" data-bs-target="#deleteCatyModal"
                                style="border-radius: 20px;">
                                <font-awesome-icon :icon="['fas', 'trash-can']" />
                            </button>
                            <DeleteCaty :deleteCaty="forActions" />

                            <!-- Button trigger modal *Update* -->
                            <button type="button" class="btn btn-success btn-action" data-bs-toggle="modal"
                                @click="forActions = cat" id="btnDeleteModal" data-bs-target="#updateModal"
                                style="border-radius: 20px;">
                                <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                            </button>

                        </td>

                    </tr>
                </tbody>

            </table>
            <div v-else>
                <div class="alert alert-warning mt-3 " style="transform: translateY(370%);">
                    No Catygoris Yet !!!
                </div>
            </div>
            <UpdateCaty :updateCaty="forActions" />
        </div>
    </div>
</template>

<script setup>
//Import
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import addCaty from '@/components/catygoryies/AddNewCatygoryModal.vue';
import DeleteCaty from '@/components/catygoryies/DeleteCatyModal.vue';
import UpdateCaty from '@/components/catygoryies/UpdateCatyModal.vue';
import DeleteAll from '@/components/catygoryies/DeleteAllCategories.vue'
let route = useRoute();
let store = useStore();
store.commit('getUserId');
//Data

let locationId = route.params.locationId;
let userId = ref(store.state.loggedInUserId);
//Mounted
onMounted(async () => {
    store.dispatch('doCanUserAccessThisLocation', { locationIdIs: locationId });

    store.dispatch('doDisplayAllCategorys', { userId: userId.value, locId: locationId });
});

//Wach
const forActions = ref({});

watch(
    () => forActions.value, (newValue) => {
        console.log(newValue);
    }, { deep: true })
</script>
