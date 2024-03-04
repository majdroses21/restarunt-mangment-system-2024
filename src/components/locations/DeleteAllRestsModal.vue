<style scoped>

.form-control {
    width: 50%;
    margin-left: 25%;
}

ul {
    list-style-type: none;
}
</style>
<template>
    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteallModal" @click="confirmDelete()">
        Delete All &nbsp;
        <font-awesome-icon :icon="['fas', 'trash-can']" />
    </button>
    <!-- Modal -->
    <div class="modal fade" id="deleteallModal" tabindex="-1" aria-labelledby="deleteallModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-delete">
                    <br />
                    <span class="trash">
                        <font-awesome-icon :icon="['far', 'trash-can']" />
                    </span>
                    <h2>Are you Shoure you want to <b>Delete</b> All Restaurants !!! ?</h2>
                    <p>You'll permanently lose your:</p>
                    <ul>
                        <li>-Restaurants</li>
                        <li>-Catygories</li>
                        <li>-Menus</li>
                        <li>-items</li>
                    </ul>
                    <h6>Type "Delete All Restaurants" to confirm</h6>
                    <input class="form-control" type="text" name="" id="userConfirm" v-model="userInputConfirmText">
                </div>
                <div class=" alert alert-success" v-if="successMessage.length > 0"> {{ successMessage }} </div>
                <div class=" alert alert-danger" v-if="errorMessage.length > 0"> {{ errorMessage }} </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light" data-bs-dismiss="modal" id="btnClose">Close</button>
                    <button type="button" class="btn btn-danger" @click="deletAllRests()" id="btnDelete"
                       disabled >Cofirm</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
//Import
import axios from "axios";
import { ref, onMounted, defineEmits } from "vue";
import { useStore } from "vuex";
let store = useStore();
// Data
store.commit('getUserId');
let st = store.state;
let userId = ref(st.loggedInUserId);
let successMessage = ref('');
let errorMessage = ref('');
let allLocationsId = ref([]);
let allCatysIdIs = ref([]);

// Emits
const emits = defineEmits(['reloadData']);

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
let userInputConfirmText =ref('Delete All Restaurants')

// let userTextToCofirm = ref(userInputConfirmText);
//Confirmation 
const confirmDelete = ()=>{
    console.log("click on");
    const textToCofirm = "Delete All Restaurants"; 

    const btnDelete = ref(document.getElementById('btnDelete'));
    console.log(btnDelete.value);
    
    if (textToCofirm == userInputConfirmText.value) {
        btnDelete.value.removeAttribute("disabled");
        console.log("Hello Delete!");

    }else{
        btnDelete.value.setAttribute("disabled");
        console.log("dissss");
    }
}


//
const deletAllRests = async () => {

    // Delet All Items
    let allResultsForItms = [];
    for (let rI = 0; rI < st.allItemsIdIs.length; rI++) {
        let url = `http://localhost:3000/items/${st.allItemsIdIs[rI]}`;

        await axios.delete(url)
            .then(() => {
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
            .then(() => {
                allResultsForCats.push(true);
            })
            .catch(err => {
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
            .then(() => {
                allResultsForLocs.push(true);
            })
            .catch(err => {
                allResultsForLocs.push(false);
                console.log(err);
            });

    }
    console.table(allResultsForLocs);

    // if (!allResultsForLocs.includes(false) && !allResultsForLocs.includes(false) && !allResultsForItms.includes(false)) {
    if (!allResultsForLocs.includes(false) && !allResultsForCats.includes(false) && !allResultsForItms.includes(false)) {
        emits('reloadData');
        successMessage.value = "All Restaurants are Deleted successfully";
        errorMessage.value = "";
        setTimeout(() => {
            successMessage.value = "";
            const btnClose = document.getElementById('btnClose');
            btnClose.click();
        }, 2000)
    } else {
        successMessage.value = "";
        errorMessage.value = "Something went wrong , please try again later";
        console.log("something went wrong !!!");
    }


}

</script>