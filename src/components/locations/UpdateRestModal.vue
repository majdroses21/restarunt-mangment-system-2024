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
                    <h2>Update {{ props.updateRest.name }} Restarunt!</h2>
                    <br />

                    <form @click.prevent>
                        <div class="container">
                            <!-- Name -->
                            <div class="input-container">
                                <font-awesome-icon :icon="['fas', 'utensils']" class=" icon" />
                                <input type="text" class="form-control" placeholder="Resturant Name" name="name"
                                    :value="$props.updateRest.name" id="updateName">
                            </div>
                            <!-- Num -->
                            <div class="input-container">
                                <font-awesome-icon :icon="['fas', 'phone']" class=" icon" />
                                <input type="number" class="form-control" placeholder="Phone Number" name="num"
                                :value="$props.updateRest.num" id="updateNum">
                            </div>
                            <!-- Decsraptio -->
                            <div class="input-container">
                                <font-awesome-icon :icon="['fas', 'map-location-dot']" class=" icon" />
                                <textarea class="form-control" placeholder="Address" name="addr"
                                :value="$props.updateRest.addr" id="updateAddr"> </textarea>
                            </div>
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
                    <button type="button" class="btn btn-light" data-bs-dismiss="modal" id="btnUpdClose">Close</button>
                    <button type="button" class="btn btn-success" id="btnUpdate" @click="updateRest()">
                        Update &nbsp; <font-awesome-icon :icon="['far', 'pen-to-square']" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
// Imports
import { ref, defineProps, defineEmits  } from "vue";
import axios from 'axios';
import { useStore } from "vuex";
//Data
let store = useStore();
let userId = ref(store.state.loggedInUserId);
let successMessage = ref('');
let errorMessage = ref('');

//props
let props = defineProps({
    updateRest:{
        type: Object,
        required: true,
    }
});
// Emits
const emits = defineEmits(['reloadData']);

//Methods
const updateRest = async () => {
            let url = `http://localhost:3000/locations/${props.updateRest.id}`;
        let params = {
            name: document.getElementById('updateName').value,
            num: document.getElementById('updateNum').value,
            addr: document.getElementById('updateAddr').value,
            userId: userId.value
        };
        await axios.put(url, params)
            .then(() => {
                console.log("Location is updated successfully");
                successMessage.value = "Location is updated successfully";
                emits('reloadData');
                setTimeout(() => {
                    const btnUpdClose = document.getElementById("btnUpdClose");
                    btnUpdClose.click();
                    successMessage.value = "";
                }, 1000);
            })
            .catch(error => {
                console.log(error, "err");
                successMessage.value = "";
                errorMessage.value = "Something went wrong , please try again later";
                console.log("something went wrong !!!");
            });

};

</script>


<style scoped>

/* Style the form icons */
.icon {
    background: #198754 !important;
}
</style>
