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
    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteAllCats">
        Delete All &nbsp;
        <font-awesome-icon :icon="['fas', 'trash-can']" />
    </button>
    <!-- Modal -->
    <div class="modal fade" id="deleteAllCats" tabindex="-1" aria-labelledby="deleteAllCatsLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-delete">
                    <br />
                    <span class="trash">
                        <font-awesome-icon :icon="['far', 'trash-can']" />
                    </span>
                    <h3 class="text-dark">Are you Shoure you want to <b class="text-danger">Delete</b> All Categories !!! ?</h3>
                    <p class="text-dark">You'll permanently lose your:</p>
                    <ul>
                        <li>-Categories</li>
                        <li>-items</li>
                    </ul>
                </div>
                <div class=" alert alert-success" v-if="successMessage.length > 0"> {{ successMessage }} </div>
                <div class=" alert alert-danger" v-if="errorMessage.length > 0"> {{ errorMessage }} </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light" data-bs-dismiss="modal" id="EscModel">Close</button>
                    <button type="button" class="btn btn-danger" @click="deletAllRests()">Cofirm</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
//Import
import { ref } from "vue";
import axios from 'axios';
import { useStore } from "vuex";
import { useRoute } from "vue-router";
let store = useStore();
let route = useRoute();
//Data
store.commit('getUserId');//
let locationId = ref(route.params.locationId);
let successMessage = ref('');
let errorMessage = ref('');

//Methods
store.dispatch('getAllcatygoriesIds', { locidIs: locationId.value });
const deletAllRests = async () => {
    let allCatsResults = [];
    let allItemsResults = [];
    for (let cats = 0; cats < store.state.allCatysIdIs.length; cats++) {
        let url_categories = `http://localhost:3000/categorys/${store.state.allCatysIdIs[cats]}`;
        let url_items = `http://localhost:3000/items?catygoriID=${store.state.allCatysIdIs[cats]}`;
        console.log("in cat loop", store.state.allCatysIdIs.length);
        console.log("categories to delete", store.state.allCatysIdIs[cats]);
        // Delete All Categories
        await axios.delete(url_categories)
            .then(async () => {
                allCatsResults.push(true);
            })
            .catch(error => {
                allCatsResults.push(false);
                console.log(error);
            });
        // Delete All Related items
        await axios.delete(url_items)
            .then(() => {
                allItemsResults.push(true);
            })
            .catch(err => {
                allItemsResults.push(false);
                console.log(err);
            });


    }
    console.table(allCatsResults);
    console.table(allItemsResults);




    if (!allItemsResults.includes(false) && !allCatsResults.includes(false)) {
        successMessage.value = "Category and related Items are Deleted successfully";
        errorMessage.value = "";
        console.log(store.state.allItemsIdIs);
        console.log(allCatsResults.value);
        setTimeout(() => {
            successMessage.value = "";
            document.getElementById('EscModel').click();
        }, 1000)
    } else {
        successMessage.value = "";
        errorMessage.value = "Something went wrong , please try again later";
        console.log("something went wrong !!!");
    }
};
</script>