<template>
    <br>
        <AddnewlocationModal />
        <UsersLocations :allLocations="listOfLocations" />
    
</template>

<script setup>
import UsersLocations from '@/components/UsersLocations.vue';
import AddnewlocationModal from '@/components/locations/AddnewlocationModal.vue';
import axios from 'axios';

// Data
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

let userId = ref('');
let listOfLocations = ref([]);

onMounted(async () => {
    let router = useRouter();
    let user = localStorage.getItem("user-info");
    if (!user) {
        router.push({ path: "/login" });
    } else {
        userId.value = JSON.parse(user).id;
        console.log(userId.value);
    }
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

})
</script>



