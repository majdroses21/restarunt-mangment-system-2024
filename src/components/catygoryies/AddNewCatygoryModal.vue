<template>
    <!-- Modal -->
    <div class="modal fade" id="addCatyModal" tabindex="-1" aria-labelledby="addCatyModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="addCatyModalLabel">Add New Catygory</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @click.prevent class="container">
                        <div class="input-container">
                            <font-awesome-icon :icon="['fas', 'utensils']" class=" icon" />
                            <input type="text" class="form-control" placeholder="Add New Category" name="name"
                                v-model="state.name">
                        </div>
                        <span class="validate-style" v-if="v$.name.$error"> {{ v$.name.$errors[0].$message }}</span>
                    </form>
                    <div class=" alert alert-danger" v-if="errorMessage.length > 0"> {{ errorMessage }} </div>
                    <div class=" alert alert-success" v-if="successMessage.length > 0"> {{ successMessage }} </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="closeAddCay">Close</button>
                    <button type="button" class="btn btn-add" @click="addCaty()">Add New</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
//Import 
import { ref, onMounted, computed, defineProps, toRef } from "vue";
import axios from 'axios';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, maxLength } from '@vuelidate/validators';
import { useStore } from "vuex";
let store = useStore();
//Data
store.commit('isLoggedInUser'); //
let userId = ref(store.state.loggedInUserId);
let successMessage = ref('');
let errorMessage = ref('');
const props = defineProps(["locId"]);
let locationId = toRef(props.locId)






//validations
let state = ref({ name: '' });
let rulses = computed(() => {
    return { name: { required, minLength: minLength(3), maxLength: maxLength(15) } }
});
const v$ = useVuelidate(rulses, state);
//Mounted
onMounted(() => {
    store.commit('getLocationInfo', { locidIs: locationId.value })
    store.commit('displayAllCategorys', { userId: userId.value, locId: locationId.value })

});
//Methods

const addCaty = async () => {
    v$.value.$validate();
    let filterCatyName = store.state.listOfCategorys.filter((v) => v.name.toLocaleLowerCase() == state.value.name.toLocaleLowerCase());
    if (filterCatyName.length > 0) {
        errorMessage.value = "Catygory Name Already Exists, Try Another Name";
        successMessage.value = "";
    } else {
        errorMessage.value = "";
        successMessage.value = "You Can Add This Category";
        if (!v$.value.$error) {
            let url = `http://localhost:3000/categorys`;
            let params = {
                name: state.value.name,
                userId: userId.value,
                locationId: parseInt(locationId.value),
            };
            await axios.post(url, params)
                .then(result => {
                    console.log("Good result :-) " + result.data);
                    errorMessage.value = "";
                    successMessage.value = "Added New category Successfully";
                    setTimeout(() => {
                        document.getElementById("closeAddCay").click();
                        store.commit('displayAllCategorys', { userId: userId.value, locId: locationId.value });
                        successMessage.value = "";
                        state.value.name = "";
                    }, 1000);
                })
                .catch(err => {
                    console.log("Bad request :-( ", err);
                    errorMessage.value = "Bad request: Something went wrong!! try again later"
                });
        } else {
            successMessage.value = "";
            errorMessage.value = "You must fill in Category Name";
            console.log("You must fill in Category Name");
        }
    }
    console.log("Added Clicked Done");

};


</script>








