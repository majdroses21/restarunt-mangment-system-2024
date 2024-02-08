<template>
    <div class="container">
        <h2>Are You Want to Delete <strong><b> {{ st.catyName }} </b></strong> Catygori!??!! </h2>
        <button class="btn btn-danger me-2" @click="deleteCaty()">Yes, Delete Now</button>
        <button class="btn btn-info ms-2" @click="goBack()">No, Go Back</button>
        <div class="container">
            <div class=" alert alert-success" v-if="successMessege.length > 0"> {{ successMessege }} </div>
            <div class=" alert alert-danger" v-if="errorMessege.length > 0"> {{ errorMessege }} </div>
        </div>
    </div>
</template>

<script setup>
//Import
import { ref ,onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from 'axios';
import { useStore } from "vuex";
let store = useStore();
let router = useRouter();
let route = useRoute();
//Data
store.commit('isLoggedInUser');
let st = store.state;
let catygoriID = ref('');
let locationId = ref('');
let successMessege = ref('');
let errorMessege = ref('');
//Mounted
onMounted(async () => {
        catygoriID.value = parseInt(route.params.catygoriID);
        locationId.value = parseInt(route.params.locationId);
        store.commit('canUserAccessThisCategory', {catygoriIdIS:catygoriID.value , locidIs: locationId.value });

        store.commit('getCatygoryInfo', {catygoriIdIS: catygoriID.value});

        store.commit('getAllItemsIds', {catidIs: catygoriID.value})
});
//Methods
const goBack = () => {
    router.push({ path: `/menu/catys/view/${locationId.value}` })
};
const deleteCaty = async () => {
    let url = `http://localhost:3000/categorys/${catygoriID.value}`;
    await axios.delete(url)
        .then(() => {
            console.log("Deleted Caty successfully");
        })
        .catch(err => {
            console.log("failed to Deleted Caty", err);
        });
    let allResults = [];

    for (let i = 0; i < st.allItemsIdIs.length; i++) {
        let url = `http://localhost:3000/items/${st.allItemsIdIs[i]}`;

        await axios.delete(url)
            .then(() => {
                allResults.push(true);
            })
            .catch(() => {
                allResults.push(false);
            });
    }
    console.table(allResults);

    if (!allResults.includes(false)) {
        successMessege.value = "Category and related Items are Deleted successfully";
        errorMessege.value = "";
        setTimeout(() => {
            router.push({ path: `/menu/catys/view/${locationId.value}` })
        }, 2500)
    } else {
        successMessege.value = "";
        errorMessege.value = "Something went wrong , please try again later";
        console.log("something went wrong !!!");
    }



}


</script>

