<template>
    <br>
    <AddnewlocationModal @reloadData="GetRestarunts" />
    <UsersLocations :allLocations="listOfLocations" @reloadData="GetRestarunts" />
</template>

<script setup>
import UsersLocations from '@/components/UsersLocations.vue';
import AddnewlocationModal from '@/components/locations/AddnewlocationModal.vue';
import axios from 'axios';

// Data
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();
let userId = ref(store.state.loggedInUserId);
let listOfLocations = ref([]);
const GetRestarunts = async () => {
    let url = `http://localhost:3000/locations?userId=${userId.value}`
    let response = await axios.get(url)
        .then(response => {
            console.log(response + "ok");
            console.log(response.data, "okmj");
            listOfLocations.value = response.data
            console.log(listOfLocations.value, "the lest");
        })
        .catch(error => {
            console.log(response + "Err");
            console.log(response.data, "Err");
            console.log("Bad Request");
            console.log(error);
        });
};




onMounted(async () => {
    store.commit('getUserId');
    await GetRestarunts();

})
</script>



