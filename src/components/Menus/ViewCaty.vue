<template>
    <div class="container">
        <RouterLink :to="{ name: 'AddnewCaty', params: { locationId: locationId } }" class="btn btn-primary float-start">
            <font-awesome-icon :icon="['fas', 'arrow-left']" /> &nbsp; Add ew Category
        </RouterLink>

        <RouterLink :to="{ name: 'ViewMenu', params: { locationId: locationId } }" class="btn btn-success float-end">
            Back To menu &nbsp; <font-awesome-icon :icon="['fas', 'arrow-right']" />
        </RouterLink>

    </div>

    <div class="text-center ">
        <h1>
            {{ locName }}
        </h1>
        <p class="text-muted"> {{ locAdrr }} </p>
    </div>

    <div class="container">
        <div class="row">
            <table class=" table caption-top" v-if="st.listOfCategorys.length > 0">
                <caption>
                    <span>
                        List Of Catygoris {{ st.listOfCategorys.length }} <!-- 1 -->
                    </span>
                    <span>

                        <RouterLink class="btn btn-danger float-end"
                            :to="{ name: 'DeleteAllCategories', params: { locationId: locationId } }">Delete All Catygoris
                        </RouterLink>
                    </span>
                </caption>
                <thead class=" table-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(cat, i) in st.listOfCategorys" :key="i">
                        <td> {{ cat.name }}</td>
                        <td>
                            <router-link :to="{ name: 'DeletCatygori', params: { catygoriID: cat.id } }"
                                class=" btn btn-danger me-1"> Delete</router-link>

                            <RouterLink
                                :to="{ name: 'UpdateCatygori', params: { catygoriID: cat.id, locationId: cat.locationId } }"
                                class=" btn btn-success ms-1">Update</RouterLink>
                        </td>

                    </tr>
                </tbody>

            </table>
            <div class=" alert alert-warning" v-else> No Catygoris Yet !!!</div>
        </div>
    </div>
</template>

<script setup>
//Import
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
let route = useRoute();
let store = useStore();
store.commit('isLoggedInUser');
let st = store.state;
//Data

let locationId = route.params.locationId;
let locName = ref('');
let locAdrr = ref('');
let userId = ref(st.loggedInUserId);
//Mounted
onMounted(async () => {
    store.commit('canUserAccessThisLocation', { locationIdIs: locationId });
    store.commit('getLocationInfo', { locidIs: locationId })

    store.commit('displayAllCategorys', { userId: userId.value, locId: locationId });
});
</script>
