<template>
    {{ st.locName }} <br> {{ st.locAdrr }}
    <div class="container">
        <h1 class=" text-danger"> Are you Shoure you want to <b>Delete</b> All Categoris !!! ?</h1>
        <p class=" text-danger"> Whene Deleting All Categoris there related items will be Deleted Well...</p>
        <br>
        <div class=" alert alert-success" v-if="successMessege.length > 0"> {{ successMessege }} </div>
        <div class=" alert alert-danger" v-if="errorMessege.length > 0"> {{ errorMessege }} </div>

        <div>
            <button type="button" class="btn btn-info   me-2" @click="goBack()">Go Backe</button>
            <button type="button" class="btn btn-danger ms-2" @click="deletAllRests()">Delete Now</button>
        </div>
    </div>
</template>
<script setup>
//Import
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from 'axios';
import { useStore } from "vuex";
let store = useStore();
let router = useRouter();
let route = useRoute();
//Data
store.commit('isLoggedInUser');
let st = store.state;
let locationId = ref('');
let successMessege = ref('');
let errorMessege = ref('');
//Mounted
onMounted(async () => {
        locationId.value = parseInt(route.params.locationId);

        store.commit('getLocationInfo', {locidIs: locationId.value});
        
        store.commit('getAllcatygoriesIds',{locidIs: locationId.value});
       
        // store.commit('canUserAccessThisCategory', {catygoriIdIS: route.params.catygoriID ,locidIs: locationId.value});
        //
        
});
//Methods
const goBack = () => {
    router.push({ path: `/menu/catys/view/${locationId.value}` })
};

const deletAllRests = async () => {

    let allCatsResults = [];

    for (let cats = 0; cats < st.allCatysIdIs.length; cats++) {
        let url = `http://localhost:3000/categorys/${st.allCatysIdIs[cats]}`;
        await axios.delete(url)
            .then(() => {
                allCatsResults.push(true);
            })
            .catch(error => {
                allCatsResults.push(false);
                console.log(error);
            });

    }
    console.table(allCatsResults);

    // 2 


    let allItemsResults = [];

    for (let itms = 0; itms < st.allItemsIdIs.length; itms++) {
        let url = `http://localhost:3000/items/${st.allItemsIdIs[itms]}`;
        await axios.delete(url)
            .then(() => {
                allItemsResults.push(true);
            })
            .catch(err => {
                allItemsResults.push(false);
                console.log(err);
            });
    }
    console.table(allItemsResults);


    if (!allItemsResults.includes(false) && !allCatsResults.includes(false)) {
        successMessege.value = "Category and related Items are Deleted successfully";
        errorMessege.value = "";
        console.log(st.allItemsIdIs);
        console.log(allCatsResults.value);
        setTimeout(() => {
            router.push({ path: `/my-rests` })
        }, 2500)
    } else {
        successMessege.value = "";
        errorMessege.value = "Something went wrong , please try again later";
        console.log("something went wrong !!!");
    }
};


</script>