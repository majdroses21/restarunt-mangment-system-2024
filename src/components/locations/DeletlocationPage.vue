<template>
    <div class="container">
        <h3>
            <p class=" text-danger"> Are you shoue you want to delet this Restaurant ?</p>
        </h3>
        <div class="form-parent">
            <form @click.prevent class=" small-screens-form-as-row">

                <div class="input-container">
                    <div class=" icon">
                        <font-awesome-icon :icon="['fas', 'utensils']" /> &nbsp;
                        <label> Restaurant Name</label>
                    </div>
                    <input type="text" class="spc-inp text-center" disabled v-model="st.locName">
                </div>
                <div class="input-container">
                    <div class=" icon">
                        <font-awesome-icon :icon="['fas', 'phone']" /> &nbsp;
                        <label> Restaurant Phone Number</label>
                    </div>
                    <input type="text" class="spc-inp text-center" disabled v-model="st.locNum">
                </div>
                <div class="input-container">
                    <div class=" icon">
                        <font-awesome-icon :icon="['fas', 'map-location-dot']" /> &nbsp;
                        <label> Restaurant Address</label>
                    </div>
                    <input type="text" class="spc-inp text-center" disabled v-model="st.locAdrr">
                </div>
            </form>
        </div>
        <br>
        <div class=" alert alert-success" v-if="successMessage.length > 0"> {{ successMessage }} </div>
        <div class=" alert alert-danger" v-if="errorMessage.length > 0"> {{ errorMessage }} </div>


        <div>
            <button type="button" class="btn btn-info" @click="goBack()">Go Backe</button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button type="button" class="btn btn-danger" @click="deletRest()">Delete Now</button>
        </div>
    </div>
</template>
 
<script setup>
//Import
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
let store = useStore();
const router = useRouter();
const route = useRoute();
//Data
store.commit('isLoggedInUser');
let st = store.state;
let deleteLocation = ref('');
let successMessage = ref('');
let errorMessage = ref('');
let allItemsIdIs = ref([]);
onMounted(async () => {
        deleteLocation.value = parseInt(route.params.locationId);

        store.commit('canUserAccessThisLocation', {locationIdIs: deleteLocation.value});

        store.commit('getLocationInfo', {locidIs: deleteLocation.value});
        
        store.commit('getAllcatygoriesIds', {locidIs: deleteLocation.value});
        //Expacted Delet All This Whine Deal with Real API
        let url = `http://localhost:3000/items?locId=${deleteLocation.value}`;
        await axios.get(url)
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    allItemsIdIs.value.push(response.data[i].id);
                }
            })
            .catch(error => {
                console.log(error , "M Err :-(");
            });

            
});

const goBack = () => { router.push({ path: "/my-rests" }); };

const deletRest = async () => {
    let url = `http://localhost:3000/locations/${deleteLocation.value}`;
    await axios.delete(url)
        .then(async (res) => {
            let allCatsResults = [];

            for (let cats = 0; cats < allItemsIdIs.value.length; cats++) {
                let catUrl = `http://localhost:3000/categorys/${st.allCatysIdIs[cats]}`;
                await axios.delete(catUrl)
                    .then(() => {
                        allCatsResults.push(true);
                    })
                    .catch(error => {
                        allCatsResults.push(false);
                        console.log(error , "M Err :-(");
                    });
            }

            let allItemsResults = [];

            for (let itms = 0; itms < allItemsIdIs.value.length; itms++) {
                let itemUrl = `http://localhost:3000/items/${allItemsIdIs.value[itms]}`;
                await axios.delete(itemUrl)
                    .then(() => {
                        allItemsResults.push(true);
                    })
                    .catch(error => {
                        allItemsResults.push(false);
                        console.log(error , "M Err :-(");
                    });
            }

            if (res.status == 200 && !allCatsResults.includes(true) && !allItemsResults.includes(false)) {
                successMessage.value = "Deleted successfully";
                console.log(res);
                setTimeout(() => {
                    router.push({ path: "/my-rests" });
                }, 2500);
            } else {
                console.log("your Status is: " , res.status);
                console.table(res.data);
                successMessage.value = "";
                errorMessage.value = "Something went wrong, please try again later";
                console.log("something went wrong !!!");
            }
        })
        .catch(error => {
            console.log(error , "M Err :-(");
        });
}
</script>


<style scoped>
* {
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
}

/* Style the input container */
.spc-inp {
    border: none;
    border-bottom: 2px solid #dc3545;
    background-color: rgba(0, 0, 0, 0.027);
}

.form-parent {
    display: inline-block;
    margin-top: 20px;
    margin-bottom: 20px;
}

.input-container {
    display: flex;
    width: 500px;
    margin-bottom: 5px;
    margin-top: 5px;
}

/* Style the form icons */
.icon {
    padding: 10px;
    background: #dc3545;
    ;
    color: white;
    width: 100%;
    text-align: center;
}

/* Validation Stailing */
.validate-style {
    color: red;
    margin-bottom: -30px;
}

@media (max-width: 480px) {
    .form-parent {
        --bs-gutter-x: 1.5rem;
        --bs-gutter-y: 0;
        width: 100%;
        padding-right: calc(var(--bs-gutter-x) * .5);
        padding-left: calc(var(--bs-gutter-x) * .5);
        margin-right: auto;
        margin-left: auto;
    }

    .small-screens-form-as-row {
        --bs-gutter-x: 1.5rem;
        --bs-gutter-y: 0;
        display: flex;
        flex-wrap: wrap;
        margin-top: calc(-1 * var(--bs-gutter-y));
        margin-right: calc(-.5 * var(--bs-gutter-x));
        margin-left: calc(-.5 * var(--bs-gutter-x));
    }
}
</style>

















