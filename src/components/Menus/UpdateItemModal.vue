<template>
    <!-- Modal itm -->
    <div class="modal fade" id="updateItemModal" tabindex="-1" aria-labelledby="updateItemModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-update">
                    <br />
                    <span class="edit">
                        <font-awesome-icon :icon="['far', 'pen-to-square']" />
                    </span>
                    <h2>Update {{ props.updateItem.name }} </h2>
                </div>
                <div>
                    <form @click.prevent>
                        <div class="container">
                            <!-- name -->
                            <div class="input-container">
                                <font-awesome-icon :icon="['fas', 'bowl-food']" class=" icon" />
                                <div class=" form-floating mb-3 ">
                                    <input type="text" id="nameInp" placeholder="Enter Item Name" name="name"
                                        :value="$props.updateItem.name" class=" form-control">
                                    <label for="nameInp">Enter Item Name</label>
                                </div>
                            </div>
                            <!-- Price -->
                            <div class="input-container">
                                <font-awesome-icon :icon="['fas', 'dollar']" class=" icon" />
                                <div class=" form-floating mb-3">
                                    <input type="number" id="priceInp" placeholder="Enter Item Price" name="price"
                                        :value="$props.updateItem.price" class=" form-control">
                                    <label for="priceInp">Enter Item Price</label>
                                </div>
                            </div>

                            <!-- Quantities -->
                            <div class="input-container">
                                <font-awesome-icon :icon="['fas', 'store']" class=" icon" />
                                <div class=" form-floating mb-3">
                                    <input type="number" id="numInp" placeholder="Enter Item Quantitie" name="num"
                                        :value="$props.updateItem.qey" class=" form-control">
                                    <label for="numInp">Enter Item Quantitie</label>
                                </div>
                            </div>

                            <!-- Description  -->
                            <div class="input-container">
                                <font-awesome-icon :icon="['fas', 'note-sticky']" class=" icon" />
                                <div class=" form-floating mb-3">
                                    <textarea type="text" id="descInp" placeholder="Enter Item Description" name="desc"
                                        :value="$props.updateItem.description" class=" form-control "
                                        style="height: 100px;">
                                    </textarea>
                                    <label for="descInp">Enter Item Description</label>
                                </div>
                            </div>

                            <!-- Select -->
                            <div class="input-container">
                                <font-awesome-icon :icon="['fas', 'bars']" class=" icon" />
                                <div class=" form-floating mb-3">
                                    <select id="flotSlect" class=" form-select" v-model="$props.updateItem.catygoriID"
                                        name="pickedCaty">
                                        <option>Open This Select Menue</option>
                                        <option v-for="(cat, i) in st.listOfCategorys" :key="i" :value="cat.id" id="optionId">
                                            {{ cat.name }}
                                        </option>
                                    </select>
                                    <label for="flotSlect">Select Categori Name </label>
                                </div>
                            </div>

                            <br>
                            <!-- image -->
                            <div class="input-container">
                                <font-awesome-icon :icon="['far', 'image']" class=" icon" />
                                <input type="file" class="form-control" name="image">
                            </div>
                        </div>
                    </form>
                </div>
                <div class=" alert alert-success" v-if="successMessage.length > 0"> {{ successMessage }} </div>
                <div class=" alert alert-danger" v-if="errorMessage.length > 0"> {{ errorMessage }} </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light" data-bs-dismiss="modal" id="closeUmodal">Close</button>
                    <button type="button" class="btn btn-success" @click="updateItem()">
                        <!-- <button type="button" class="btn btn-success" @click="addItem()"> -->
                        Update &nbsp; <font-awesome-icon :icon="['far', 'pen-to-square']" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// Import
import axios from 'axios';
import { ref, onMounted, defineProps } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
let store = useStore();
let route = useRoute();

//Datat
let st = store.state;
store.commit('isLoggedInUser');
let userId = ref(store.state.loggedInUserId); 
let successMessage = ref('');
let errorMessage = ref('');
let locationId = ref('');


//props
let props = defineProps({
    updateItem: {
        type: Object,
        required: true,
    }
});

// Mounted
onMounted(async () => {

    locationId.value = parseInt(route.params.locationId);

    store.commit('getLocationInfo', { locidIs: locationId.value });

    store.commit('displayAllCategorys', { userId: userId.value, locId: locationId.value });


});

//Methods
const updateItem = async () => {
    let url = `http://localhost:3000/items/${props.updateItem.id}`;
    let params = {
        name: document.getElementById('nameInp').value,
        price: document.getElementById('priceInp').value,
        qey: document.getElementById('numInp').value,
        description: document.getElementById('descInp').value,
        catygoriID: props.updateItem.catygoriID ,
        userId: userId.value,
        locId: locationId.value

    };
    await axios.put(url, params)
        .then(result => {
            console.log("request successful send", result.data);
            errorMessage.value = "";
            successMessage.value = "Item successfully Updated";
            setTimeout(() => {
                successMessage.value = "";
                store.commit('displayAllItems', { locidIs: locationId.value });
                document.getElementById('closeUmodal').click();
            }, 1000);
        })
        .catch(err => {
            console.log("request failed send :-(", err);
            successMessage.value = "";
            errorMessage.value = "something wrong happened"
        });
};


</script>

<style scoped>
.icon {
    background: #198754;
}
</style>
