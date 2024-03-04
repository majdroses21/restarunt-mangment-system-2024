<template>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-plus" data-bs-toggle="modal" data-bs-target="#addItemModal">
        <font-awesome-icon :icon="['fas', 'plus']" />
    </button>

    <!-- Modal -->
    <div class="modal fade" id="addItemModal" tabindex="-1" aria-labelledby="addItemModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="addItemModalLabel">Add New Meal</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @click.prevent>
                        <div class="container">
                            <!-- name -->
                            <div class="input-container">
                                <font-awesome-icon :icon="['fas', 'bowl-food']" class=" icon" />
                                <div class=" form-floating mb-3 ">
                                    <input type="text" id="flotNameInp" placeholder="Enter Item Name" name="name"
                                        v-model="state.name" class=" form-control">
                                        <label for="flotNameInp">Enter Item Name</label>
                                    </div>
                                </div>
                                <span class="validate-style" v-if="v$.name.$error"> {{ v$.name.$errors[0].$message }}</span>
                            <!-- Price -->
                            <div class="input-container">
                                <font-awesome-icon :icon="['fas', 'dollar']" class=" icon" />
                                <div class=" form-floating mb-3">
                                    <input type="number" id="flotPriceInp" placeholder="Enter Item Price" name="price"
                                        v-model="state.price" class=" form-control">
                                    <label for="flotPriceInp">Enter Item Price</label>
                                </div>
                            </div>
                            <span class="validate-style" v-if="v$.price.$error"> {{ v$.price.$errors[0].$message }}</span>

                            <!-- Quantities -->
                            <div class="input-container">
                                <font-awesome-icon :icon="['fas', 'store']" class=" icon" />
                                <div class=" form-floating mb-3">
                                    <input type="number" id="flotNumInp" placeholder="Enter Item Quantitie" name="num"
                                        v-model="state.num" class=" form-control">
                                    <label for="flotNumInp">Enter Item Quantitie</label>
                                </div>
                            </div>
                            <span class="validate-style" v-if="v$.num.$error"> {{ v$.num.$errors[0].$message }}</span>

                            <!-- Description  -->
                            <div class="input-container">
                                <font-awesome-icon :icon="['fas', 'note-sticky']" class=" icon" />
                                <div class=" form-floating mb-3">
                                    <textarea type="text" id="flotDescInp" placeholder="Enter Item Description" name="desc"
                                        v-model="state.desc" class=" form-control " style="height: 100px;"> </textarea>
                                    <label for="flotDescInp">Enter Item Description</label>
                                </div>
                            </div>
                            <span class="validate-style" v-if="v$.desc.$error"> {{ v$.desc.$errors[0].$message }}</span>

                            <!-- Select -->
                            <div class="input-container">
                                <font-awesome-icon :icon="['fas', 'bars']" class=" icon" />
                                <div class=" form-floating mb-3">
                                    <select id="flotSlect" class=" form-select" v-model="state.pickedCaty"
                                        name="pickedCaty">
                                        <option>Open This Select Menue</option>
                                        <option v-for="(cat, i) in st.listOfCategorys" :key="i" :value="cat.id"> {{ cat.name
                                        }} </option>
                                    </select>
                                    <label for="flotSlect">Select Categori Name </label>
                                </div>
                            </div>
                            <span class="validate-style" v-if="v$.pickedCaty.$error"> {{ v$.pickedCaty.$errors[0].$message
                            }}</span>

                            <br>
                            <!-- image -->
                            <div class="input-container">
                                <font-awesome-icon :icon="['far', 'image']" class=" icon" />
                                <input type="file" class="form-control" name="image">
                            </div>
                        </div>
                    </form>
                    <div class=" alert alert-danger" v-if="errorMessage.length > 0"> {{ errorMessage }} </div>
                    <div class=" alert alert-success" v-if="successMessege.length > 0"> {{ successMessege }} </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="closeAdd">Close</button>
                    <button type="button" class="btn btn-add" @click="addItem()">Add New</button>
                </div>
            </div>
        </div>
    </div>
</template>



<script setup>
// Import
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, maxLength, between } from '@vuelidate/validators';
import axios from 'axios';
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
let store = useStore();
let route = useRoute();

//validations
let state = ref({
    name: '',
    num: '',
    price: '',
    desc: '',
    pickedCaty: 1,
})

// Rulses
let rulses = computed(() => {
    return {
        name: { required, minLength: minLength(10), maxLength: maxLength(35) },
        num: { required, minLength: minLength(1) },
        price: { required, minLength: minLength(1) },
        desc: { required, minLength: minLength(10), maxLength: maxLength(128) },
        pickedCaty: { required, between: between(1, 100000) }
    }
});
let v$ = useVuelidate(rulses, state);

//Datat
let st = store.state;
store.commit('getUserId');
let userId = ref(store.state.loggedInUserId);console.log("your userId is: ", userId.value);
let successMessege = ref('');
let errorMessage = ref('');
let locationId = ref('');






// Mounted
onMounted(async () => { 

    locationId.value = parseInt(route.params.locationId);

    store.dispatch('getLocationInfo', { locidIs: locationId.value });

    store.dispatch('doDisplayAllCategorys', { userId: userId.value, locId: locationId.value });


});

//Methods
const addItem = async () => {
    v$.value.$validate();
    console.log(v$.value);
    console.log(v$.value.$error);
    console.log(v$.value.$errors);
    if (!v$.value.$error) {
        let url = 'http://localhost:3000/items';
        let params = {
            name: state.value.name,
            price: state.value.price,
            description: state.value.desc,
            qey: state.value.num,
            userId: userId.value,
            catygoriID: state.value.pickedCaty,
            locId: locationId.value
        };

        await axios.post(url, params)
            .then(result => {
                console.log("The Result is:", result.status); // Expanded 201
                console.log("request successful send", result.data);
                errorMessage.value = "";
                successMessege.value = "Item successfully send"
                setTimeout(() => {
                    store.dispatch('displayAllItems', { locidIs: locationId.value });
                    successMessege.value ="";
                    document.getElementById('closeAdd').click();
                }, 1000);
            })
            .catch(err => {
                console.log("request failed send :-(", err);
                console.log("The Result is:", err.result.status);
                successMessege.value = "";
                errorMessage.value = "something wrong happened"
            });
    } else {
        successMessege.value = "";
        errorMessage.value = "You must fill in all the required fields";
        console.log("Not validated");
    }
};




</script>

<style scoped>

</style>