<template>
    <!-- Modal -->
    <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-update">
                    <br />
                    <span class="edit">
                        <font-awesome-icon :icon="['far', 'pen-to-square']" />
                    </span>
                    <h2>Update <b class="text-success">{{ props.updateCaty.name }}</b> Category</h2>
                    <br />

                    <form @click.prevent>
                        <div class="container">
                            <!-- Name -->
                            <div class="input-container">
                                <font-awesome-icon :icon="['fas', 'utensils']" class=" icon" />
                                <input type="text" class="form-control" placeholder="Resturant Name" name="name"
                                    :value="props.updateCaty.name" id="updateName">
                            </div>
                        </div>
                    </form>

                </div>
                <div class=" alert alert-success" v-if="successMessage.length > 0"> {{ successMessage }} </div>
                <div class=" alert alert-danger" v-if="errorMessage.length > 0"> {{ errorMessage }} </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light" data-bs-dismiss="modal" id="closeModel">Close</button>
                    <button type="button" class="btn btn-success" id="btnUpdate" @click="updateCaty()">
                        Update &nbsp; <font-awesome-icon :icon="['far', 'pen-to-square']" />
                    </button>

                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
//Import
import { ref,toRef, defineProps } from "vue";
import axios from "axios";
import { useStore } from "vuex";
let store = useStore();
//props
const props = defineProps({
    updateCaty: {
        type: Object,
        required: true
    }
})
//Data
store.commit('isLoggedInUser');
let userId = ref(store.state.loggedInUserId);


let successMessage = ref('');
let errorMessage = ref('');
//Methods

const updateCaty = async () => {
   let catyName = ref(document.getElementById("updateName").value);

    let catygoriID = toRef(props.updateCaty.id)
    let locationId = toRef(props.updateCaty.locationId);
    store.commit('displayAllCategorys', { userId: userId.value, locId: locationId.value });
    console.log(store.state.listOfCategorys);

    let filterCatyName = store.state.listOfCategorys.filter((v) => v.name.toLocaleLowerCase() == catyName.value.toLocaleLowerCase());
    if (filterCatyName.length > 0) {
        errorMessage.value = "Catygory Name Already Exists, Try Another Name";
        successMessage.value = "";
        console.log("Catygory Name Already Exists, Try Another Name");
    } else {
            errorMessage.value = "";
            successMessage.value = "You Can Add This Category";
            let url = `http://localhost:3000/categorys/${catygoriID.value}`;
            let params = {
                name: catyName.value,
                userId: userId.value,
                locationId: locationId.value
            };
            await axios.put(url, params)
                .then(() => {
                    console.log("Catygori is updated successfully");
                    successMessage.value = "Catygori is updated successfully";
                    setTimeout(() => {
                        successMessage.value = "";
                        document.getElementById("closeModel").click();
                        store.commit('displayAllCategorys', { userId: userId.value, locId: locationId.value });

                    }, 1000);
                })
                .catch(err => {
                    successMessage.value = "";
                    errorMessage.value = "Something went wrong , please try again later";
                    console.log("something went wrong !!!", err);
                })
        
    }
};
</script>




<style scoped>
/* Style the form icons */
.icon {
    background: #198754 !important;
}
</style>
