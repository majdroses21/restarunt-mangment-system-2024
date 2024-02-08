<template>
    <div class="container">
        <h3>
            <p class=" text-danger"> Are you Shoure you want to <b>Delete</b> All Restaurants !!! ?</p>
        </h3>

        <br>
        <div class=" alert alert-success" v-if="successMessege.length > 0"> {{ successMessege }} </div>
        <div class=" alert alert-danger" v-if="errorMessege.length > 0"> {{ errorMessege }} </div>

        <div>
            <button type="button" class="btn btn-info" @click="goBack()">Go Backe</button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button type="button" class="btn btn-danger" @click="deletAllRests()">Delete Now</button>
        </div>
    </div>
</template>

<script setup>
//Import
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter  } from "vue-router";
import { useStore } from "vuex";
let store = useStore();
const router = useRouter();
// Data
store.commit('isLoggedInUser');
let st = store.state;
let userId = ref(st.loggedInUserId);
let successMessege = ref('');
let errorMessege = ref('');
let allLocationsId = ref([]);
let allCatysIdIs = ref([]);
//Mounted 
onMounted(async () => {
        // Locations
        // This result get all Locations ids and push it to the array
        await axios.get(`http://localhost:3000/locations?userId=${userId.value}`)
            .then(response => {
                for (let L = 0; L < response.data.length; L++) {
                    allLocationsId.value.push(response.data[L].id)
                }
                console.table(allLocationsId.value);
            })
            .catch(err => { console.log(err); });



        //////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Categories
        // This result get all categories ids and push it to the array
        await axios.get(`http://localhost:3000/categorys?userId=${userId.value}`)
            .then(response => {
                for (let c = 0; c < response.data.length; c++) {
                    allCatysIdIs.value.push(response.data[c].id)
                }
                console.table(allCatysIdIs.value);
            })
            .catch(err => { console.log(err); });



        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

})
//methods
const goBack = () => {
    router.push({ path: "/my-rests" });
}

//

const deletAllRests = async () => {

    // Delet All Items
    let allResultsForItms = [];
    for (let rI = 0; rI < st.allItemsIdIs.length; rI++) {
        let url = `http://localhost:3000/items/${st.allItemsIdIs[rI]}`;

        await axios.delete(url)
        .then( () => {
            allResultsForItms.push(true);

        })
        .catch(err => { 
            allResultsForItms.push(false);
            console.log(err) 
        });
    }
    console.table(allResultsForItms);


    // Delet All Categories
    let allResultsForCats = [];
    for (let rC = 0; rC < allCatysIdIs.value.length; rC++) {
        let url = `http://localhost:3000/categorys/${allCatysIdIs.value[rC]}`;

         await axios.delete(url)
         .then(()=>{
            allResultsForCats.push(true);
         })
         .catch(err =>{
            allResultsForCats.push(false);
            console.log(err);
         })
    }
    console.table(allResultsForCats);

    // Delet All locations
    let allResultsForLocs = [];
    for (let rL = 0; rL < allLocationsId.value.length; rL++) {
        let url = `http://localhost:3000/locations/${allLocationsId.value[rL]}`;

         await axios.delete(url)
         .then(()=>{
            allResultsForLocs.push(true);
         })
         .catch(err =>{
            allResultsForLocs.push(false);
            console.log(err);
         });

    }
    console.table(allResultsForLocs);

    // if (!allResultsForLocs.includes(false) && !allResultsForLocs.includes(false) && !allResultsForItms.includes(false)) {
    if (!allResultsForLocs.includes(false) && !allResultsForCats.includes(false) && !allResultsForItms.includes(false)) {
        successMessege.value = "All Restaurants are Deleted successfully";
        errorMessege.value = "";
        setTimeout(() => {
            router.push({ path: "/my-rests" });
        }, 2000)
    } else {
        successMessege.value = "";
        errorMessege.value = "Something went wrong , please try again later";
        console.log("something went wrong !!!");
    }


}

</script>